const PROXY_CONFIG = {
  '/env-config.json': {
    bypass: function (req, _res, proxyOptions) {
      if (req.url.startsWith(proxyOptions.context)) {
        return '/nginx/env-config.json';
      }
    },
    logLevel: 'debug',
  },
};

module.exports = PROXY_CONFIG;
