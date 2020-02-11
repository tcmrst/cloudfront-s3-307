const webpack = require("webpack");
const path = require("path");
const parameters = require("./parameters.json");

module.exports = {
  mode: "production",
  target: "node",

  entry: {
    edge: "./src/edge.ts"
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]/main.js",
    libraryTarget: "commonjs2"
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader"
      }
    ]
  },

  resolve: {
    extensions: [".ts", ".js"]
  },

  plugins: [
    new webpack.DefinePlugin({
      AWS_REGION: JSON.stringify(parameters.OriginRegion),
      CLOUDFRONT_BUCKET_NAME: JSON.stringify(parameters.CloudFrontBucketName)
    })
  ],

  externals: {
    "aws-sdk": "aws-sdk"
  }
};
