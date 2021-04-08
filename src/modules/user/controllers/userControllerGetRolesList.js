import message from '../../utils/messages.js';
import analytics from '../../analytics/controllers/analytics.js';
import pkg from 'lodash';
const { get } = pkg;

const rolesList = [
  'teacher',
  'student_TI',
  'student_CRI',
  'student_SI',
];

const userGetRolesList = (req, res) => {
  const userId = get(req, 'userData.userId', null);

  analytics('USER_GET_ALL_ROLES_LIST_SUCCESS', {
    roles: rolesList,
    user: userId,
  });

  res.status(200).json(message.success('Get all roles list. Success', rolesList));
};

export default userGetRolesList;
