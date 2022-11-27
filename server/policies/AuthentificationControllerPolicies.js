const Joi = require('joi')

module.exports = {
  register(req, res, next) {
    const schema = Joi.object({
      name: Joi.string(),
      surname: Joi.string(),
      patronymic: Joi.string(),
      phoneNumber: Joi.string(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru'] } }),
      avatar: Joi.string(),
      password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/)
    })
    const value = schema.validate(req.body)

    if (value.error) {
      switch (value.error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'Вы должны указать действительный адрес электронной почты'
          })
          break

        case 'password':
          res.status(400).send({
            error: `Предоставленный пароль не соответствовал следующим правилам:
                    <br>
                    1.Он должен содержать ТОЛЬКО следующие символы: НИЖНИЙ РЕГИСТР, ВЕРХНИЙ РЕГИСТР,
                    <br> Он должен быть длиной не менее 8 символов и не более символов.
                    `
          })
          break
        default:
          res.status(400).send({
            error: 'Неверная регистрационная информация'
          })
      }
    } else {
      next()
    }
  }
}
