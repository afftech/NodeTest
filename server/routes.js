const UsersController = require('./controllers/UsersController')

module.exports = (app) => {

  app.post('/register', UsersController.register)//регистрировать пользователя
  app.get('/get_user', UsersController.get_user)// получить user
  app.put('/update_user', UsersController.update_user)//обновить пароль
  app.delete('/delete_user/:id', UsersController.delete_user)//удалить пользователя
  app.get('/find_all', UsersController.find_all)//удалить пользователя
}

