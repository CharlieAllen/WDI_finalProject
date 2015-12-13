var express      = require('express');
  router         = express.Router(),
  bodyParser     = require('body-parser'),
  methodOverride = require('method-override');

var usersController = require('../controllers/users');

router.route('/users')
  .get(usersController.getAll)
  .post(usersController.newUser);

router.route('/users/:id')
  .get(usersController.getAll)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

module.exports = router