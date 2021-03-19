// import User from '../userModel.js';
// import message from '../../utils/messages.js';
// import analytics from '../../analytics/controllers/analytics.js';
// import pkg from 'lodash';
// const { get } = pkg;
//
// const userSearch = async (req, res) => {
//   const name = get(req, 'body.name', '');
//   const id = get(req, 'body.id', '');
//   const email = get(req, 'body.email', '');
//   const role = get(req, 'body.role', '');
//
//   let limit = get(req, 'body.limit', 10);
//   limit = limit > 100 ? 100 : limit;
//   const page = get(req, 'body.page', 1);
//
//   const search = [
//     {
//       name: { $regex: name, $options: 'i' },
//     },
//   ];
//
//   if (id) {
//     search.push({
//       _id: id,
//     });
//   }
//
//   if (email) {
//     search.push({
//       email: { $regex: email, $options: 'i' },
//     });
//   }
//
//   if (role) {
//     search.push({
//       roles: { $in: [role] },
//     });
//   }
//
//   try {
//     const totalCountPromise = User.countDocuments({ $and: search });
//     const userSearchQueryPromise = userSearchQuery({ search, page, limit, res, id, name}); // 100
//
//     const PromiseAllResult = await Promise.all([
//       //totalCountPromise,
//       userSearchQueryPromise,
//     ]);
//
//     const totalCount = PromiseAllResult[0];
//     const userSearchResult = PromiseAllResult[1];
//
//     const pageCount = Math.ceil(totalCount / limit);
//
//     const result = {
//       // pagination: {
//       //   pageCurrent: page,
//       //   pageCount,
//       //   limit,
//       //   itemsCount: totalCount,
//       //   isFirst: page === 1,
//       //   isLast: page === pageCount,
//       // },
//       items: userSearchResult,
//     };
//
//     //res.status(200).json(userSearchResult);
//   } catch (e) {
//     const analyticsId = analytics('USER_SEARCH_ERROR', {
//       e,
//       body: get(req, 'body'),
//       controller: 'userSearch',
//     });
//
//     res.status(400).json(message.fail('User search. Error', analyticsId));
//   }
// };
//
// export default userSearch;
//
// function userSearchQuery({ search, page, limit, res, id, name}) {
//   return (
//     User.find({ name: { $regex: name, $options: 'i' } })
//       .sort({ createdAt: -1 })
//       //.limit(limit)
//       //.skip(limit * (page - 1))
//       // .populate({
//       //   path: 'users',
//       //   select: 'name',
//       // })
//       //.select('-__v')
//       .exec()
//       .then((docs) => {
//
//           analytics('USER_GET_BY_ID_SUCCESS', {
//           });
//
//           res.status(200).json(message.success('User get by Id. Success', docs));
//         })
//       .catch((error) => error)
//   );
// }
//
//
// // const userGetByName = (req, res) => {
// //   const name = get(req, 'body.name');
// //   const { userId } = req.userData;
// // console.log('---------------' + name);
// //   User.aggregate([
// //     {
// //       $match: {
// //         name: name,
// //       },
// //     },
// //
// //     {
// //       $project: {
// //         name: { $ifNull: ['$name', '$email'] },
// //         email: '$email',
// //         roles: { $ifNull: ['$roles', []] },
// //         createdAt: {
// //           $ifNull: [
// //             '$createdAt',
// //             {
// //               $dateFromString: {
// //                 dateString: '2021-01-01',
// //               },
// //             },
// //           ],
// //         },
// //       },
// //     },
// //
// //     { $sort: { createdAt: 1 } },
// //   ])
// //     .then((doc) => {
// //       if (doc.length) {
// //         analytics('USER_GET_BY_NAME_SUCCESS', {
// //           user: userId,
// //           name: name,
// //         });
// //
// //         res.status(200).json(message.success('User get by name. Success', doc));
// //       } else {
// //         const analyticsId = analytics('USER_GET_BY_NAME_FAIL', {
// //           user: userId,
// //           controller: 'userGetByName',
// //         });
// //
// //         res.status(400).json(message.fail('No User for provided name. Fail.', analyticsId));
// //       }
// //     })
// //     .catch((error) => {
// //       const analyticsId = analytics('USER_GET_BY_NAME_ERROR', {
// //         error,
// //         name: name,
// //         controller: 'userGetByName',
// //       });
// //
// //       res.status(400).json(message.fail('User get by name. Error', analyticsId));
// //     });
// // };
// //
// // export default userGetByName;
