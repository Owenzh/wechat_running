var dbIns = require('../db/connect');

module.exports = async (ctx, next) => {
    // ctx.state.data = {
    //     msg: 'sdfdsf'
    // }
    let results = await dbIns.DBConnect.select('appid', 'ip').from('cAppinfo');
    ctx.state.data = { res : results };
}


// module.exports = function (ctx, next) {
//     ctx.state.data = { msg: 'Hello World' }
// }