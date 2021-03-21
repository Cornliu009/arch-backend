import User from '../userModel.js';
import message from '../../utils/messages.js';
import analytics from '../../analytics/controllers/analytics.js';
import pkg from 'lodash';

const { get } = pkg;

export default async function userSearchByName(req, res) {
  const name = get(req, 'body.name', '');
  const userId = get(req, 'userData.userId', null);

  User.find({ name: { $regex: name, $options: 'i' } })
    .select('-__v')
    .exec()
    .then((docs) => {
      if (docs.length) {
        analytics('USER_SEARCH_BY_NAME_SUCCESS', {
          user: userId,
        });

        res.status(200).json(message.success('User search by name. Success', docs));
      } else {
        const analyticsId = analytics('USER_SEARCH_BY_NAME_FAIL', {
          user: userId,
          name: name,
          controller: 'userControllerSearchByName',
        });

        res.status(404).json(message.fail('No User for provided name. Fail.', analyticsId));
      }
    })
    .catch((error) => {
      const analyticsId = analytics('USER_SEARCH_BY_NAME_ERROR', {
        error,
        user: userId,
        name: name,
        controller: 'userControllerSearchByName',
      });

      res.status(400).json(message.fail('User search by name. Error', analyticsId));
    });
};
