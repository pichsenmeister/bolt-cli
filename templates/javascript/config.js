// name => package.json
// events_api => components/event
// interactivity => components/action
// external_select => components/options
// modals => components/action

// slash_commands => features/slash-command
// app_home => features/app-home
// app_dm => features/app-home

// shortcuts => features/shortcut

const config = {
    payloads: {
        app_home: "payloads/home.mustache",
        app_dm: "payloads/messages.mustache",
        modals: "payloads/modals.mustache" 
    },
    templates: {
        modals: "components/view.mustache",
        slash_commands: "features/slash-command.mustache",
        shortcuts: "features/shortcut.mustache",
        external_select: "components/options.mustache",
        interactivity: "components/action.mustache",
        events_api: "components/event.mustache"
    },
    dependencies: [
        {
            component: 'modals',
            apis: ['interactivity']
        },
        {
            component: 'shortcuts',
            apis: ['interactivity'],
            components: ['modals']
        },
        {
            component: 'app_home',
            apis: ['events_api']
        },
        {
            component: 'app_dm',
            apis: ['events_api']
        }
    ]
}

module.exports = config