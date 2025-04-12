const bcrypt = require('bcryptjs');

const users = []; // Это будет временная "база данных"

class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  static async findOne({ email }) {
    return users.find(user => user.email === email);
  }

  static async save(user) {
    users.push(user);
  }

  static async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }

  async comparePassword(password) {
    return bcrypt.compare(password, this.password);
  }
}

module.exports = User;
