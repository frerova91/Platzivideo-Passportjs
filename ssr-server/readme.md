# 1.- Este es nuestro render server, comunicacion maquina maquina En esta clase vamos a implementar la estrategia de autenticación del sign-in y sign-up de nuestro Render Server.

    En nuestro proyecto del render server lo primero que vamos a hacer es crear un nuevo archivo para implementar nuestra estrategia Basic lo crearemos en: utils/auth/strategies/basic.js.

    También vamos a necesitar una nueva librería que se va ha llamar cookiesParser, recuerden que en la configuración de nuestro proyecto, definimos una estructura básica en el packages.json aquí solo los estamos incluyendola.

    y luego en el index.js creamos la logica de los request al server-api que creamos antes desde este nuestro render server.

# 2.- Implementación de las rutas de las películas de usuario, En está clase vamos a hacer la implementación de las rutas de las peliculas de usuario. Y para ello nos dirigimos a nuestras rutas de movies de usuario del index.js del render server.

    Ahora pasamos a revizar nuestros endpoints en postman, lo primero que debemos de hacer es levantar nuestros 2 servers.

    ¿Por qué los 2 servers?

    porque ahora no solo tenemos que levantar el render server, si no que también debemos levantar el Api Server.

# 3.- ver el docu de la clase en la carpeta es mucho que explicar y arreglar en el server.

# 4.- una vez creada la cuenta de google api y las credenciales de un proyecto(detalles en el docu de la clase) entonces procedemos a Implementando 0Auth2.0 con Google.

    1.- copiamos google client id y el  google client secret a .env y luego los configuramos en config/index.js
    2.- instalamos npm i passport-oauth
    3.- vamos a crear un nuevo archivo llamado oauth.js en utils/auth/strategies, donde estara la estrategia.
    4.- definimos la logica de la estrategia para luego importarla en el index.js el server para su implementacion.

# 5.- Implementando Sign Provider en nuestra API, aqui regresaremos anuestra api server de movies-api para crear un end point para oauth, para que la uatenticacion con google pueda hacer uso de nuestra api.

    .-Procedemos a ir a /movies-api2/services/users.js y dentro colocamos la logica
         async getOrCreateUser({user}){}

    .-Ahora vamos a hacr una modificacion en el esquema d los usuarios en movies-api2/utils/schema/users.js y alli agregamos  createUserSchema y createProviderUserSchema

    .-Y seguimos con la creacion de la ruta en movies-api2/routes/auth.js la ruta se llama:
    '/sign-provider',

    .- luego iniciamos el ssr-server y el movies-api2 server

    .- Y al final vamos al navegador y colocamos http://localhost:8000/auth/google-oauth el cual nos redirigira a una àgina para hacer login con una cuenta google regresandonos la info del usuario.

# 6.- Autenticación con Google usando OpenID Connect implementacion, este metodo nos ayudara a implementar mas facil google autenticate.

    .-Hacemos el mismo procedimiento de antes solo que vamos a hacer ahora esto:

        .-instalamos npm install passport-google-oauth
        .- luego creamos un servicio ssr-server/utils/auth/strategies/google.js
        .- y luego las rutas en index.js

# 7.- A continuacion vamos a solicitar una cuenta de developer para twitter y luego de que pase la aceptacion vamos a proceder a crear la logica en el server.

    1.- vamos a crear SESSION_SECRET con sun sha 256 y TWITTER_CONSUMER_KEY y TWITTER_CONSUMER_SECRET otorgado por twitter y su cnfiguracion en /config/index.js

    2.- luego vamos a crear la estrategia utils/auth/strategies/twitter.js

    3.- ahora vamos al ssr-server y aplicamos la logica para la implementacion de esta api para twitter.

    4.- luego levantamos los 2 servers ssr y api server y luego vamos al navegador e ingresamos http://localhost:8000/auth/twitter para probar el login.

# 8.-Aqui tendriamos la implementacion de facebook pero me la saltare por cuestiones de tiempo.

# 9.-Seguridad con Helmet y npm audit

    1.- Vamos a trabajar en nuestro server movies-api2 donde instalaremos npm i helmet
    2.-luego en index.js y requerimos helmet y lo implementamos con app.use(helmet()) asi ya esta implementado pero podemos pasarle dentro de helmet(!aqui!) unos parametros de configuracion ver la docu oficial en su pagina para mas info.
    3.-Ahora vamos a hacer esto mismo para el render server.
    4.- ahora vamos aver como podemos detectar vulnerabilidades npm audit todo en las imagenes. Snyk permite automatizar este proceso.

# 10.- Que és OWASP y buenas prácticas de seguridad e integracion de snyk con github para automatizacion de npm audit para proyectos. es una lectura ve los documentos del curso
