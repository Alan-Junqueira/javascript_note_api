const mongoose = require('mongoose');

let noteSchema = new mongoose.Schema({
  title: String,
  body: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  // Relação
  author: {
    // Schema do mongoose
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

noteSchema.index({ title: 'text', body: 'text' });

// A exportação é Note, usando o Schema criado.
module.exports = mongoose.model('Note', noteSchema);
