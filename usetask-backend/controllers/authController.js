const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Simulación de base de datos
let users = [];

// Registro de usuario
const registerUser = (req, res) => {
  const { username, password } = req.body;

  // Verificar si el usuario ya existe
  if (users.find((user) => user.username === username)) {
    return res.status(400).json({ message: 'Usuario ya existe' });
  }

  // Encriptar la contraseña
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  // Guardar el usuario (en memoria por ahora)
  const newUser = { username, password: hashedPassword };
  users.push(newUser);

  res.status(201).json({ message: 'Usuario registrado exitosamente' });
};

// Iniciar sesión
const loginUser = (req, res) => {
  const { username, password } = req.body;

  const user = users.find((user) => user.username === username);

  if (!user) {
    return res.status(400).json({ message: 'Usuario no encontrado' });
  }

  // Comparar contraseñas
  const isMatch = bcrypt.compareSync(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: 'Contraseña incorrecta' });
  }

  // Crear un token JWT
  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
};

module.exports = { registerUser, loginUser };
