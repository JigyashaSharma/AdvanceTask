const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = (env) => {

    const currentEnv = env.NODE_ENV || 'development';
    const envFile = `.env.${currentEnv}`;
    dotenv.config({ path: envFile });

    return {
        context: __dirname,
        entry: {
            homePage: './ReactScripts/Home.js'
        },
        output:
        {
            path: __dirname + "/dist",
            filename: "[name].bundle.js",
            sourceMapFilename: '[filename].map',
        },
        devtool: 'source-map',
        watch: true,
        mode: 'development',
        optimization: {
            minimize: false,  // Disable minification
            splitChunks: false,  // Disable chunk splitting (if not needed)
            runtimeChunk: false, // Disable runtime chunk creation
            concatenateModules: false, // Disable module concatenation
        },
        devServer: {
            contentBase: './dist',
            hot: true,
            inline: true,  // Forces a full page reload if HMR isn't working
            open: true,
            disableHostCheck: true,  // Optional: only if you're testing on a different network
        },
        cache: false,
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['babel-preset-env', 'babel-preset-react'],
                            plugins: ['transform-runtime'],  // Required for async/await support
                        }
                    }
                },
                {
                    test: /\.css$/,  // Regular CSS files (non-modular)
                    exclude: /\.module\.css$/,  // Exclude .module.css files to avoid conflicts
                    use: [
                        'style-loader',  // Inject styles into DOM
                        'css-loader',    // Regular CSS loader (without modules)
                    ],
                },
                {
                    test: /\.module\.css$/,  // Target CSS files with .module.css extension
                    use: [
                        'style-loader',  // Inject styles into DOM
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,  // Enable CSS Modules
                                sourceMap: true,
                            },
                        },
                    ],
                },
                {
                    test: /\.(ttf|eot|svg|woff|woff2)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[hash].[ext]',
                                outputPath: 'fonts/',
                            },
                        },
                    ],
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    use: [
                        {
                            loader: 'file-loader', // or 'url-loader' if you'd prefer to inline smaller images
                            options: {
                                name: '[name].[hash].[ext]',
                                outputPath: 'images/', // you can customize the output path here
                            },
                        },
                    ],
                },
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx'],
            alias: {
                "process": "process/browser"
            }
        },
        plugins: [
            new webpack.ProvidePlugin({
                process: 'process/browser',
            }),
            new webpack.DefinePlugin({
                'identityApi': JSON.stringify(process.env.REACT_APP_IDENTITY_API_URL),
                'listingApi': JSON.stringify(process.env.REACT_APP_LISTING_API_URL),
                'profileApi': JSON.stringify(process.env.REACT_APP_PROFILE_API_URL),
                'process.env.REACT_APP_ENV': JSON.stringify(process.env.REACT_APP_ENV),
            }),
        ]
    };
};