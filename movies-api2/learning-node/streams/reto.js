const { Transform } = require("stream");

String.prototype.toCamelCase = function() {
  return this.replace(/\s(.)/g, input => input.toUpperCase())
    .replace(/ /gi, "")
    .replace(/^(.)/, input => input.toLowerCase());
};

const transformStream = new Transform({
  transform(chunk, enconding, callback) {
    this.push(chunk.toString().toCamelCase());
    callback();
  }
});

process.stdin.pipe(transformStream).pipe(process.stdout);

//este es un codigo mas optimizado
