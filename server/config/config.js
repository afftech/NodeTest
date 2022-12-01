module.exports = {
    port: 8080,
    db:
    {
        url: 'mongodb://localhost:27017/test1',

    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
    },

}
