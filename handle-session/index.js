const express = require("express");
const session = require("express-session");

const app = express();

app.use(
  session({
    //Para no guardar la cookies cada vez que surja un cambio.
    resave: false,
    //En ciertas app o mecanismos de almacenamiento para que aunque no exista  un cambio en la sesion siemrpe se guarde en este mecanismo de almacenamiento. Podefecto si la cookies no a sido inicializada no se guardara por defecto.
    saveUninitialized: false,
    // debe ser un string de 256bits con una palabra a modo de ejemplo este secret es el que se usa para cifrar la cookie
    secret: "keyboard cat"
  })
);

//Ruta para el home qu vamos a hacer uso de nuestra sesion
app.get("/", (req, res) => {
  req.session.count = req.session.count ? req.session.count + 1 : 1;
  res.status(200).json({ Hello: "Hola mundo", counter: req.session.count });
});

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
