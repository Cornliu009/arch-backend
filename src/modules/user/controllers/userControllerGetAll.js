import User from '../userModel.js';
import message from '../../utils/messages.js';
import analytics from '../../analytics/controllers/analytics.js';
import pkg from 'lodash';

const { get } = pkg;

const userGetAll = (req, res) => {
  const { userId } = req.userData;
  return User.aggregate([
    {
      $project: {
        name: { $ifNull: ['$name', '$email'] },
        email: '$email',
        roles: { $ifNull: ['$roles', []] },
        createdAt: {
          $ifNull: [
            '$createdAt',
            {
              $dateFromString: {
                dateString: '2021-01-01',
              },
            },
          ],
        },
      },
    },

    { $sort: { createdAt: 1 } },
  ])

    .then((doc) => {
      if (doc.length) {
        analytics('USER_GET_ALL_SUCCESS', {
          user: userId,
          usersCount: get(doc, 'length', null),
        });

        res.status(200).json(message.success('Get all users. Success', doc));
      } else {
        const analyticsId = analytics('USER_GET_ALL_FAIL', {
          user: userId,
        });

        res.status(400).json(message.fail('Get all users. Fail', analyticsId));
      }
    })
    .catch((error) => {
      const analyticsId = analytics('USER_GET_ALL_ERROR', {
        error,
        user: userId,
        controller: 'userGetAll',
      });

      res.status(400).json(message.fail('Get all users. Error', analyticsId));
    });
};

export default userGetAll;
