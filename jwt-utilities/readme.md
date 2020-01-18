# 1.- Firmando y Verificando nuestro JWT, para ellos en este proyecto lo primero sera crear la carpeta, iniciar nuestro proyecto con npm init -y e instalmos la dependencia jsonwebtoken y asi mismo la requerimos en el archivo principal index.js y procedemos a desarrollar la logica para el mismmo.

        .-Firmando un token:
        node index.js sing palabrasecreta miusuario

        .-Verificando un token
        node index.js verify palabrasecreta TOKEN-GENERADO.AL-FIRMAR

        .-Como verificamos todo esto podemos ir a jwt.io y colocamos el token, podemos verificarlo facilmente ingresando la palabra secreta en Verify Signature para ver la funcionalidad.
