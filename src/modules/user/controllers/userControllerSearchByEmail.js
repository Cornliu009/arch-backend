import User from '../userModel.js';
import message from '../../utils/messages.js';
import analytics from '../../analytics/controllers/analytics.js';
import pkg from 'lodash';

const { get } = pkg;

export default async function userSearchByEmail(req, res) {

  const userId = get(req, 'userData.userId', null);
  const email = get(req, 'body.email', '');

  User.find({ email: { $regex: email, $options: 'i' } })
    .select('-__v')
    .exec()
    .then((docs) => {
      if (docs.length) {
        analytics('USER_SEARCH_BY_EMAIL_SUCCESS', {
          user: userId,
        });

        res.status(200).json(message.success('User search by email. Success', docs));
      } else {
        const analyticsId = analytics('USER_SEARCH_BY_EMAIL_FAIL', {
          user: userId,
          email: email,
          controller: 'userControllerSearchByEmail',
        });

        res.status(404).json(message.fail('No User for provided email. Fail.', analyticsId));
      }
    })
    .catch((error) => {
      const analyticsId = analytics('USER_SEARCH_BY_EMAIL_ERROR', {
        error,
        email: email,
        controller: 'userControllerSearchByEmail',
      });

      res.status(400).json(message.fail('User search by email. Error', analyticsId));
    });
};

