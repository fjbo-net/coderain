# Choosing a Build
CodeRain is distributed in four different build formats for flexibility and ease of use. The redistributable builds are the following:
* [main.js](#main-js) (main build, DOES NOT include dependencies)
* [main.min.js](#main-min-js) (minified build, DOES NOT include dependencies)
* [main.bundle.js](#main-bundle-js) (bundled build, INCLUDES dependencies)
* [main.bundle.min.js](#main-bundle-min-js) (bundled minified build, INCLUDES dependencies)

Just a heads up, for people just getting started with NPM modules, you only need a SINGLE build. Even though your project might contain all builds, you only need to reference ONE of them.

## main.js
**This is the main build file**. Includes comments and it's formatted to be easy to read and follow. This is just CodeRain, and won't work on its own because you will need to  reference CodeRain's dependencies in your HTML file, or incorporate CodeRain and its dependencies to your build workflow. Remember to output CodeRain dependencies first, and then CodeRain.

### Main Build Best Usages
The main build is best for:
* Development or Debugging
* Task managers (like Gulp or Grunt)
* Manual dependency managing

## main.min.js
**This is the minified build file**. Whitespace, comments and line breaks are removed to minified the file size. This is just CodeRain, and won't work on its own because you will need to reference CodeRain's dependencies in your HTML file, or incorporate CodeRain and its dependencies to your build workflow. Remember to output CodeRain dependencies first, and then CodeRain.

### Minified Build Best Usages
The minified bundle build is best for:
* Production
* Stand-alone references
* Manual dependency managing


## main.bundle.js
**This is the bundled build**. It contains CodeRain and its minified dependencies. This is pretty much ready to go and you don't need to worry about handling dependencies. Comments, linebreaks, and whitespace is preserved; however, included minified dependencies might be incompatible with code minimization or encoding.

### Bundled Build Best Usages
The main build is best for:
* Development or Debugging

## main.bundle.min.js
**This is the minified bundled build**. It contains minified CodeRain and its minified dependencies. This is pretty much ready to go and you don't need to worry about handling dependencies. Comments, line breaks and unnecessary whitespace is removed.

### Minified Bundled Build Best Usages
The minified bundled build is best for:
* Production
* Simple publishing workflows
