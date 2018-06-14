/**
 * 腾讯云微信小程序解决方案
 * 获取数据库实例
 * @author Owen
 */
const { mysql: config } = require('../config')


const DBConnect = require('knex')({
    client: 'mysql',
    connection: {
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.pass,
        database: config.db,
        charset: config.char,
        multipleStatements: true
    }
});

module.exports =  { DBConnect }
