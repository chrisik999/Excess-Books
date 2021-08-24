const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/excess_books',
    secret: process.env.SECRET || 'TokyoRavens',
    expiry: process.env.EXPIRY ||  3600,
    password: process.env.PASSWORD || 'qwertyuiop',
    firstName: process.env.FIRSTNAME || 'Todoroki',
    lastName: process.env.LASTNAME || 'Deku',
    username: process.env.USERNAME || 'AllMight',
    phone: process.env.PHONE || '08107182145',
    role: process.env.ROLE || 'admin'
}

module.exports = config;
