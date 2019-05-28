const presets = [
    [
        '@babel/env',
        {
            // adapt targets for the browsers you want to support
            // https://babeljs.io/docs/en/usage#overview
            targets: {
                ie: '11',
                edge: '17',
                firefox: '60',
                chrome: '67',
                safari: '11.1'
            },
            // debug: true,
            useBuiltIns: 'usage',
            corejs: {
                version: '3.1'
            }
        }
    ]
];

module.exports = { presets };
