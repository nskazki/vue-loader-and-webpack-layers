# UPD

The issue isn't present in vue-loader@17

# Issue

https://github.com/vuejs/vue-loader/issues/1849 - `vue-loader@16` patches Webpack in a way that prevents the usage of Webpack's layers.

1. It's an experimental feature: https://webpack.js.org/configuration/experiments/#experiments
2. There isn't much documentation to it: https://github.com/webpack/webpack/pull/12327, https://webpack.js.org/configuration/module/#rulelayer, https://webpack.js.org/configuration/module/#ruleissuerlayer and https://webpack.js.org/configuration/entry-context/#entry-descriptor
3. However, the feature lets you process the same CSS differently when it's imported by a certain entry point or file, which cannot be accomplished in any other way.

# How to Reproduce

1. cd into the cloned repo, run `npm run build`, get an error
2. checkout to `040fe39` where Vue Plugin isn't being used, run `npm run build`, get a compiled bundle

## The Outcome

```
[webpack-cli] Error: Compiling RuleSet failed: Properties issuerLayer are unknown (at ruleSet[0]: [object Object])
    at RuleSetCompiler.error (/Volumes/Repos/vue-loader-and-webpack-layers/node_modules/webpack/lib/rules/RuleSetCompiler.js:373:10)
    at RuleSetCompiler.compileRule (/Volumes/Repos/vue-loader-and-webpack-layers/node_modules/webpack/lib/rules/RuleSetCompiler.js:196:15)
    at /Volumes/Repos/vue-loader-and-webpack-layers/node_modules/webpack/lib/rules/RuleSetCompiler.js:154:9
    at Array.map (<anonymous>)
    at RuleSetCompiler.compileRules (/Volumes/Repos/vue-loader-and-webpack-layers/node_modules/webpack/lib/rules/RuleSetCompiler.js:153:16)
    at RuleSetCompiler.compile (/Volumes/Repos/vue-loader-and-webpack-layers/node_modules/webpack/lib/rules/RuleSetCompiler.js:68:22)
    at match (/Volumes/Repos/vue-loader-and-webpack-layers/node_modules/vue-loader/dist/pluginWebpack5.js:156:35)
    at VueLoaderPlugin.apply (/Volumes/Repos/vue-loader-and-webpack-layers/node_modules/vue-loader/dist/pluginWebpack5.js:61:24)
    at createCompiler (/Volumes/Repos/vue-loader-and-webpack-layers/node_modules/webpack/lib/webpack.js:73:12)
    at /Volumes/Repos/vue-loader-and-webpack-layers/node_modules/webpack/lib/webpack.js:44:48
```

# The Possible Reason

Vue Loader's set of rules doesn't match Webpack's

https://github.com/webpack/webpack/blob/4fb45402eec7efe1c70e641cab7b24331948ea8d/lib/NormalModuleFactory.js#L171-L193

https://github.com/vuejs/vue-loader/blob/b179fb9c1b3bc0507f021be208c359d0dedeec08/lib/plugin-webpack5.js#L10-L30
