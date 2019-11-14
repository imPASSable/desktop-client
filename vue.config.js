const path = require("path");

module.exports = {
  chainWebpack: config => {
    config
      .entry("app")
      .clear()
      .add("./src/app/main.ts")
      .end();

    config.resolve.alias.clear();
    config.resolve.alias.set("~", path.join(__dirname, "./src/app"));
    config.resolve.alias.set("~common", path.join(__dirname, "./src/common"));
  },
  pluginOptions: {
    electronBuilder: {
      chainWebpackMainProcess: config => {
        config.resolve.alias.set("~common", path.join(__dirname, "./src/common"));
        config.resolve.alias.set("~electron", path.join(__dirname, "./src/electron"));
      },
      mainProcessFile: "src/electron/background.ts",
      mainProcessWatch: ["src/electron/**/*.ts"]
    }
  },
  transpileDependencies: ["vuetify"]
};
