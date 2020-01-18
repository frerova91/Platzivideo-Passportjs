//creando un server
const fs = require("fs");

//Coneste programa estamos probando el problema de consumo e grandes archivos y multiples peticiones con el archivo big con esto saturamos la pc hasta dejarla sin memoria. Como solucionamos esto con el siguiente programa Stream-server.js
const server = require("http").createServer();

server.on("request", (req, res) => {
  fs.readFile("./big", (err, data) => {
    if (err) {
      console.log("error", err);
    }

    res.end(data);
  });
});

server.listen(3000);
//WARNING Esto consumira toda la memoria de la pc

//Levantamos el server: node file-server.js

//Hacemos la peticion: curl -i localhost:3000
