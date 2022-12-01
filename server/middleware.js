/**
 * 
 * middleware.js функция проверяющая токен у запроса.
 * Если токен присутствует, то управление передаётся дальше в UserController.js с расшиврованными значениями,
 * иначе клиенту возвращается ошибка ({error:"*"})
 * @namespace middleware
 */


const jwt = require('jsonwebtoken')

const config = require('./config/config')
module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.body.token
        if (!token) {
            return res.send({ error: "Пользователь не авторизован" })
        }
        req.user = jwt.verify(token, config.authentication.jwtSecret)
        next()
    } catch (e) {
        console.log(e);
        return res.send({ error: "Пользователь не авторизован" });
    }
}