#browserify-client

A client that dynamically requires npm modules via an instance of
[browserify-server](https://github.com/featurist/browserify-server), from the
browser or node.js.

```JavaScript
var client = require('browserify-client').connect('http://localhost:4000');

client.require('underscore', function(err, _) {

  // _ is set to the latest version of underscore

});

client.require('underscore', '1.0.0', function(err, _) {

  // _ is set to v 1.0.0 of underscore

});

client.require({ underscore: '1.0.0', lodash: 'latest' }, function(err, r) {

  // r.underscore is set to v 1.0.0 of underscore
  // r.lodash is set to the latest version of lodash

});

```

## license

MIT
