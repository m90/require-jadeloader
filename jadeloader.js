define(function(){
	var buildMap = {};
	return {
		write: function(pluginName, name, write){
			if (name in buildMap){
				write('define("' + pluginName + '!' + name + '", ["jade-runtime"], function(jade){ return ' + buildMap[name] + '});\n');
			}
		}
		, load: function (name, parentRequire, onload, config){
			if (config.isBuild){
				parentRequire(['text!' + name + '.jade'], function(templateString){
					buildMap[name] = nodeRequire('jade').compileClient(templateString, { compileDebug: false })
					onload(buildMap[name]);
				});
			} else {
				parentRequire(['jade', 'text!' + name + '.jade'], function(Jade, templateString){
					var f = Jade.compile(templateString);
					onload(f);
				});
			}
		}
		, version : '0.1.0'
	};
});
