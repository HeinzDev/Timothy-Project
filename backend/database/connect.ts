const mongoose = require('mongoose');
const dotenv = require('dotenv');

import User from './models/user.model';

dotenv.config();

mongoose.set('strictQuery', true);

//url do banco de dados
const mongoURL =
  process.env.MONGODB_USER && process.env.MONGODB_PASSWORD !== ''
    ? `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.tnvz3i0.mongodb.net/?retryWrites=true&w=majority`
    : process.env.LOCAL; //banco de dados local(docker)

const connectToDataBase = async () => {
  try {
    await mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conexão com banco de dados estabelecida!');

    //criar usuario padrão, pode ser substituido com nossos usuários depois
    User.findOne({ username: '@admin' })
      .then((user) => {
        if (!user) {
          const newUser = new User({
            name: 'admin',
            username: '@admin',
            password: 'admin',
          });

          newUser
            .save()
            .then(() => {
              console.log(`____________________________
                        |     Created Admin user!    |
                        +----------------------------+
                        | username | admin           |
                        | email    | admin@admin.com |
                        | password | admin           |
                        +____________________________+`);
            })
            .catch((error) => {
              console.error('Erro ao criar o usuário admin: ', error);
            });
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar usuário: ', error);
      });
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
};

module.exports = connectToDataBase;
