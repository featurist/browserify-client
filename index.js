var request = require('superagent');

function Client(browserifyServerHost) {
  this.host = browserifyServerHost;
}

Client.prototype = {
  require: function() {
    var a = arguments;
    if (a.length == 3) {
      send(this.host, [{ name: a[0], version: a[1] }], a[2]);
    }
    else {
      if (typeof(a[0]) == 'object') {
        send(this.host, versionHashToArray(a[0]), a[1]);
      } else {
        send(this.host, [{ name: a[0] }], a[1]);
      }
    }
  }
}

function send(host, modules, callback) {
  var moduleNamesAndVersions = modules.map(function(entry) {
    return entry.name + (entry.version ? '@' + entry.version : '');
  }).join(',');
  var url = host + '/modules/' + moduleNamesAndVersions;
  request
    .get(url)
    .end(function(err, res) {
      if (err) {
        callback(err);
      } else {
        requireModules(res.text, modules, callback);
      }
    });
}

function requireModules(js, modules, callback) {
  var require = new Function('var require;\n' + js + '; return require;')();
  var required = {};
  if (modules.length == 1) {
    required = require(modules[0].name);
  } else {
    for (var i = 0; i < modules.length; ++i) {
      required[modules[i].name] = require(modules[i].name)
    }
  }
  callback(null, required);
}

function versionHashToArray(hash) {
  var array = [];
  var keys = Object.keys(hash);
  for (var i = 0; i < keys.length; ++i) {
    array.push({ name: keys[i], version: hash[keys[i]] });
  }
  return array;
}

function connect(host) {
  return new Client(host);
}

module.exports = {
  connect: connect
};
