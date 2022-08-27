const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

require('dotenv').config()
const MONGO_URL = process.env.MONGO_URL

// Precisa ter o mongodb rodando localmente
// javascriptNote é o nome do data base local não precisa ter ele criado, ele é criado automaticamente quando a primeira collection é criada.
mongoose
  .connect(MONGO_URL, {
    //usar as novas ferramentas do mongoose
    useNewUrlParser: true,
    // Tem a ver com a indexação do conteudo.
    useUnifiedTopology: true,
    // Indexação do banco de dados
    // useCreateIndex: true 'Não é mais suportado e teve que ser removido'
  })
  .then(() => console.log('Connection successful'))
  .catch((err) => console.log(err));
