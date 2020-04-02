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
    components: {
        app_home: "components/event",
        app_dm: "components/event",
        modals: "components/view",
        slash_commands: "features/slash-command",
        shortcuts: "features/shortcut",
        external_select: "components/options"
    },
    apis: {
        interactivity: "components/action",
        events_api: "components/event"
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
        }
    ]
}

module.exports = config