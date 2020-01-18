# 1.-Creando tu primer servidor con Express.js este es claro el proyecto en la parte de bakend de la escula de javascript de platzi con platzi video a continuacion los primero pasos para la creacion del backend.

    1.- creamos la carpeta donde estamos movies-api
    2.- npm init -y , para iniciar el proyecto.
    3.- Creamos los scripts primarios DEV y Start con sus respectivas variables dde entorno.

        "dev": "DEBUG=app:* & nodemon index",
        "start": "NODE_ENV=production & node index.js"

    4.- Copiamos las reglas de eslint de platzivideo en el archivo .eslintrc.json
    5.- Configuramos .prettierrc.json nos ayuda a hacer un mejor format del codigo estableciendo unas reglas.
    6.- Ahora instalaremos las primeras dependencias del proyecto:

        Dependencias de Desarrollo:

            npm i -D nodemon eslint eslint-config-prettier eslint-plugin-prettier prettier

        Dependencias de Produccion

            npm i express dotenv

    7.- Ahora instalaremos un hook que permitira que nuestro codigo haga el formateo automatico cada vez que se hace commit y se sube al repositorio.

        npx mrm lint-staged

    8.- Vamos a continuacion a crea una carpeta config con un archivo index.js que contendra las variables de entorno de nuestra app.

    9.- Crearemos la primera parte del server de prueba serverTest.js recuerda que para utilizarlo tendrias que cambiar el script en package.json

    10.- No olvidemos inicializar el repo con git init y crear .gitignore para ignorar node_modules entre otras carpetas y archivos. puedes usar el auto generador oficial de https://www.gitignore.io

    11.- Realizamos los retos y servidores de prubas en la carpeta de RETOS

    12.-Anatomía de una API Restful, REST (Representational State Transfer) es un estilo de arquitectura para construir web services, no es un estándar pero si una especificación muy usada.

    Las peticiones HTTP van acompañadas de un “verbo” que define el tipo de petición:

        .-GET. Lectura de datos.
        .-PUT. Reemplazar datos.
        .-PATCH. Actualizar datos en un recurso específico.
        .-POST. Creación de datos.
        .-DELETE. Eliminación de datos.

    No es recomendable habilitar un endpoint de tipo PUT y DELETE para toda nuestra colección de datos, sólo hacerlos para recursos específicos, ya que no queremos que por error se puedan borrar todos nuestros datos.

# 2.- Mockaroo es un servicio que nos permite crear datos simulados a partir de una estructura, por ejemplo para generar la estructura de nuestra película:

    {
        id: 'd2a4a062-d256-41bb-b1b2-9d915af6b75e',
        title: 'Notti bianche, Le (White Nights)',
        year: 2019,
        cover: 'http://dummyimage.com/800x600.png/ff4444/ffffff',
        description:
        'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
        duration: 66,
        contentRating: 'G',
        source: 'https://ovh.net/semper/rutrum/nulla/nunc.jsp',
        tags: [
        'Action|Adventure',
        'Action|Adventure|Thriller',
        'Horror|Western',
        'Horror|Thriller',
        'Comedy|Romance|Sci-Fi',
        'Adventure|Animation|Children|Comedy|Fantasy',
        'Drama'
        ]
    }

    con esto podremos generar datos falsos para pruebas de forma muy rapida.

# 3.- Implementando un CRUD en Express.js, vamos a continuacion a crear unos archivos y carpetas para usar la info con crud

    1.- Creamos la carpeta donde viven las rutas routes, dentro movies.js crearemos la logica para las rutas es basico este archivo es para entender como se crean las rutas mas adelante se le agregara coneccion con la base de datos y todo lo demas.

    2.- en el archivo de index.js el principal del backend vamos a importar las rutas de nuestra app.

    3.- Debemos crear un archivo de Mock que nos ayudara a falsear datos para realizar pruebas para ello crearemos, las capetas utils/mocks y un archivo movies.js que contiene la info falsa.

    4.- Por ultimo probamos con postman por la ruta http://localhost:3000/api/movies enviando un request de metodo get para ver la info de las peliculas, claro una vez iniciado el server con npm run dev

# 4.- Métodos idempotentes del CRUD implementacion (create,read,put,delete), aqui crearemos una ruta para manejar dichos metodos en el archivo dentro de routes/movies.js

# 5.- Implementando una capa de servicios para ello crearemos la carpeta services dentro un archivo movies.js y ademas modificaremos routes/movies.js para usar los servicios, La arquitectura tradicional MVC se queda corta en aplicaciones modernas, por eso necesitamos una arquitectura diferente cómo la Clean Arquitecture que tiene una capa de servicios para manejar la lógica de negocio.

    .- La unica responsabilidad de las rutas es saber como recibe los parametros y como se los envia a los servicios. Y los servicio si saven, que hacer con todos los parametros y los datos recibidos y como devolverlos.

    .- en el desafio usamos PATCH simplemente para practicar la estructura pero patch tiene sus desventajas hay que usarlo con cuidado.

# 6.- Creando una base de datos no relacional o mejor dicho NotOnly SQL, con mongoDB Atlas. Vamos a ahcer uso de las variables de entorno para separa la parte del development de producition ya que sedebia usar diferentes bases de datos.

    1.- Hay que crear un cuenta en MongoDB Atlas para la contraseña porfavor usar un Administrados de contrseñas como bitwarden u otros, no repitas las contraseñas deben ser unicas.

    2.-Configura un clouster gratuito para tus proyectos. Y sigue con la configuracion indicada en las imagenes del proyecto hay info.

    3.-Para cuando estemos en produccion debemos determinar cual es la ip de la maquina y asegurarnos de que solo esa ip tenga permitido acceder a esas bases de datos pero por el momento no le asignaremos una ip estatica tambien puedes asignarle un tiemo espesifico de acceso. Esto es una buena practica restringir las conexiones por IP.

    4.- Agregamos un Usuario con los permisos correcpondientes. Guarda la informacion de acceso en varias partes encriptadas y bien seguras es absolutamente necesario.

    5.- Una vez inicializado o creado el cluster que es una base de datos con 3 instancia(minimo) que otorga alta disponibilidad podemos empezar con la creacion de la base de datos en collections.

    6.- Ahora procedemos a crear la base de datos de nombre platzivideos_db y collection movies.

# 7.- Conexión a MongoAtlas una instancia de MongoDB. Ya que tenemos nuestra cuenta en mongodb atlas nos disponemos a crear la conexión en nuestra aplicación.

    1.-instalar el paquete npm i mongodb

    2.-Vamos a crear 2 archivos: .env.example y el archivo .env

    NOTA: El archivo .env.example es necesario para que cualquier otro desarrollador que tome nuestro proyecto sepa que variables de entorno debe alimentar localmente, mientras que el archivo .env van a ser las variables de entorno y va a ser alimentada por el archivo de configuración, esté nunca debe ser subido a base de datos, porque si no estamos exponiendo nuestras credenciales y cualquiera que tenga acceso al repositorio podría tomarlas, ya se han problemas por situaciones como está.

    3.- Una vez llenado .env con las credenciales de la DB configuramos en  config/index.js y procedemos a crear lib/mongo.js donde residira la configuracion para la conexion con la base de datos.

# 8.- Implementación de las acciones de MongoDB son basicamente lo que es compatible con el CRUD, en nuestro archivo de lib/mongo.js vamos a proceder a hacer la configuracion con la basse de datos de mongo por medio de la libreria que estamos creando, definiendo las variables y la URI de mongo e implementando la logica para que las acciones ejecuten los metodos de mongo para la comunicacion con la DB.

    Los métodos de MongoDB para implementar un CRUD son:

    Create
        insertOne
    Read
        find
        findOne
    Update
        updateOne
    Delete
        deleteOne

# 9.-Conexión de nuestros servicios con MongoDB, ya que implementaste las acciones en la librería de mongo, nos vamos a disponer a coger la capa de servicios, remover los mocks e implementar esa librería y en está ocación ya tendremos persistencia de datos.

    Si vamos a crear un registro por medio de postman cuando hacemos el send, vamos a tener un error y es porque el aún no sabe como leer los datos que le estamos pasando, por defecto express necesita parcear estos datos JSON. La manera de corregirlo es agregando un Middleware desde el index.js

# 10.- ¿Qué es un middleware? y Capa de manejo de errores usando un middleware

    Un middleware es una pieza de software que está en medio de otras 2, se le suele describir como software glue, es decir pegamento de software y es porque nos ayuda a conectar otras piezas de software, pensemos por un momento en la población y en el agua, que es un recurso natural, si queremos que esté recurso natural llegue a la población deberíamos insertar en el medio, en esté caso un middleware que sería un sistema de tuberias, el sistema de tuberías nos permite conectar el agua a la población, pero nosotros podemos seguir agregando middlewares, podemos agregar un middleware que se encargue de purificar el agua y luego podríamos poner otro middleware que se encargue de contar el consumo del agua.

    para mas info sobre el middleware de express de este caso https://github.com/JasanHdz/backendnodejs/tree/master/notes#qu%C3%A9-es-un-middleware

    .- Vamos a crear una carpeta en utils/middlesware/errorHandlers.js para manejar la interconectividad de las piesas de software por medio e los middlesware asi como el uso de multiples middlewares.

    .-importamos y usamos con app.use() los errores en nuestro servidor siempre despues de laas rutas del mismo.

    .- por ultimo para ver los errores podemos hardcodear el error en las rutas al tratar de obtener un video para ver el error.

# 11.- Capa de validación de datos usando un middleware.

# 12.- Implementando Boom manejador de errores mas facil de usar ofusca la complejidad de los errores http

    .-npm i @hapi/boom

# 13.- implementando jio

    .-npm i @hapi/boom

# 14.- Implementando Test en node.js

    1.-Esta primer suit de test es para testear los endpoint en la capa de rutas su unica responsabilidad de test es probar que le llegan los datos y los regresa correspondientes.

        .-npm i -D mocha  supertest sinon proxyquire
        .- luego creamos utilidades en los mocks para testear y un server aparte para del principal del servido todo esto en la carpeta utils/
        .-Ahora creamos una carpeta llamada test en la cual crearemos nuestros test
        .- dentro de ese archivo routes.movies.test.js crearemos el test de las rutas.
        .- finalmente creamos un script en package.json.
        .- con el script "test": "mocha --exit" no deberia aver problemas e que encuentre los test por como finalizan los archivos con .test.js ademas de estar en su carpeta de test.

            mocha: nos ayuda a correr los test
            supertest: levanta un servidor temporal
            sinon: crea mocks para tests
            proxyquire inyecta los mocks cuando se requieren los paquetes.

# 15.- Creación de tests para nuestros servicios

    Lo que vamos a hacer es que vamos a ir a nuestra carpeta de utilis - mocks y vamos a crear un nuevo mock que sería para librería de mongo

    Vamos a requerir sinon. Lo que nos permite crear struct o mocks, sinon cada vez que creamos un nuevo struct, les inyecta unas propiedades si estos fueron llamados o no. Entonces es super útil para que en nuestros servicos puedamos probar cuando el servicio fue ejecutado, si llamó los métodos de las respectivas librerías.

    También vamos a traer de los mocks. Los mocks que creamos con anterioridad de las peliculas y de la funcionalidad filteredMoviesMock, esto es con el fin de cuando se haga un test con los tags podamos simular que se filtro. Luego vamos a hacer la creación de nuestros structs.

# 16.- Creación de Test para nuestras utilidades

    Vamos a crear test para nuestras utilidades pero esta vez vamos a hacerlo haciendo uso de td, la técnica de td trata primero crear los test y luego la funcionalidad, personalmente considero que hay algunos casos que vale la pena usar td, por ejemplo cuando se tiene muy claro cuál es la lógica de negocio, si tu tienes muy clara la lógica de negocio, muy fácil puedes crear los test y luego solucionarlo en la funcionalidad, si no es claro la verdad no va a funcionar td para nada, otro caso donde es muy común hacer td es cuando tienes un bug, escribes un test que va a fallar porque existe el bug, corriges el bug y luego el test debería pasar, así aseguras que ese bug no va a volver a suceder porque ya tienes un test que lo impide, vamos a ver como se hace en el código. Lo que vamos a solucionar en esté caso es una utilidad que vamos a crear para que imprima los mesajes de nuestras rutas, recuerden que nosotros en nuestra ruta simpre devolvemos un mensaje.

    Nosotros quisieramos automatizar estó, entonces vamos a crear una utilidad que haga eso, la cual vamos a llamar buildMessage y como estamos haciendo td, lo único que vamos a definir es el cuerpo de la utilidad, que en esté caso va a recibir una entidad, porque así lo definí en mi lógica de negocio, la cúal vamos a exportar. Por ahora está utilidad no hace nada, primero vamos a escribir los test y a media que vamos resolviendo los test es lo que nos va a determinar como solucionamos esa utilidad.

# 17.- Agregando un comando para coverage

    .-npm i -D nyc hace parte de una herramienta llamada istabul. Luego lo que necesitamos crear es nuestro comando el packages.json

    HAY MUCHO MAS EN EL DOCUMENTO DEL CRUSO
