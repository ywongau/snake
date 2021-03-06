module.exports = {
  diff: true,
  extension: ['js', 'jsx'],
  package: './package.json',
  reporter: 'spec',
  slow: 75,
  timeout: 2000,
  ui: 'bdd',
  require: ['mocha/register.js', 'mocha/setup.js'],
  'watch-files': ['src'],
  reporter: 'min',
  spec: ['src/**/*.test.js*'],
  recursive: true,
  watch: true
};
