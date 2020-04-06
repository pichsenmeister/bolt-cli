const fs = require('fs')
const path = require('path')
const mustache = require('mustache')
const prettier = require("prettier")

// name => package.json
// events_api => components/event
// interactivity => components/action
// external_select => components/options
// modals => components/action

// slash_commands => features/slash-command
// app_home => features/app-home
// app_dm => features/app-home

// shortcuts => features/shortcut

const fileName = {
    javascript: 'app.js',
    typescript: 'app.ts'
}

const getTemplate = (config, name) => {
    return fs.readFileSync(path.normalize(__dirname+`/../templates/${config.language}/${name}`), 'utf8')
}

const generate = (config) => {
    const templateConfig = require(`../templates/${config.language}/config`)
    templateConfig.dependencies.forEach(dep => {
        if(config.components.indexOf(dep.component) >= 0) {
            if(dep.apis) {
                dep.apis.forEach(api => {
                    if(config.apis.indexOf(api) < 0) config.apis.push(api)
                })
            }
            if(dep.components) {
                dep.components.forEach(comp => {
                    if(config.components.indexOf(comp) < 0) config.components.push(comp)
                })
            }
        }
    })

    // add all config variables to mustache vars 
    // and flatten all arrays
    config.view = config
    config.components.forEach(comp => {
        config.view[comp] = true
    })
    config.apis.forEach(api => {
        config.view[api] = true
    })
    // some features / components have dependencies, add them here
    config.dependencies.forEach(dep => {
        config.view[dep] = true
    })
    
    if (fs.existsSync(config.dir)){
        console.error(`${config.dir} already exists.`)
        return   
    }

    fs.mkdirSync(config.dir);

    generatePayloads(config, templateConfig)
    generateApp(config, templateConfig)
    

    switch(config.language) {
        case 'javascript':
        case 'typescript':
            generateFile(config, 'package.mustache', 'package.json', config.view, false)
            if(config.dependencies && config.dependencies.indexOf('dotenv') >= 0) generateFile(config, 'env.mustache', '.env', config.view, false)
            break
    }

    console.log(`${config.name} successfully generated in ${config.dir}`)
}

const generateApp = (config, templateConfig) => {
    const contents = getTemplate(config, 'app.mustache')

    const partials = {
        app_init: getTemplate(config, 'app/app-init.mustache'),
        app_start: getTemplate(config, 'app/app-start.mustache')
    }

    config.components.concat(config.apis).forEach(comp => {
        if(templateConfig.templates[comp])
            partials[comp] = getTemplate(config, templateConfig.templates[comp])
    })
    
    let output = mustache.render(contents, config.view, partials);
    if(config.language === 'javascript') {
        output = prettier.format(output, {parser: 'babel'})
    }
    const appPath = path.join(config.dir, fileName[config.language])
    fs.writeFileSync(appPath, output, (error) => console.error(error))
}

const generateFile = (config, template, fileName, view, parse) => {
    parse = parse || false
    const contents = getTemplate(config, template)
    let output = mustache.render(contents, view);
    if(config.language === 'javascript' && parse) {
        output = prettier.format(output, {parser: 'babel'})
    }
    const filePath = path.join(config.dir, fileName)
    fs.writeFileSync(filePath, output, (error) => console.error(error))
}

const generatePayloads = (config, templateConfig) => {
    fs.mkdirSync(path.join(config.dir, 'payloads'));

    const view = {}
    config.components.forEach(comp => {
        view[comp] = true
    })
    config.apis.forEach(api => {
        view[api] = true
    })

    config.payloads = []
    for(const payload in templateConfig.payloads) {
        if(view[payload]) {
            config.payloads.push(templateConfig.payloads[payload].replace('payloads/', '').replace('.mustache', ''))
            generateFile(config, templateConfig.payloads[payload], templateConfig.payloads[payload].replace('mustache', 'js'), view, true)
        }
    }
    config.hasPayloads = config.payloads.length ? true : false

    if(config.hasPayloads) generateFile(config, 'payloads/index.mustache', 'payloads/index.js', { payloads: config.payloads }, true)
}

module.exports = {
    generate
}