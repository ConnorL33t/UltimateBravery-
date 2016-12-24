const DriversController = require('../controllers/user_controller')
module.exports = (app) => {
 app.get('/api', DriversController.greeting);
};