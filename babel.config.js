const presets = [
    [
        '@babel/env',
        {
            // adapt targets for the browsers you want to support
            // https://babeljs.io/docs/en/usage#overview
            targets: {
                ie: '11',
                safari: '11.1'
            },
            // debug: true,
            // useBuiltIns: 'entry',
            useBuiltIns: 'usage',
            corejs: {
                version: '3'
            }
        }
    ]
];

module.exports = { presets };
