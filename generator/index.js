const fs = require('fs')
const path = require('path')
const mustache = require('mustache')

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

    console.log(config)

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

    config.view = config
    config.components.forEach(comp => {
        config.view[comp] = true
    })
    config.apis.forEach(api => {
        config.view[api] = true
    })
    config.dependencies.forEach(dep => {
        config.view[dep] = true
    })

    console.log(config)
    
    if (fs.existsSync(config.dir)){
        console.error(`${config.dir} already exists.`)
        return   
    }

    fs.mkdirSync(config.dir);

    generatePayloads(config)
    generateApp(config)
    

    switch(config.language) {
        case 'javascript':
        case 'typescript':
            generateFile(config, 'package.mustache', 'package.json', config.view)
            if(config.dependencies && config.dependencies.indexOf('dotenv') >= 0) generateFile(config, 'env.mustache', '.env', config.view)
            break
    }
}

const generateApp = (config) => {
    const contents = getTemplate(config, 'app.mustache')

    const partials = {
        app_init: getTemplate(config, 'app/app-init.mustache'),
        app_start: getTemplate(config, 'app/app-start.mustache')
    }
    
    const output = mustache.render(contents, config.view, partials);
    const appPath = path.join(config.dir, fileName[config.language])
    fs.writeFileSync(appPath, output, (error) => console.error(error))
}

const generateFile = (config, template, fileName, view) => {
    const contents = getTemplate(config, template)
    const output = mustache.render(contents, view);
    const filePath = path.join(config.dir, fileName)
    fs.writeFileSync(filePath, output, (error) => console.error(error))
}

const generatePayloads = (config) => {
    fs.mkdirSync(path.join(config.dir, 'payloads'));

    const templateConfig = require(`../templates/${config.language}/config`)
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
            generateFile(config, templateConfig.payloads[payload], templateConfig.payloads[payload].replace('mustache', 'js'), view)
        }
    }
    config.hasPayloads = config.payloads.length ? true : false

    if(config.hasPayloads) generateFile(config, 'payloads/index.mustache', 'payloads/index.js', { payloads: config.payloads })
}

module.exports = {
    generate
}