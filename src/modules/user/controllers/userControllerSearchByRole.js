import User from '../userModel.js';
import message from '../../utils/messages.js';
import analytics from '../../analytics/controllers/analytics.js';
import pkg from 'lodash';

const { get } = pkg;

export default async function userSearchByRole(req, res) {
  const role = get(req, 'body.role', '');
  const userId = get(req, 'userData.userId', null);

  User.find({ roles: { $regex: role, $options: 'i' } })
    .select('-__v')
    .exec()
    .then((docs) => {
      if (docs.length) {
        analytics('USER_SEARCH_BY_ROLE_SUCCESS', {
          user: userId,
        });

        res.status(200).json(message.success('User search by role. Success', docs));
      } else {
        const analyticsId = analytics('USER_SEARCH_BY_ROLE_FAIL', {
          user: userId,
          roles: role,
          controller: 'userControllerSearchByRole',
        });

        res.status(404).json(message.fail('No User for provided role. Fail.', analyticsId));
      }
    })
    .catch((error) => {
      const analyticsId = analytics('USER_SEARCH_BY_ROLE_ERROR', {
        error,
        user: userId,
        roles: role,
        controller: 'userControllerSearchByRole',
      });

      res.status(400).json(message.fail('User search by role. Error', analyticsId));
    });
};
