const conf = require('./gulp.conf');

module.exports = function () {
  return {
    server: {
      port: 8080,
      baseDir: [
        conf.paths.tmp,
        conf.paths.src
      ]
    },
    open: false
  };
};
