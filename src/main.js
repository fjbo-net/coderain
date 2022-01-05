(function(){
	let init = e => {
		let
		fontLineHeight = 0.5,

		Glyph = function(configuration, context, x, y) {
			let _this = this;

			if(!Glyph.prototype.config)
				Glyph.prototype.config = null;

			if(!Glyph.prototype.position)
				Glyph.prototype.position = {
					x: 0,
					y: 0
				};

			if(!Glyph.prototype.character)
				Glyph.prototype.character = null;

			if(!Glyph.prototype.context)
				Glyph.prototype.context = null;

			if(!Glyph.prototype.font)
				Glyph.prototype.font = {
					family: null,
					lineHeight: null,
					color: {
						r: 0,
						g: 0,
						b: 0,
						a: 0
					}
				};

			if(!Glyph.prototype.tickInterval)
				Glyph.prototype.tickInterval = null;

			if(!Glyph.prototype.ticks)
				Glyph.prototype.ticks = null;

			if(!Glyph.prototype.static)
				Glyph.prototype.static = null;


			if(!Glyph.prototype.update)
				Glyph.prototype.update = function() {
					this.position.y += this.font.size;
				};

			if(!Glyph.prototype.draw)
				Glyph.prototype.draw = function() {
					let _ = this;

					if(!_.context)
						throw `Cannot find glyph context.`;

					_.context.font = `400 ${_.font.size}px/${fontLineHeight} ${_.font.family}`;
					_.context.fillStyle = `rgba(${_.font.color.r}, ${_.font.color.g}, ${_.font.color.b}, ${_.font.color.a})`;
					_.context.fillText(_.character, _.position.x, _.position.y);

					if(_.static) return;

					if(_.ticks > _.tickInterval) {
						_.character = generateCharacter();
						_.ticks = 0;
					} else {
						_.ticks++;
					}
				};


			let
			generateCharacter = () => String
				.fromCharCode( 0x30A0 + Math.floor(Math.random() * 96) ),

			loadContextConfig = context => {
				if(!context)
					throw `Context not found`;

				if(!CanvasRenderingContext2D.prototype.isPrototypeOf(context))
					throw `Not a valid context object.`;

				_this.context = context;
			},

			loadPositionConfig = (xCoord, yCoord) => {
				if(!isFinite(xCoord))
					throw `Invalid x-coordinate value.`;
				if(!isFinite(yCoord))
					throw `Invalid y-coordinate value.`;
				_this.position = {
					x: xCoord,
					y: yCoord
				};
			},

			loadFontConfig = config => {
				_this.font = {};

				if(!config.color)
					throw `No font color config found.`;
				if(!config.lineHeight)
					throw `No font line height value found.`;
				if(!config.fontSize)
					throw `Font size not found.`

				let opacity = 0.5 + (Math.random() * 0.5);
				_this.font.color = {
					r: config.color.r,
					g: config.color.g,
					b: config.color.b,
					a: opacity
				};
				_this.font.size = config.fontSize;
			},

			loadConfig = config => {
				loadContextConfig(context);
				loadPositionConfig(x,y);
				loadFontConfig(config);
			},
			initialize = () => {
				loadConfig(configuration);
				_this.tickInterval = Math.floor(Math.random() * 200) + 20;
				_this.ticks = 0;
				_this.static = false;
				_this.character = generateCharacter();
			};


			initialize();
		},

		Drop = function(configuration, context, size, x, y) {
			let _this = this;

			if(!Drop.prototype.position)
				Drop.prototype.position = {
					x: 0,
					y: 0
				};

			if(!Drop.prototype.size)
				Drop.prototype.size = null;

			if(!Drop.prototype.context)
				Drop.prototype.context = null;

			if(!Drop.prototype.glyphs)
				Drop.prototype.glyphs = null;

			let
			lastUpdate = Date.now(),
			config = configuration,
			update = true,
			loadSize = newSize => {
				if(!isFinite(newSize))
					throw `Invalid size value.`;

				_this.size = newSize;
			},
			loadCanvasConfig = () => {
				_this.context = context;
			},
			setRandomSize = () => _this.size = 20 + Math.floor(
				Math.random() * ((_this.context.canvas.offsetHeight/config.fontSize))
			),
			setRandomSpeed = () => _this.speed = Math.floor(
				1 + (Math.random() * 10)
			),
			initialize = () => {
				_this.position = {};
				_this.position.x = x;
				_this.position.y = y;
				loadCanvasConfig();
				loadSize(size);
				setRandomSpeed();
				_this.update = true;
				_this.reset(x,y);
			};

			if(!Drop.prototype.reset)
				Drop.prototype.reset = function(x, y) {
					let _ = this;
					if(isFinite(x))
						_.position.x = x;
					if(isFinite(y))
						_.position.y = y;

					_.glyphs = [];

					setRandomSize();

					let glyph = new Glyph(
						config,
						_.context,
						_.position.x,
						_.position.y
					);

					glyph.font.color.r = 200;
					glyph.font.color.g = 200;
					glyph.font.color.b = 200;
					glyph.font.color.a = 1;
					glyph.tickInterval = Math.floor(Math.random() * 20);

					_.glyphs.push(glyph);
				};

			if(!Drop.prototype.draw)
				Drop.prototype.draw = function() {
					let _ = this;
					_.glyphs.forEach(glyph => {
						glyph.draw(config);
						if(_.update)
							glyph.update();
					});

					if(_.update) {
						_.update = false;
						_.lastUpdate = Date.now();
						if(_.glyphs.length < _.size)
							_.glyphs.push(
								new Glyph(
									config,
									_.context,
									_.position.x,
									_.position.y
								)
							);
					}

					if(_.glyphs.length < 1) return;

					if(_.glyphs[_.glyphs.length - 1].position.y > _.context.canvas.offsetHeight)
						_.reset(
							_.position.x,
							Math.floor(
								Math.random() * (_.context.canvas.offsetHeight * 0.4))
							);

					if( Date.now() > (_.lastUpdate + (50 * _.speed)) )
						_.update = true;
				};

			initialize();
		},

		CodeRain = function(configuration) {
			let
			_this = this,
			defaultConfig = {
				fontFamily: `monospace`,
				lineHeight: 0.5,
				fontSize: 18,
				color: {
					r: 0,
					g: 255,
					b: 50
				},
				background: {
					r: 0,
					g: 0,
					b: 0,
					a: 1
				},
				elementId: 'coderain'
			};

			if(!CodeRain.prototype.config)
				CodeRain.prototype.config = null;
			if(!CodeRain.prototype.canvas)
				CodeRain.prototype.canvas = null;
			if(!CodeRain.prototype.context)
				CodeRain.prototype.context = null;
			if(!CodeRain.prototype.play)
				CodeRain.prototype.play = null;
			if(!CodeRain.prototype.drops)
				CodeRain.prototype.drops = null;

			this.config = null;
			this.context = null;

			let
			play = true,
			isDrawing = false,
			previousFontSize = null,


			loadConfig = config => this.config = Object
				.assign(defaultConfig, config),

			initialize = function() {
				let
				targetId = _this.config.elementId,
				targetElement = document.getElementById(targetId);

				if(!targetElement)
					throw `Failed to initialize element #${targetId}`;

				let canvas;
				if(targetElement.nodeName.toLowerCase() == `canvas`) {
					canvas = targetElement;
				} else {
					canvas = document.createElement(`canvas`);

					targetElement.parentElement.insertBefore(canvas, targetElement);
					targetElement.remove();

					canvas.id = targetId;
				}

				_this.canvas = canvas;
				_this.context = _this.canvas.getContext(`2d`);

				_this.canvas.width = _this.canvas.offsetWidth;
				_this.canvas.height = _this.canvas.offsetHeight;

				_this.reset();
			};


			if(!CodeRain.prototype.stop)
				CodeRain.prototype.stop = function() {
					play = false;
				};

			if(!CodeRain.prototype.play)
				CodeRain.prototype.play = function() {
					play = true;
				};

			if(!CodeRain.prototype.reset)
				CodeRain.prototype.reset = function() {
					this.drops = [];
					this.play = true;
					previousFontSize = this.config.fontSize;
					this.addDrops();

					FJBO.StrbrJs.pauseOnBlur(false);
					FJBO.StrbrJs.add(
						`CodeRain${this.config.elementId}`,
						() => this.draw()
					);
				}

			if(!CodeRain.prototype.addDrops)
				CodeRain.prototype.addDrops = function(index, amount) {
					let glyph = new Glyph(
						this.config,
						this.context,
						0,
						0
					);

					if(typeof index == `undefined`)
						index = this.drops.length * glyph.font.size;

					if(typeof amount == `undefined`)
					 	amount = (this.context.canvas.offsetWidth / glyph.font.size);

					for(let dropIndex = this.drops.length; dropIndex < amount; dropIndex++) {
						let
						x = index + (dropIndex * glyph.font.size),
						y = Math.floor( Math.random() * this.context.canvas.offsetHeight );
						this.drops.push(
							new Drop(
								this.config,
								this.context,
								Math.floor(Math.random() * (this.context.canvas.offsetHeight / glyph.font.size) + 10),
								x,
								y
							)
						);
					}
				};

			if(!CodeRain.prototype.draw)
				CodeRain.prototype.draw = function() {
					if(!this.play) {
						this.context.clearRect(
							0,
							0,
							this.context.canvas.width,
							this.context.canvas.height
						);
						return false;
					}

					if(isDrawing) return true;
					isDrawing = true;

					var _ = this;

					_.context.canvas.width = _.context.canvas.offsetWidth;
					_.context.canvas.height = _.context.canvas.offsetHeight;

					_.context.fillStyle = `rgba(${_.config.background.r}, ${_.config.background.g}, ${_.config.background.b}, ${_.config.background.a})`;
					_.context.fillRect(
						0,
						0,
						_.context.canvas.width,
						_.context.canvas.height
					);

					if(_.config.fontSize != previousFontSize) {
						let maxDrops = Math.floor(_.context.canvas.offsetWidth/_.config.fontSize);

						if(_.drops.length < maxDrops)
							_.addDrops(maxDrops - _.drops.length);
					}

					for(let dropIndex = 0; dropIndex < _.drops.length; dropIndex++) {
						let drop = _.drops[dropIndex];

						if(_.config.fontSize != previousFontSize) {
							drop.position.x = (dropIndex * _.config.fontSize);
						}

						if(drop.position.x < _.context.canvas.offsetWidth) {
							drop.draw();

							if(dropIndex == _.drops.length - 1 && _.drops.length < (_.context.canvas.offsetWidth/_.drops[0].glyphs[0].font.size) - 1 )
								_.addDrops(1);
						}
						else if(dropIndex == _.drops.length - 1 && _.drops[dropIndex].position.x > (_.context.canvas.offsetWidth + (_.drops[0].glyphs[0].font.size * 3)) ) {
							_.drops.pop();
						}
					}
					isDrawing = false;
				};

			try {
				loadConfig(configuration);
				initialize();
			}
			catch (exception) {
				(console.error || console.log)(`Critical error encountered: ${exception}`);
			}
		};

		window.CodeRain = CodeRain;
	};

	if(window[`FJBO`] && window[`FJBO`][`StrbrJs`]) init();
	else window.addEventListener(`FJBO.StrbrJs.ready`, init)
})();
