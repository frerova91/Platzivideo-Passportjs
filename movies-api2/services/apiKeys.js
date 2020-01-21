//Servicio que permite a partir de un apikeytoken podamos obtener los scopes, que son requeridos a la hora de hacer sing in para firmar los jsonwebtoken con los scopes correspondientes deacuerdo con apitoken que enviemos.

const MongoLib = require('../lib/mongo');

class ApiKeysService {
  constructor() {
    //api-keys ya definidos gracias los scripts de mongo
    this.collection = 'api-keys';
    this.mongoDB = new MongoLib();
  }

  //metodo
  async getApiKey({ token }) {
    const [apiKey] = await this.mongoDB.getAll(this.collection, { token });
    return apiKey;
  }
}

module.exports = ApiKeysService;
