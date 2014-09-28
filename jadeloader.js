define(['jade', 'text'], function(Jade, text){
	var buildMap = {};
	return {
		write: function(pluginName, name, write){
			if (name in buildMap) {
				var text = buildMap[name];
					write('define("' + pluginName + '"!"' + name + '", ["jade"], function(jade){ return ' + text + '});\n');
				}
		}
		, load: function (name, parentRequire, onload, config){
			text.get(parentRequire.toUrl(name + '.jade'), function(text){
				var f = Jade.compile(text);
				if (config.isBuild) {
					buildMap[name] = Jade.compile(text, {compileDebug: false, client: true});
				}
				onload(f);
			});
		}
	};
});
