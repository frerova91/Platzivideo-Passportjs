# 1.- Este es nuestro render server, comunicacion maquina maquina En esta clase vamos a implementar la estrategia de autenticación del sign-in y sign-up de nuestro Render Server.

    En nuestro proyecto del render server lo primero que vamos a hacer es crear un nuevo archivo para implementar nuestra estrategia Basic lo crearemos en: utils/auth/strategies/basic.js.

    También vamos a necesitar una nueva librería que se va ha llamar cookiesParser, recuerden que en la configuración de nuestro proyecto, definimos una estructura básica en el packages.json aquí solo los estamos incluyendola.

    y luego en el index.js creamos la logica de los request al server-api que creamos antes desde este nuestro render server.

# 2.- Implementación de las rutas de las películas de usuario, En está clase vamos a hacer la implementación de las rutas de las peliculas de usuario. Y para ello nos dirigimos a nuestras rutas de movies de usuario del index.js del render server.

    Ahora pasamos a revizar nuestros endpoints en postman, lo primero que debemos de hacer es levantar nuestros 2 servers.

    ¿Por qué los 2 servers?

    porque ahora no solo tenemos que levantar el render server, si no que también debemos levantar el Api Server.
