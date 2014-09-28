({
    appDir: '.'
    , baseUrl: 'lib'
    , dir: '../demo-build'
    , paths: {
        jade : '../../bower_components/jade/jade'
        , text : '../../bower_components/requirejs-text/text'
        , jadeloader : '../../jadeloader'
    }
    , stubModules : ['jade', 'text']
    , modules: [
        {
            name: 'main'
        }
    ]
})
