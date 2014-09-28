var requirejs = require('requirejs');
var assert = require('assert');

requirejs.config({
	nodeRequire: require
	, baseUrl : '.'
	, paths : {
		'text' : './bower_components/requirejs-text/text'
		, 'jade' : './bower_components/jade/jade'
		, 'jadeloader' : './jadeloader'
		, 'views' : './demo/lib/views'
	}
});

describe('require-jadeloader loader', function(){

	it('should render jade templates into HTML', function(done){
		requirejs(['jadeloader!views/welcome'], function(templateFn){
			assert.equal(templateFn({ world: 'World' }), '<h1>Hello World!</h1>');
			done();
		});
	})

});

describe('require-jadeloader writer', function(done){
	it('compiles templates into dependency-less modules', function(done){
		requirejs.optimize({
			baseUrl : '.'
			, name : './demo/lib/main'
			, paths: {
				'text' : './bower_components/requirejs-text/text'
				, 'jade' : './bower_components/jade/jade'
				, 'jade-runtime' : './bower_components/jade/runtime'
				, 'jadeloader' : './jadeloader'
				, 'views' : './demo/lib/views'
			}
			, optimize : 'none'
			, inlineText : false
			, stubModules : ['text', 'jade', 'jadeloader']
			, include : ['jade-runtime']
			, out: 'demo/lib/built.js'
		}, function(){
			assert(true);
			done();
		});

	});
});