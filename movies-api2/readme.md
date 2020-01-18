# 1.- Nuestro proyecto la arquitectura va a depender de un API Server, el cual fue construido en el Curso de Backend con Node.js. Este tiene un CRUD(create,read,update,delete) de películas, añadido a esto nosotros vamos a crear un endpoint para registrar e iniciar la sesión de nuestros usuarios.

    Para poder consumir este endpoint de sigin los clientes(API server y Render server), necesitan un API Token(Que es muy diferente a un Access Token). El API TOKEN permite definir los permisos que tendran los clientes, en el caso del "admin client"en el API server, se le va a consignar unos permisos administrativos CRUD(crear,leer,actualizar,borrar) peliculas y para Render server se le otorgara un API token con permisos publicos de solo lectura.

    Cuando el Render Server y el API Server hagan autenticacion haciendo uso del API token todo la estrategia de Autenticacion va a generar un Access Token. Este Va a ser un jsonwebtoken que va a tener la informacion del usuario que hace autenticacion y los permisos determinados por el API TOKEN, de esta manera en las peticiones siguientes nuestro render server o admin client con el Access token que fue generado va a poder consumir los recursos del API Token.

    La SPA que puede ser construida con (React,Vue,Angular,etc), la forma con la cual se comunicara con nuestro api server va a server aravez de nuestro Render server, que va a hacer de proxy en esta artiquetectura es muy inportante tener un servidor ya que toda la communicacion que sucede de los Access tokens mediante la api server debe ocurrir en el servidor. Si no tienes un render server es necesario que crees un server que haga de proxy entre la SPA y el API Server.

    La forma o manera en que la SPA se a comunicar con el API Server va a ser por medio de una cookie que contendra el Access Token del render server. Ahora vamos a explorar el codigo para saber como fue construido el API Server en el curso de bakend con node.js

    En el Repo se a agregado un API Server es un proyecto en express que tiene implementado una ruta de peliculas con diferentes endpoint para poder (listar,listar segun el ID, crear, validacion para comprobacion de info correcta, actulizar y eliminar) peliculas, la responsabilidad de las rutas en este caso es recibir y regresar los datos de la peliculas. Pero realmente donde ocurre la logica de Negocio es en la capa de servicios -> movies.js que tiene implementado similarmente el sistema crud que por medio de mongo y su libreria nos comunica con la DB para realizar estas acciones.

    Ahora vamos a proceder a levantar el proyecto con npm run dev para hacer unos llamados con postman a los diferentes endpoint para verificar su respuestas.

    .- npm run dev
    .- vamos a postman para verificar los endpoints, hay una imagen en las carpetas del curso.
    .- asi podremos ver peliculas con sus datos y con su id podemos harcer busquedas para verificar la informacion.

# 2.-Agregando coleción de usuarios, En está clase vamos a agregar el esquema de los usuarios y el servicio de los usuarios y vamos ver como lo podemos hacer en el código.

    .-Vamos a crear un nuevo schema en nuestra carpeta/utils/schemas/users.js, aquí lo que vamos a hacer es requerir una    librería que se llama joi, está librería lo que nos permite es definir el schema que va ha ser usado en la           collection de usuarios.

    .-Ahora nos disponemos a crear el servicio, para ello nos vamos a ir a nuestra carpeta de services/users.js;

    .- instalamos, npm i bcrypt para encriptar las contraseñas

# 3.- Agregando la colección de películas de usuario En la clase anterior agregamos el servicio de los usuarios, esto nos va ha permitir obtener usuarios de la base de datos. Ahora vamos a agregar el schema, la ruta y el servicio de las peliculas del usuario. Esta configuración nos servirá más adelante cuando un usuario autentique y agregue una pelicula a su lista, lo pueda ver reflejado en la aplicación.

    .-Vamos a utils/schemas/ y vamos a crear el schema que se va a llamar userMovies, esté eschema lo que nos permite es que cuando hagamos llamado a nuestros endpoints podamos tener el formato correcto de estos endpoints.

    .-Ahora vamos a crear un servicio, para eso vamos a la carpeta de services y vamos a crear un servicio que se va ha llamar userMovies.js Como los usuarios de las peliculas van a ser manipulados de diferentes maneras, vamos a crear unos métodos que serán para obtener las peliculas del usuario, apartir de un userId, también vamos a tener el método que nos va ha permitir crear una pelicula del usuario, esto quiere decir cuando el usuario quiera agregar una pelicula a su lista de favoritos, y finalmente el usuario también va ha poder eliminar una pelicula de su lista de favoritos. Con nuestro servicio ya implementado vamos a implementar la ruta que le da manejo ha esté servicio, vamos a implemenar la ruta que le da manejo ha esté servicio.

    .-
    En la carpeta de routes vamos a crear una nueva ruta que se va ha llamar userMovies.js Despues de crear nuestro archivo userMovies.js en nuestra carpeta de routes pasamos a implementarlo haciendo uso de los schemas y servicios que creamos.

# 4.- Implementando el POST y DELETE de las peliculas de usuario En está clase vamos a continuar con la implementación de las rutas del usuario, en esta ocación vamos a hacer la implementación de la creación de las peliculas de usuario y la implementación de la eliminación de las peliculas del usuario dentro de /routes/userMovies.js .

    .-Ahora para poder usar nuestra ruta, debemos ir a nuestro archivo index.js de nuestro proyecto y aquí vamos a hacer uso de nuestra ruta.

# 5.- Cómo conectarnos a la base de datos esta en los archivos del curso documento

# 6.-Configurando passport.js En está clase vamos a explorar la configuración inicial de passport.js. PassportJS es un middleware para express que nos permite implementar distitas estrategias de autenticación de una manera muy fácil y simple.

    .-npm i passport jsonwebtoken passport-http passport-jwt
    .-npm i -D chalk, permite pintar colores en la terminal
    .-Agregar en le archivo .env y .env.example las siguientes variables de entorno:

        // USERS, para testear la api
        DEFAULT_ADMIN_PASSWORD=
        DEFAULT_USER_PASSWORD=

        // AUTH, firma los jwt generando una clave en www.keygen.io WEP 256-bit key
        AUTH_JWT_SECRET=

        // API KEYS, es la autorizacion entre el frontend y backend de la app, generado aleatoriamente por medio de scripts, cada script tiene una linea comentada que generara en la db lo requerido para que funcione.

        PUBLIC_API_KEY_TOKEN=
        ADMIN_API_KEY_TOKEN=

    .-Hay que copiar los script la carpeta en el proyecto y ejecutarlos en linea de comandos oir medio de la linea comentada en cada uno de ellos y se deberian de crear en el db de mongo los api-keys necesaria para colocarlas en .env, asi como la informacion relevante de usuarios y peliculas.

    .-La conexion con la db deberia ser automatica porque ya esta configurada en este proyecto de otra forma tendrias que hacer la implementacion de la conexion con la base de datos.

# 7 .-Implementación de BasicStrategy con Passport.js, En esta clase aprenderás como implementar estrategias de autenticación haciendo uso de Passport.js. Las estrategias de autenticación nos sirven para determinar como nos vamos a autenticar, haciendo uso de estas estrategias en las diferentes rutas y así definir de donde saldra el usuario que vamos a usar de ahí en adelante, vamos a verlo como se hace en el código.

        .-Lo primero que vamos a hacer es crear un carpetas y archivos /utils/auth/strategies y dentro los archivos basic.js.
