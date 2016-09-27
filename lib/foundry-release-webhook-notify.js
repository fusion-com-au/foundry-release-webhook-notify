var Exec = require('child_process').execFileSync,
    Config = require('nconf'),
    Merge = require('deep-extend'),
    Request = require('request'),
    Pkg = require('../package.json');

var debug = require('debug')(Pkg.name);

var context = Config.env({
            separator: '_',
            match: /^npm_package.*/
        }).get();

var commands = Config.env({
            separator: '_',
            match: /^npm_package_foundry.*/
        })
        .get('npm:package:foundry:releaseCommands'),
    index = Object.keys(commands)
        .find( function (index) {
            var item = commands[index]
            return (typeof item === 'string' && item === Pkg.name)
                || item.command === Pkg.name;
        }),
    options = Merge({
        webhook: 'http://localhost/XXXXXX/build',
        payload: { formData: { } },
    }, (index && commands[index].options || { uri: null }));



exports.publish = function (params, cb) {
    var err;

    debug(Pkg.name + '.options', options);
    debug(Pkg.name + '.context', context);
    var payload = {
        url: options.webhook
    };
    if (options.formData) {
        payload.formData = options.formData;
    }
    if (options.form) {
        payload.form = options.form;
    }
    if (options.json) {
        payload.json = options.json;
    }

    Request.post(payload, cb);

};
