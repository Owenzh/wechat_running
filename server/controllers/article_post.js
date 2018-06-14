var dbIns = require('../db/connect');

module.exports = async (ctx, next) => {
    let req_data = ctx.request.body;
    let results = await dbIns.DBConnect('article').insert([req_data]);
    ctx.state.data = { res : JSON.stringify(results) };
}
