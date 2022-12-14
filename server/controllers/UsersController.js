/**
 * UsersController.js содержит функции выполняющие запросы клиента.
 * В том числе: Регистрация/авторизация пользователя. При авторизации пользователь на клиент получает JWT из которого можно получить id пользователя
 * @namespace UsersController
 */
/**
 * @access private
 * @memberof UsersController
 */
const jwt = require('jsonwebtoken')
const {User} = require('../models/index')
const config = require('../config/config')
const bcrypt = require('../bcrypt/crypt')

function jwtSingUser(id) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign({ id, ONE_WEEK}, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}
/**
 * @method jwtSingUser
 * @memberof UsersController
 * @access private
 * @param {*} id 
 * @returns token
 * @example 
 * 
 * function jwtSingUser('63866e5de61b7deb4e54a38e')
 * => return eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODY2ZTVkZTYxYjdkZWI0ZTU0YTM4ZSIsImlhdCI6MTY2OTkxMzk0OCwiZXhwIjoxNjcwNTE4NzQ4fQ.5ykJHoeQtY8V7Le8SZfs30Rwm1d3s8tOZ-twGW9edr0
 */

module.exports = {

    async register(req, res) {
        try {
            const { password, email } = req.body
            //hash = bcrypt.hash_pas(password);
            user = new User({ password: password, email: email })
            const s_req = await user.save();
            res.send({
                s_req
            })
            res.send(s_req)
        } catch (err) {
            res.status(400).send({
                error: "Ошибка региcтрации!!!"
            });
            console.log(err)
        }
    },

    async login(req, res) {
        try {
            const {email, password} = req.body
            var i = await User.getAuthenticated(email, password, function (err, user, reason) {
                if (err) throw err;
            
                // вход в систему прошел успешно, если у нас есть пользователь
                if (user) {
                    // обрабатываем успешный вход в систему
                    res.send({
                        email:user.email,   
                        token: jwtSingUser(user._id)
                    })
                    console.log('login success');
                    return;
                }
            
                // в противном случае мы можем определить, почему мы потерпели неудачу
                var reasons = User.failedLogin;
                switch (reason) {
                    case reasons.NOT_FOUND:
                    case reasons.PASSWORD_INCORRECT:
                        // note: these cases are usually treated the same - don't tell
                        // the user *why* the login failed, only that it did
                        break;
                    case reasons.MAX_ATTEMPTS:
                        // send email or otherwise notify user that account is
                        // temporarily lockedфф
                        break;
                }
            });
        } catch (err) {
            res.status(400).send({
                error: "Ошибка сценария авторизации!!!"
            });
            console.log(err)
        }
    },
    async find_all(req, res) {
        /**
          * @access private
          * @memberof UsersController
          * @param {String} find_req
         */
        try {
            const find_req = await (User.find({ name: req.body.name }));
            console.log(req.user)
            res.send(find_req)
        } catch (err) {
            res.status(400).send({
                error: "Ошибка получения данных!!!"
            });
            console.log(err)
        }
    },
    async get_user(req, res) {
        try {
            const { id } = req.body;
            const find_req = await (User.findById(id));
            res.send(find_req)
        } catch (err) {
            res.status(400).send({
                error: "Ошибка получения данных!!!"
            });
            console.log(err)
        }
    },
    async update_user(req, res) {
        try {
            const { id } = req.body
            const find_req = await (User.findOneAndUpdate({ id }, req.body.update));
            res.send()
        } catch (err) {
            res.status(400).send({
                error: "Ошибка обновления!!!"
            });
            console.log(err)
        }
    },

    async delete_user(req, res) {
        try {
            const { id } = req.body;
            const find_req = await (User.findOneAndDelete(id));
            res.send(find_req)
        } catch (err) {
            res.status(400).send({
                error: "Ошибка удаления!!!"
            });
            console.log(err)
        }
    },
}