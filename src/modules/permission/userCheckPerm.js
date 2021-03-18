import message from '../utils/messages.js';
import User from '../user/userModel.js';
import roles from './roles.js';
import analytics from '../analytics/controllers/analytics.js';
import pkg from 'lodash';

const { get } = pkg;

export const userCan = (userRoles, checkedPermission) => {
  for (let i = 0; i < userRoles.length; i += 1) {
    if (roles[userRoles[i]].includes(checkedPermission)) return true;
  }

  return false;
};

const userCheckPerm = (checkedPermission) => (req, res, next) => {
  const userId = get(req, 'userData.userId', null);

  User.findById(userId)
    .select('-__v')
    .exec()
    .then((doc) => {
      if (doc) {
        const roles = get(doc, 'roles', []);

        if (userCan(roles, checkedPermission)) {
          req.userData.roles = roles;
          req.userData.name = get(doc, 'name');
          req.userData.emailConfirmation = get(doc, 'emailConfirmation');
          next();
        } else {
          const reason = 'Permission denied';
          const analyticsId = analytics('USER_CHECK_PERMISSION_FAIL', {
            reason,
            roles,
            user: userId,
          });

          res.status(400).json(message.fail(reason, analyticsId));
        }
      } else {
        const reason = 'Current user not found';
        //
        const analyticsId = analytics('USER_CHECK_PERMISSION_FAIL', {
          reason,
          user: userId,
          permission: 'userCheckPerm',
        });

        res.status(400).json(message.fail(reason, analyticsId, true));
      }
    })
    .catch((error) => {
      //
      const analyticsId = analytics('USER_CHECK_PERMISSION_ERROR', {
        error: error.message,
        roles,
        user: userId,
        permission: 'userCheckPerm',
      });

      res.status(400).json(message.fail('Permission denied. Error', analyticsId));
    });
};

export default userCheckPerm;

export const userCanByPerm = async (userId, checkedPermission) => {
  return await User.findById(userId)
    .select('roles')
    .exec()
    .then((doc) => {
      const roles = get(doc, 'roles', []);
      return userCan(roles, checkedPermission);
    })
    .catch((err) => {
      analytics('USER_CHECK_PERMISSION_ERROR', {
        reason: err,
        checkedPermission,
        user: userId,
      });
    });
};
