var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/-[sS]pec\.js$/.test(file)) {
            tests.push(file);
        }
    }
}


require.config({
    // Karma serves files under /base, which is the basePath from your config file
    baseUrl: '/base/dist/',
    // dynamically load all test files
    deps: tests,
    // we have to kickoff jasmine, as it is asynchronous
    callback: window.__karma__.start
});

require.config({
    paths: {
        bluebird: ''
    }
});

// Due to requirejs only having one physical baseUrl, we have two choices
// for bringing in dependant modules.
// We could copy dist into a special testing dir, and also copy in the
// module files. This is what we do in kbase-ui to create a monolithic
// module directory tree.
// An alternative is to use the CDN to serve up dependencies. 
// Since the CDN is easy to install and run, this is preferred.
// In addition, since we can test directly out of dist, we don't need any 
// further processing other than the normal build process for live testing.


function addCdnModules(baseUrl) {
    if (!baseUrl) {
        // baseUrl = 'https://ci.kbase.us/cdn/files';
        // baseUrl = 'http://cdn.kbase.us/cdn';
        baseUrl = 'http://localhost:10001/';
    }
    var modules = {
            //kb_common: 'kbase-common-js/1.5.4/',
            //kb_service: 'kbase-service-clients-js/2.9.1/',
            uuid: 'pure-uuid/1.3.0/uuid',
            text: 'requirejs-text/2.0.14/text',
            css: 'require-css/0.1.8/css',
            'font-awesome': 'font-awesome/4.3.0/css/font-awesome',
            bluebird: 'bluebird/3.4.7/bluebird',
            jquery: 'jquery/2.2.2/jquery',
            bootstrap: 'bootstrap/3.3.6/js/bootstrap',
            bootstrap_css: 'bootstrap/3.3.6/css/bootstrap',
            underscore: 'underscore/1.8.3/underscore'
        },
        paths = {};

    Object.keys(modules).forEach(function (key) {
        paths[key] = [baseUrl, modules[key]].join('/');
    });

    require.config({
        paths: paths
    });
}
addCdnModules();