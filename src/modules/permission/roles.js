export const listRoles = [
  'admin',
  'teacher',
  'student_TI',
  'student_CRI',
  'student_SI',
];

const roles = {

  admin: [
    // USER
    'user.auth',
    'user.get.admin',
    'user.delete.admin',
    'user.update.admin',
    'user.search.admin',
    'user.get.all',
    'user.get.teacher'

  ],

  teacher: [
    // USER
    'user.auth',
    'user.get.all',
    'user.get.teacher'
  ],

  student_TI : [
    // USER
    'user.auth',
    'user.get.all',
  ],

  student_CRI : [
    // USER
    'user.auth',
    'user.get.all',
  ],

  student_SI : [
    // USER
    'user.auth',
    'user.get.all',
  ],

};
export default roles;
