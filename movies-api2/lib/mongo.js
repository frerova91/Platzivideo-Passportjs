const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config');

// encodeURIComponent nos sirve para que si por casualidad existe un caracter especial no de problemas
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}?retryWrites=true&w=majority`;

//Libreria de mongoDB
class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true });
    this.dbName = DB_NAME;
  }

  connect() {
    // Usando Patron singleton, la idea es que si el cliente ya esta y la conexion ya esta abierta usemos la misma conexion y no creemos otro cliente. De tal forma que evitamos saturar las conexiones.
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect(err => {
          if (err) {
            reject(err);
          }
          console.log('Connected succesfully to mongo');
          resolve(this.client.db(this.dbName));
        });
      });
    }
    //si la conexion existe la retorno
    return MongoLib.connection;
  }

  //Definiendo las Acciones y implementandolas con los metodos de mongoDB.
  getAll(collection, query) {
    return this.connect().then(db => {
      return db
        .collection(collection)
        .find(query)
        .toArray();
    });
  }

  get(collection, id) {
    return this.connect().then(db => {
      return db.collection(collection).findOne({ _id: ObjectId(id) });
    });
  }

  create(collection, data) {
    return this.connect()
      .then(db => {
        return db.collection(collection).insertOne(data);
      })
      .then(result => result.insertedId);
  }

  update(collection, id, data) {
    return this.connect()
      .then(db => {
        return db
          .collection(collection)
          .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true }); //upsert es lo que determina si actualiza o inserta en la DB.
      })
      .then(result => result.upsertedId || id);
  }

  delete(collection, id) {
    return this.connect()
      .then(db => {
        return db.collection(collection).deleteOne({ _id: ObjectId(id) });
      })
      .then(() => id);
  }
}

//Ya implementadas las Acciones en la libreria de mongo podemos proceder a remover los mocks en nuestra capa de servicios, usar directamente la libreria y asi tener persistencia en la DB.
module.exports = MongoLib;
