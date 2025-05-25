const jwt = require('jsonwebtoken');

const autenticar = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    const tokenLimpo = token.replace('Bearer ', '');
    const payload = jwt.verify(tokenLimpo, process.env.JWT_SECRET);
    req.userId = payload.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = autenticar;
