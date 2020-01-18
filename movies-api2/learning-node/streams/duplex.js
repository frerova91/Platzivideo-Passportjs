//simplificando el codigo de los streams con duplex y transform.Los duplex implementa writable y readable string en una sola sin tener que llamarlos de forma independiente.
const { Duplex } = require("stream");

const duplexStream = new Duplex({
  //writable stream
  write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  },

  //readable stream
  read(size) {
    if (this.currentCharCode > 90) {
      this.push(null);
      return;
    }

    this.push(String.fromCharCode(this.currentCharCode++));
  }
});

//65 es la letra A en exadecimal
duplexStream.currentCharCode = 65;
process.stdin.pipe(duplexStream).pipe(process.stdout);
