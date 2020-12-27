const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      /*
      Transforming our ES6 and JSX syntax. 
      The test and exclude properties are conditions to match file against. 
      In this case, it’ll match anything outside of the node_modules and bower_components directories. 
      Since we’ll be transforming our .js and .jsx files as well, we’ll need to direct Webpack to use Babel. 
      Finally, we specify that we want to use the env preset in options.
      */
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      /*
      Processing CSS. 
      Since we’re not pre-or-post-processing our CSS, we just need to make sure to add style-loader 
      and css-loader to the use property. 
      css-loader requires style-loader in order to work. 
      loader is a shorthand for the use property, when only one loader is being utilized.
      */
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  /*
  The resolve property allows us to specify which extensions Webpack will resolve — 
  this allows us to import modules without needing to add their extensions.
  */
  resolve: { extensions: ["*", ".js", ".jsx"] },
  /*
  The output property tells Webpack where to put our bundled code. 
  The publicPath property specifies what directory the bundle should go in, 
  and also tells webpack-dev-server where to serve files from.
  */
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    hotOnly: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()] //to avoid constantly refresh to see our changes
};
