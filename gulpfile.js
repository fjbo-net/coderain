`use-strict`;

const
config = {
	project: {
		// Should set project's main file name (without extension)
		filename: `main`
	},
	beautify: {
		indent_char: `\t`,
		indent_size: 1
	}
},
dirs = {
	src: `./src`,
	dist: `./dist`,
	npm: `./node_modules`
},
pkgs = {
	babel: require(`gulp-babel`),
	beautify: require(`gulp-jsbeautifier`),
	concat: require(`gulp-concat`),
	del: require(`del`),
	fs: require(`fs`),
	gulp: require(`gulp`),
	header: require(`gulp-header`),
	path: require(`path`),
	rename: require(`gulp-rename`),
	strip: require(`gulp-strip-comments`),
	uglify: require(`gulp-uglify`)
};


pkgs.gulp.task(`clean`, callback => {
	let deletedPaths = pkgs.del.sync([pkgs.path.join(dirs.dist, `/*`)]);

	if(deletedPaths.length > 0)
		console.log(
			`Deleted files and directories:\n`,
			deletedPaths.join(`\n`));

	callback();
});

pkgs.gulp.task(`copy:src`, () => pkgs.gulp
	.src(
		[ pkgs.path.join(dirs.src, `/**/*`) ],
		{ base: dirs.src }
	)
	.pipe(pkgs.gulp.dest( dirs.dist ))
);

pkgs.gulp.task(`copy:files`, () => pkgs.gulp
	.src([
		`./LICENSE`,
		`./README.md`,
	])
	.pipe(pkgs.gulp.dest( dirs.dist ))
);

pkgs.gulp.task(`js:package-json`, callback => {
	let
	packageJson = require(`./package.json`),
	itemsToRemove = [
		`devDependencies`,
		`year`
	];

	for(let index in itemsToRemove){
		let propertyName = itemsToRemove[index];
		if(packageJson[propertyName]) delete(packageJson[propertyName]);
	}

	pkgs.fs.writeFile(
		pkgs.path.join(dirs.dist, `/package.json`),
		JSON.stringify(packageJson),
		err => {
			if(err) throw err;

			pkgs.gulp.src(
				pkgs.path.join(dirs.dist, `/package.json`),
				{ base: dirs.dist }
			)
				.pipe(
					pkgs.beautify(config.beautify))
				.pipe(
					pkgs.gulp.dest( dirs.dist ));
		}
	);

	callback();
});

pkgs.gulp.task(`js:prep`, () => pkgs.gulp
	.src(
		pkgs.path.join(dirs.dist, `/**/*.js`),
		{ base: pkgs.path.join(dirs.dist, `/`) })
	.pipe(pkgs.strip())
	.pipe(pkgs.header(
		pkgs.fs.readFileSync(`./assets/ejs/license.ejs`, `utf-8`),
		{ pkg: require(`./package.json`) }
	))
	.pipe(pkgs.babel())
	.pipe(pkgs.beautify(config.beautify))
	.pipe(pkgs.gulp.dest( dirs.dist ))
);

pkgs.gulp.task(`js:bundle`, () => pkgs.gulp
	.src([
		pkgs.path.join( dirs.dist, `/**/*.js` )
	])
	.pipe(pkgs.concat(`${config.project.filename}.bundle.js`))
	.pipe(pkgs.gulp.dest( dirs.dist ))
);

pkgs.gulp.task(`js:minify`, () => pkgs.gulp
	.src(
		pkgs.path.join(dirs.dist, `/**/*.js`),
		{ base: dirs.dist }
	)
	.pipe(pkgs.uglify())
	.pipe( pkgs.rename({ extname: `.min.js` }) )
	.pipe(pkgs.gulp.dest( dirs.dist ))
);


pkgs.gulp.task(`build`, pkgs.gulp
	.series(
		`clean`,
		`copy:src`,
		`js:prep`,
		`js:bundle`,
		`js:minify`,
		`js:package-json`,
		`copy:files`
	)
);


pkgs.gulp.task(
	`default`,
	pkgs.gulp.series( `build` )
);


let
globsToWatch = [
	`./src/**/*`,
	`README.md`,
	`LICENSE`
];

pkgs.gulp.task(
	`watch`,
	() => pkgs.gulp.watch(
		globsToWatch,
		(callback) => {
			console.clear();
			pkgs.gulp.series(
				`build`,
				() => console.log(`Watching changes in ${globsToWatch.join(', ')}...`)
			)();
			callback();
		}
	)
);
