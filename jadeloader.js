define(['jade', 'text'], function(Jade, text){
	var buildMap = {};
	return {
		write: function(pluginName, name, write){
			if (name in buildMap) {
				var text = buildMap[name];
					write('define("' + pluginName + '"!"' + name + '", function(){ return ' + text + '});\n');
				}
		}
		, load: function (name, parentRequire, onload, config){
			text.get(parentRequire.toUrl(name + '.jade'), function(templateString){
				var f = Jade.compile(templateString);
				if (config.isBuild) {
					buildMap[name] = Jade.compile(templateString, { compileDebug: false, client: true });
				}
				onload(f);
			});
		}
		, version : '0.1.0'
	};
});
