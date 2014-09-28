define(['text'], function(text){
	var buildMap = {};
	return {
		write: function(pluginName, name, write){
			if (name in buildMap){
				write('define("' + pluginName + '!' + name + '", ["jade-runtime"], function(jade){ return ' + buildMap[name] + '});\n');
			}
		}
		, load: function (name, parentRequire, onload, config){
			if (config.isBuild){
				text.get(parentRequire.toUrl(name + '.jade'), function(templateString){
					/* global nodeRequire */
					buildMap[name] = nodeRequire('jade').compileClient(templateString, { compileDebug: false });
					onload(buildMap[name]);
				});
			} else {
				text.get(parentRequire.toUrl(name + '.jade'), function(templateString){
					parentRequire(['jade'], function(Jade){
						onload(Jade.compile(templateString));
					});
				});
			}
		}
		, version : '0.1.0'
	};
});
