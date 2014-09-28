# require-jadeloader
> A [Jade](http://jade-lang.com/) loader plugin for [RequireJS](http://requirejs.org).

This is a fork of **[require-jade](https://github.com/deedubs/require-jade)** that does not include the whole jade library (it's a bower dependency instead), so you don't have to use buildPragmas but can simply stub out the modules not needed in a built version (this was not yet available when the original loader was written).

In development, it uses XMLHttpRequest to fetch the `.jade` files, so you can only fetch files that are on the same domain as the HTML page, and most browsers place restrictions on using XMLHttpRequest from local file URLs, so use a web server to serve your `.jade` files.

## Usage

Reference Jade files via the `jadeloader!` plugin name:
```javascript
require(['jadeloader!userview'], function(userView){
  $('.user').html(userView(locals));
});
```

They will be returned as a Jade template function that accepts locals as the first arg.

## Optimizing

When you are ready to deploy your application and want to compile your JS into a single file you can make use of the requireJS optimizer. `require-jadeloader` includes optimizer instructions that will precompile the templates to raw JS, so you can stub out the Jade library from the compiled source and use the much smaller runtime version instead.  Only do this if you are not going to be dynamically including more Jade templates though (i.e. you're building into a single file).

To stub out the modules use:

```javascript
({
  paths : {
    'jade-runtime' : './bower_components/jade/runtime'
  },
  stubModules: ['text', 'jade', 'jadeloader'],
  include : ['jade-runtime']
})
```

## License
Available via the MIT License. Jade is subject to its own licensing.