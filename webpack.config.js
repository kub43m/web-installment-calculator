const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");


/* Environemt variables used to differenciate between development and production behaviour.
 * Currently, we make decisions only based on PROD variable, but DEV is explicitly set in
 * package.json file for completeness and clarity.
 */
const DEV = process.env.NODE_ENV === "DEV";
const PROD = process.env.NODE_ENV === "PROD";

console.log(`ENV variables... DEV = ${DEV}; PROD = ${PROD}`);


/**********************
***                 ***
***     PLUGINS     ***
***                 ***
**********************/

/* We minimize and uglify javascript files only in production mode. Other plugins are used
 * in both modes. */
const plugins = PROD
    ?   [new webpack.optimize.UglifyJsPlugin({comments: false, sourceMap: false})]
    :   [];

/* ExtractTextPlugin is used to extract our styles into separate files (as opposed to
 * inlining them in HTML). Here we modify our styles bundle name with hash in production
 * mode, in order to prevent the browser from caching it.
 * */
const extractSassPlugin = new ExtractTextPlugin({
    filename: PROD ? "style.[contenthash].bundle.css" : "styles.bundle.css",
});

/* We use CommonChunksPlugin to extract all external libraries from our vendor.ts
 * file into vendor.bundle.js and *NOT* include them in our app's own code bundle.
 * 
 * "name": "vendor" field from options below matches the "vendor" entry form entry object.
 * */
const commonChunksPlugin = new webpack.optimize.CommonsChunkPlugin({
    name: "vendor",
    filename: "vendor.bundle.js"
});

/* We use HTMLWebpackPlugin to create index.html file based on a template.
 * It properly includes all necessary scripts and stylesheets (taking care
 * of changing filenames due to cache-busting with content hashes in names) */
const htmlWebpackPlugin = new HTMLWebpackPlugin({
    template: "./src/index.template.html"
});

plugins.push(commonChunksPlugin, extractSassPlugin, htmlWebpackPlugin);




/****************************
***                       ***
***     CONFIG OBJECT     ***
***                       ***
****************************/

module.exports = {
    entry: {
        app: "./src/app.ts", // our app's own code main entry
        vendor: "./src/vendor.ts" // vendor code's entry point
    },
    output: {
        /* Normally this file would consist of app & vendor, but we use
         * CommonsChunkPlugin to extract stuff from vendor to a separate bundle
         * (and declare vendor's output in the plugin's options object) */
        filename: PROD ? "app.bundle.[hash:12].min.js" : 'app.bundle.js',
        /* we need to use path.join to get an absolute path to our dist folder
         * in order to use webpack-dev-server for live reload */
        path: path.join(__dirname, "dist"),
        /* necessary for dev-server to work, tells where the files are served
         * from, from the browser's perspective. In our case it's [root]/dist,
         * where [root] can be localhost:8080, for instance.
         * That is if we enter just the path to root (hence the "" empty value)
         * we'll serve the contents of path - the dist folder (index.html is there) */
        publicPath: ""
    },
    plugins: plugins,
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
            {
                test: /\.scss$/,
                use: extractSassPlugin.extract({
                    use: [
                        {
                            loader: "css-loader", /* translates CSS into CommonJS*/
                            options: {sourceMap: true, minimize: true}
                        },
                        {
                            loader: "sass-loader", /* compiles Sass to CSS */
                            options: {sourceMap: true}
                        }
                    ],
                })
            },
            /* In order for it to work as expected (i.e. importing HTML files using
             * ES6 default exports)in our case it is CRUCIAL that v >= 0.4.5 be used */ 
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: "html-loader?exportAsEs6Default"
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    devtool: PROD ? "" : "source-map", // source maps in DEV mode only
};
