define(['text', 'jade'], function(text, Jade){
	var buildMap = {};
	return {
		write: function(pluginName, name, write){
			if (name in buildMap){
				write('define("' + pluginName + '!' + name + '", ["jade-runtime"], function(jade){ return ' + buildMap[name] + '});\n');
			}
		}
		, load: function (name, parentRequire, onload, config){
			text.get(parentRequire.toUrl(name + '.jade'), function(templateString){
				if (config.isBuild){
					buildMap[name] = Jade.compileClient(templateString, { compileDebug: false });
				}
				onload(Jade.compile(templateString));
			});
		}
		, version : '0.1.0'
	};
});
