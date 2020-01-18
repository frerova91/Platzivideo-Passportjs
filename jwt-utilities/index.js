const jwt = require("jsonwebtoken");

// Sacar argumentos de la terminal esto lo hace el ProcessArgument a continuacion. Los Primero 2 parametros son [proceso de node, archivo que leemos,option(verificar o firmar),secreto, nombre o token] = process.argv;
const [, , option, secret, nameOrToken] = process.argv;

//Comprobando que tenemos
if (!option || !secret || !nameOrToken) {
  return console.log("Missing arguments");
}

//Firmando el jwt
function signToken(payload, secret) {
  return jwt.sign(payload, secret);
}

//Verificando el jwt
function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

//flujo de ejecucion
if (option == "sign") {
  console.log(signToken({ sub: nameOrToken }, secret));
} else if (option == "verify") {
  console.log(verifyToken(nameOrToken, secret));
} else {
  console.log('Option needs to be "sign" or "verify"');
}
