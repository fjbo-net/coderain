# CodeRain
A Matrix-inspired code rain animation distributed via NPM.

## But, what does that actually mean?
CodeRain is a customizable Matrix-style code rain animation that executes in real-time, virtually running on any device that supports a web browser.
More specifically, it's a JavaScript object that renders a Matrix-style code rain in a **\<canvas\>** element at the front-end. It's easy to integrate, deploy, customize and use.

## Features
* Vanilla JavaScript: written in pure native JavaScript.
* Unobtrusive: Fully compatible with any libraries or frameworks.
* Easy to customize: At instantiation or after. Customize on-the-fly.
* Simple initialization: Simply instantiate and that's it!
* Responsive: No hard-set values, so it completely adapts to your vision. Seamlessly.
* Package-manager-based distribution: Easy to install, track, update, and redistribute.
* Lightweight: Since it's an environment-free pure JavaScript implementation, it has no additives, conservatives, MSGs, sweeteners or gluten.

## How to Use
CodeRain is easy to use and it's super flexible to adapt to your development workflow due to the multiple options for setting up CodeRain:

* **Via NPM**: Usually used for an integrated build process, usually for simplifying and/or minifying assets handled by a task manager (like Gulp or Grunt).
* **Self-Hosted**: Usually used for serving an application or website from a single server or for an easier set-up.
* **UNPKG (CDN)**: Usually used for decentralizing asset distribution or hosting, to improve network performance.

### Setting Up: via NPM
It's easy to add CodeRain into your existing project with NPM. Just follow the steps below:

1. **Install** via NPM
	```bash
	npm install @fjbo-net/coderain --save-dev
	```

2. **Add** to your project:
	A couple of standard options are:
	* Add it to your build tasks to be *prepended* to the resulting application/website JavaScript build.
	* (or) Set your build tasks to copy one of the _bundled_ files from the `/node_modules/@fjbo-net/coderain/` directory in your project to your project's distributable destination.

	But, of course, you can follow your own build and distribution practices.

3. **Layout** the markup.
	All it's required in the HTML side of things is:
		1. A reference to the JavaScript file containing CodeRain (a \<script\> tag).
		2. A \<canvas\>  element (or multiple elements) with a unique identifier (each).
4. **Initialize** CodeRain. Just remember to make sure to instantiate CodeRain once your markup has been loaded in the client.

### Setting Up: Self-Hosted
If downloading a build into your projects it's what works best for you, all you need to do is:
1. **Download** the version that works best for you (see [Choosing a Build](docs/english/choosing-a-build.md) for more details) from: `https://www.npmjs.com/package/@fjbo-net/coderain?activeTab=explore`
2. **Copy** your preferred JavaScript file into your project's distributable JavaScript folder.
3. **Layout** the markup.
	All it's required in the HTML side of things is:
		1. A reference to the JavaScript file containing CodeRain (a \<script\> tag).
		2. A \<canvas\>  element (or multiple elements) with a unique identifier (each).
4. **Initialize** CodeRain. Just remember to make sure to instantiate CodeRain once your markup has been loaded in the client.

### Setting Up: via UNPKG (CDN)
CodeRain does not have a dedicated CDN for serving builds. However, you can use UNPKG to request a build.
1. **Select** a build. See [Choosing a Build](docs/english/choosing-a-build.md) for more details.
2. **Layout** the markup:
	All it's required in the HTML side of things is:
		1. A reference to an UNPKG endpoint  (a \<script\> tag).
		2. A \<canvas\>  element (or multiple elements) with a unique identifier (each).
	For your convenience, here's a markup sample:
	```html
	<!doctype html>
	<html lang="en">
		<head>
			<meta charset="utf-8" />

			<!-- CodeRain via UNPKG-->
			<script
				type="javascript"
				src="https://unpkg.com/@fjbo-net/coderain">
			</script>

			<!-- Your JavaScript -->
			<script
				type="javascript"
				src="./js/main.js">
			</script>
		</head>
		<body>
			<canvas id="coderain"></canvas>
		</body>
		<!-- Your procedural (or post-render) JavaScript -->
		<script
			type="javascript"
			src="./js/post-load.js">
		</script>
	</html>
	```
2. **Initialize** CodeRain. Just remember to make sure to instantiate CodeRain once your markup has been loaded in the client.

### Configuring CodeRain
You can customize CodeRain at initialization via an optional configuration object when instantiating CodeRain. The default configuration is the following:
```javascript
let
// Init with the default configuration (implicit)
defaultCodeRain = new CodeRain(),
// Init with the default configuration (explicit)
expandedDefaultCodeRain = new CodeRain({
				fontFamily: `monospace`,
				fontSize: 18,
				// color sets the font color as defined by an RGB value.
				color: {
					r: 0,
					g: 255,
					b: 50
				},
				// background sets the background color as defined by an RGBA value.
				background: {
					r: 0,
					g: 0,
					b: 0,
					a: 1
				},
				//
				elementId: 'custom-coderain'
			});
```


## About
### Author
FJBO | **[Francisco Javier Becerra-Ortiz](https://github.com/fjbo-net)**

### License
Copyright © 2021, FJBO. Released under the [CC BY-NC-SA 4.0](LICENSE) license.
