const Router = require('express');
const router = new Router();
const authController = require('./controllers/authController');
const gameController = require('./controllers/gameController');
const { check } = require('express-validator');
const authMiddleware = require('./middlewares/authMiddleware');

router.post(
  '/registration',
  [
    check('username', 'Username cannot be empty').notEmpty(),
    check(
      'username',
      'Username length should be more then 6 and less 10'
    ).isLength({ min: 6, max: 10 }),
    check(
      'password',
      'Password length should be more then 4 and less 10'
    ).isLength({ min: 4, max: 10 }),
  ],
  authController.registration
);
router.post('/login', authController.login);
router.get('/users', authMiddleware, authController.getUsers);
router.patch('/set_game', authMiddleware, gameController.setGame);
router.get('/get_rating', gameController.getRating);
router.get('/get_profile', authMiddleware, gameController.getUserProfile);
router.patch('/set_settings', authMiddleware, gameController.setUserSettings);

module.exports = router;
