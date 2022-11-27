/**
 * UsersController.js содержит функции выполняющие запросы клиента.
 * @namespace UsersController
 */
/**
 * @access public
 * @memberof UsersController
 */
const models = require('../models/index');
module.exports = {
    /**
     * @method register
     * @access public
     * @memberof UsersController
     * @param {*} req - Объект представляет HTTP-запрос
     * @param {*} res - Объект представляет HTTP-ответ
     * @example 
     * 
     * async register({"body":{"name":"Виктор","password":"123456"}}, res){
     * const { name, password } = req.body
            user = new models.User({ name: name, password: password })//передаём в модель
            const s_req = await user.save();//сохраняем в MongoDB
     *      res.send(s_req)//завершаем ответом клиенту {"_id":"6383945148008402d02cec0c","name":"Виктор","password":"123456"}
     * }
     */
    async register(req, res) {
        try {
            /**
              * @access private
              * @memberof UsersController
              * @param {String} name
              * @param {String} password
             */
            const { name, password } = req.body
            user = new models.User({ name: name, password: password })
            const s_req = await user.save();
            res.send(s_req)
        } catch (err) {
            res.status(400).send({
                error: "Ошибка регичтрации!!!"
            });
            console.log(err)
        }
    },
    /**
     * @method find_all
     * @access public
     * @memberof UsersController
     * @param {*} req - Объект представляет HTTP-запрос
     * @param {*} res - Объект представляет HTTP-ответ
     * @example 
     * //находит всех с одним именем
     * async find_all({"body":{"name":"Виктор"}}, res){
     * const find_req = await (models.User.find({ name: req.body.name }));
     *      res.send(find_req)//завершаем ответом клиенту и возвращаем всех с именем Виктор:
     * {"_id":"6383945148008402d02cec0c","name":"Виктор","password":"123456"},
     * {"_id":"6383945148008402d02cec1b","name":"Виктор","password":"993456"}
     * }
     */
    async find_all(req, res) {
        /**
          * @access private
          * @memberof UsersController
          * @param {String} find_req
         */
        try {
            const find_req = await (models.User.find({ name: req.body.name }));
            res.send(find_req)
        } catch (err) {
            res.status(400).send({
                error: "Ошибка получения данных!!!"
            });
            console.log(err)
        }
    },
    /**
     * @method get_user
     * @access public
     * @memberof UsersController
     * @param {*} req - Объект представляет HTTP-запрос
     * @param {*} res - Объект представляет HTTP-ответ
     * @example 
     * //находим пользователя по ID
     * async get_user({"body":{"id":"6383945148008402d02cec0c"}}, res){
     * const { id } = req.body;
     * const find_req = await (models.User.findById(id));
     * res.send(find_req)//завершаем ответом клиенту {"_id":"6383945148008402d02cec0c","name":"Виктор","password":"123456"}
     * }
     */
    async get_user(req, res) {
        try {
            const { id } = req.body;
            const find_req = await (models.User.findById(id));
            res.send(find_req)
        } catch (err) {
            res.status(400).send({
                error: "Ошибка получения данных!!!"
            });
            console.log(err)
        }
    },
    /**
 * @method update_user
 * @access public
 * @memberof UsersController
 * @param {*} req - Объект представляет HTTP-запрос
 * @param {*} res - Объект представляет HTTP-ответ
 * @example 
 * //находим пользователя по ID и обновляем его данные
 * async update_user({"body":{"id":"6383945148008402d02cec0c"}}, res){
 * const { id } = req.body;
 * const find_req = await (models.User.findById(id));
 * res.send(find_req)//завершаем ответом клиенту вохвращая найденного пользователя {"_id":"6383945148008402d02cec0c","name":"Виктор","password":"123456"}
 * res.send(find_req)
 * }
 */
    async update_user(req, res) {
        try {
            const { id } = req.body
            const find_req = await (models.User.findOneAndUpdate({ id }, req.body.update));
            res.send()
        } catch (err) {
            res.status(400).send({
                error: "Ошибка обновления!!!"
            });
            console.log(err)
        }
    },
    /**
* @method delete_user
* @access public
* @memberof UsersController
* @param {*} req - Объект представляет HTTP-запрос
* @param {*} res - Объект представляет HTTP-ответ
* @example 
* //находим пользователя по ID и обновляем его данные
* async delete_user({"body":{"id":"6383945148008402d02cec0c"}}, res){
* const { id } = req.body;
* const find_req = await (models.User.findById(id));
* res.send(find_req)//завершаем ответом клиенту возвращая удаленного пользователя {"_id":"6383945148008402d02cec0c","name":"Виктор","password":"123456"}

* }
*/
    async delete_user(req, res) {
        try {
            const { id } = req.body;
            const find_req = await (models.User.findOneAndDelete(id));
            res.send(find_req)
        } catch (err) {
            res.status(400).send({
                error: "Ошибка удаления!!!"
            });
            console.log(err)
        }
    },
}