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

router.get('/', getAllUsers);
router.get('/me', getUser);
router.get('/:userId', validationUserId, getUsersByID);
router.patch('/me', validationUpdateUser, updateUserInfo);
router.patch('/me/avatar', validationUpdateAvatar, updateUserAvatar);

module.exports = router;
