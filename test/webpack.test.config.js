var webpack = require('webpack');

// In karma we only need "module", "resolve"" and "plugins"" fields from the config.
// This is why we only define these three in test config.

module.exports = {
    plugins: [
        // This is required for the source maps to work, see:
        // http://stackoverflow.com/questions/38344126/how-to-configure-karma-so-typescript-source-files-would-be-debuggable
        new webpack.SourceMapDevToolPlugin({
            filename: null, // if no value is provided the sourcemap is inlined
            test: /\.(ts|js)($|\?)/i // process .js and .ts files only
        })
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: { /* Loader options go here */ }
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
};
