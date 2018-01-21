const Glob = require('glob');
const Path = require('path');
const pattern = './*.service.js';
let internals = {};
const globtions = {
  nodir: true,
  strict: true,
  ignore: [],
  cwd: Path.dirname(__filename)
}
const matches = Glob.sync(pattern, globtions);
matches.forEach(match => {
  const load = require(globtions.cwd + '/' + match);
  const conHandlerName = Path.basename(match, Path.extname(match));
  const handlerName = Path.basename(conHandlerName, Path.extname(conHandlerName));
  const cls = load.default || load;
  internals[handlerName] = cls;
});
module.exports = internals;
