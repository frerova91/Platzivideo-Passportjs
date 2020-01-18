const http = require("http");
const server = http.createServer();

const semana = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado"
];

server.on("request", (req, res) => {
  if (req.method === "POST" && req.url == "/adivinarDia") {
    let body = [];

    req
      .on("data", chunk => {
        body.push(chunk);
      })
      .on("end", () => {
        body = Buffer.concat(body).toString();
        const date = new Date(body);
        let diaSemana = semana[date.getDay()];

        res.writeHead(200, { "Content-type": "text-plain" });
        res.end(`El dia de mi nacimiento fue un ${diaSemana}`);
      });
  } else {
    res.status = 404;
    res.end();
  }
});
const PORT = 3003;

server.listen(PORT, () => {
  console.log(`Eschuchando en el puerto ${PORT}`);
});
// Se invia y recibe la informacion con postman
