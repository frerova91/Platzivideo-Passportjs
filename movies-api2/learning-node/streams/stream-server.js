//módulo para crear un servidor
const http = require("http");
//módulo para trabajar con archivos
const fs = require("fs");
//inicializamos el servidor
const server = http.createServer();
//manejamos los eventos del servidor
server.on("request", (request, response) => {
  /**
   * lee el archivo como un stream
   * el tamaño del chunk por defecto es de 64kb
   * para un fs, para un stream normal es de 16kb
   */
  const src = fs.createReadStream("./big");

  /**
   * la función de 'pipe()' es limitar el
   * almacenamiento en buffer de datos a niveles
   * aceptables de modo que no se sobrecargue la
   * memoria disponible.
   */
  src.pipe(response);
});

server.listen(3000);

//Interesante, en vez de cargar el archivo de una sola vez y agotar la memoria. Se va cargando por lotes //o fracciones reduciendo así el consumo de memoria y una eventual sobrecarga del servidor.

//Hacer una petición al servidor stream-server.js con curl

//curl -i localhost:3000
