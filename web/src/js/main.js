// config all RequireJS modules
requirejs.config({
	waitSeconds: 0
	, packages: [
		{
			name: 'ace',
			location: 'bower-components/ace/lib/ace',
			main: 'ace'
		}
		, {
			name: 'css',
			location: 'bower-components/require-css',
			main: 'css'
		}
		, {
			name: 'stylus',
			location: 'bower-components/require-stylus',
			main: 'stylus'
		}
	]
	, paths: {
		jquery: 'bower-components/jquery/jquery'
		//, requirejs: 'bower-components/requirejs/require'
		, marked: 'bower-components/marked/lib/marked'
		, underscore: 'bower-components/underscore/underscore'
		, mousetrap: 'bower-components/mousetrap/mousetrap'
		, text: 'bower-components/requirejs-text/text'
		, mathjax: '../lib/MathJax/MathJax.js?config=TeX-AMS_HTML'
		, 'google-code-prettify': 'bower-components/google-code-prettify/src/prettify'
		, highlightjs: 'bower-components/highlightjs/highlight.pack'
		, FileSaver: 'bower-components/FileSaver/FileSaver'
		, stacktrace: 'bower-components/stacktrace/stacktrace'
		, jqueryUI: 'libs/jquery-ui/js/jquery-ui-1.10.3.custom'
		, jqueryLayout: 'libs/jquery-layout/jquery.layout-latest.min'
	}
	, shim: {
		underscore: {
			ecports: '_'
		}
		, mousetrap: {
			exports: 'mousetrap'
		}
		, mathjax: ['mathjax-init']
		, jqueryLayout: ['jqueryUI']
		, jqueryUI: ['jquery']
	}
});