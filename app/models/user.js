const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// pre() roda o Schema antes de fazer alteração no banco de dados
// 'save' sempre que for salvar o valor no banco, rode a seguinte função
// next serve para passar para o próximo middleware, proximo pre/pos
userSchema.pre('save', function (next) {
  if (this.isNew || this.isModified('password')) {
    bcrypt.hash(this.password, 10, (err, hasshedPassword) => {
      if (err) next(err);
      else {
        this.password = hasshedPassword;
        next()
      }
    });
  }
});

userSchema.methods.isCorrectPassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, same) {
    if(err)
      callback(err)
    else
      callback(err, same)
  })
}

module.exports = mongoose.model('User', userSchema);
