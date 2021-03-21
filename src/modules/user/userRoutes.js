import { Router } from 'express';
import serviceHeader from '../utils/serviceHeader.js';
import userCheckAuth from './middlewares/userCheckAuth.js';
import userCheckPerm from '../permission/userCheckPerm.js';
import userRegister from './controllers/userControllerRegister.js';
import userLogin from './controllers/userControllerLogin.js';
import userDeleteById from './controllers/userControllerDeleteById.js';
import userDeleteByEmail from './controllers/userControllerDeleteByMail.js';
import userGetAll from './controllers/userControllerGetAll.js';
import userGetByEmail from './controllers/userControllerGetByEmail.js';
import userGetById from './controllers/userControllerGetById.js';
import userSettingsUpdatePassword from './controllers/userControllerSettingsUpdatePassword.js';
import userGetRolesList from './controllers/userControllerGetRolesList.js';
import userSearchByEmail from './controllers/userControllerSearchByEmail.js';
import userSearchByName from './controllers/userControllerSearchByName.js';
import userSearchByRole from './controllers/userControllerSearchByRole.js';

const router = Router();

router.post('/', serviceHeader('userRegister'), userRegister);

router.post('/login', serviceHeader('userLogin'), userLogin);

router.get('/rolesList', serviceHeader('userGetRolesList'), userGetRolesList);

router.delete(
  '/:userId',
  serviceHeader('userDeleteById'),
  userCheckAuth,
  userCheckPerm('user.delete.admin'),
  userDeleteById,
);

router.delete(
  '/email/:email',
  serviceHeader('userDeleteByEmail'),
  userCheckAuth,
  userCheckPerm('user.delete.admin'),
  userDeleteByEmail,
);

router.get(
  '/',
  serviceHeader('userGetAll'),
  userCheckAuth,
  userCheckPerm('user.get.teacher'),
  userGetAll,
);

router.get(
  '/email/:email',
  serviceHeader('userGetByEmail'),
  userCheckAuth,
  userCheckPerm('user.get.admin'),
  userGetByEmail,
);

router.get(
  '/:userId',
  serviceHeader('userGetById'),
  userCheckAuth,
  userCheckPerm('user.auth'),
  userGetById,
);

router.post(
  '/search/email',
  serviceHeader('userSearchByEmail'),
  userCheckAuth,
  userCheckPerm('user.get.all'),
  userSearchByEmail,
);

router.post(
  '/search/name',
  serviceHeader('userSearchByName'),
  userCheckAuth,
  userCheckPerm('user.get.all'),
  userSearchByName,
);

router.post(
  '/search/role',
  serviceHeader('userSearchByRole'),
  userCheckAuth,
  userCheckPerm('user.get.all'),
  userSearchByRole,
);

router.patch(
  '/settings/password',
  serviceHeader('userSettingsUpdatePassword'),
  userCheckAuth,
  userCheckPerm('user.auth'),
  userSettingsUpdatePassword,
);

export default router;
