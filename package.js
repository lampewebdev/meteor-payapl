Package.describe({
  name: 'lampe:paypal',
  summary: 'paypal-rest-sdk wrapper ',
  version: '0.0.1',
  git: ' /* Fill me in! */ '
});

Npm.depends({'paypal-rest-sdk': '1.5.3'});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.addFiles('common.js', ["server","client"]);
  api.addFiles('server.js', ["server"]);
  api.addFiles('client.js', ["client"]);
  api.export('Paypal', ['client', 'server']);
});
