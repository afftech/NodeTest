/**
 * routes.js
 *Здесь роисходит расперделение запросов
 * @namespace routes
 */
/**
 * @access private
 * @memberof UsersController
 */
const UsersController = require('./controllers/UsersController')
const verification = require('./middleware')
module.exports = (app) => {

  app.post('/register', verification, UsersController.register)//регистрировать пользователя
  app.get('/get_user', verification,UsersController.get_user)// получить user
  app.put('/update_user', verification, UsersController.update_user)//обновить пароль
  app.delete('/delete_user', UsersController.delete_user)//удалить пользователя
  app.get('/find_all', verification, UsersController.find_all)//удалить пользователя
  app.get('/login', UsersController.login)//авторизация пользователя
}

