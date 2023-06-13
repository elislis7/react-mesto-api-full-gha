const router = require('express').Router();

const {
  getAllUsers,
  getUsersByID,
  getUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

const {
  validationUserId,
  validationUpdateUser,
  validationUpdateAvatar,
} = require('../middlewares/validations');

router.get('/users', getAllUsers);
router.get('/users/me', getUser);
router.get('/users/:userId', validationUserId, getUsersByID);
router.patch('/users/me', validationUpdateUser, updateUserInfo);
router.patch('/users/me/avatar', validationUpdateAvatar, updateUserAvatar);

module.exports = router;
