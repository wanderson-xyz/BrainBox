const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.registrarUsuario = async (req, res) => {
  try {
    console.log(req.body); // 👈 veja se está vindo nome, email e senha
    const { nome, email, senha, confirmarSenha } = req.body;

    if (!nome || !email || !senha || !confirmarSenha) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    if (senha !== confirmarSenha) {
      return res.status(400).json({ message: 'As senhas não coincidem' });
    }

    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'Usuário já cadastrado' });
    }

    const novoUsuario = new User({
      nome,
      email,
      senha
    });

    await novoUsuario.save();

    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (err) {
    console.error('Erro ao registrar usuário:', err);
    res.status(500).json({ message: 'Erro ao registrar usuário' });
  }
};


// Função para login de usuário

exports.loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Usuário não encontrado' });

    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) return res.status(400).json({ message: 'Senha incorreta' });

    console.log("Senha enviada:", req.body.senha);
    console.log("Senha do banco:", user.senha);

    // Criar token JWT (exemplo simples)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      token,
      user: {
        nome: user.nome,
        email: user.email
      },
      message: 'Login realizado com sucesso!'
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error });
  }
};
