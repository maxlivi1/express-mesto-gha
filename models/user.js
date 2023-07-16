const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: (props) => `Отправлен некорректный email - ${props.value}`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: [2, 'Некорректные данные: Поле должно содержать не менее 2 символов'],
    maxlength: [30, 'Некорректные данные: Поле должно содержать не более 30 символов'],
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: [2, 'Некорректные данные: Поле должно содержать не менее 2 символов'],
    maxlength: [30, 'Некорректные данные: Поле должно содержать не более 30 символов'],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (value) => validator.isURL(value),
      message: (props) => `Отправлен некорректный url аватара - ${props.value}`,
    },
  },
});

module.exports = mongoose.model('user', userSchema);
