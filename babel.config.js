module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin', "@babel/plugin-transform-export-namespace-from", [
      "module-resolver",
      {
        root: ".",
        extensions: [
          ".js",
          ".jsx",
          ".ts",
          ".tsx",
          ".android.js",
          ".android.tsx",
          ".ios.js",
          ".ios.tsx",
        ],
        alias: {
          "@screens": "./src/screens",
          "@components": "./src/components",
          "@hooks": "./src/hooks",
          "@contexts": "./src/contexts",
          "@utils": "./src/utils",
        },
      },
    ],]
  };
};
