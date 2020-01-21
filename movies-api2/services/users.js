//Este es el servicio con el que usamos passport.js

const MongoLib = require('../lib/mongo');
// bcrypt se encarga de crear password en modo hash es decir  las encripta nunca debemos guardar contraseñas sin encriptar.
const bcrypt = require('bcrypt');

class UsersService {
  constructor() {
    this.collection = 'users';
    this.mongoDB = new MongoLib();
  }

  // recibe un email y apartir de aquí buscamos a ese usuario en la DB
  async getUser({ email }) {
    const [user] = await this.mongoDB.getAll(this.collection, { email });
    return user;
  }

  // creamos el usuario
  async createUser({ user }) {
    const { name, email, password } = user;
    //password con un numero de iteraiones de 10
    const hashedPassword = await bcrypt.hash(password, 10);

    const createUserId = await this.mongoDB.create(this.collection, {
      name,
      email,
      password: hashedPassword
    });

    return createUserId;
  }

  async getOrCreateUser({ user }) {
    const queriedUser = await this.getUser({ email: user.email });

    if (queriedUser) {
      return queriedUser;
    }

    await this.createUser({ user });
    return await this.getUser({ email: user.email });
  }
}

module.exports = UsersService;
