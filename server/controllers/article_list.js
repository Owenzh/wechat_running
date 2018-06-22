var dbIns = require('../db/connect');

module.exports = async (ctx, next) => {
    console.log('article_list');
    let results = await dbIns.DBConnect
        .select('id','title','author','category','content','creatts')
        .from('article')
        .orderBy('creatts','desc');
    ctx.state.data = { res : results };
}
