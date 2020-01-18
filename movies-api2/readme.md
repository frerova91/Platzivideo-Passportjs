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

# 3.-
