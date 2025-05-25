const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: { type: String, required: [true, "Please, enter with a title"] },
  prioridade: { type: Number, default: 3 },  // 1 = alta, 2 = media, 3 = baixa
  criadoEm: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const BrainBox = mongoose.model('Idea', ideaSchema);
module.exports = BrainBox;
