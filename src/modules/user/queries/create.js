import User from '../userModel.js';
import message from '../../utils/messages.js';
import bcrypt from 'bcryptjs';

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const userCreateQuery = (user) => {

  const newUser = new User({
    _id: user._id,

    email: user.email,

    name: `${user.firstName} ${user.lastName}`,
    firstName: user.firstName,
    lastName: user.lastName,
    password: hashPassword(user.password),
    roles: user.roles,
  });

  return newUser
    .save()
    .then(() => {
      return message.success('User created successfully', user._id);
    })
    .catch((error) => {
      if (error.code === 11000) return message.fail('User with entered email exist');
      return message.fail('Error', error);
    });
};

export default userCreateQuery;
