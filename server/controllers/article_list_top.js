var dbIns = require('../db/connect');

module.exports = async (ctx, next) => {
    console.log(ctx.params.top)
    // const cate = ctx.request.url;
    let results = await dbIns.DBConnect
        .select('id','title','author','category','content','creatts')
        .from('article')
        .limit(ctx.params.top)
        .orderBy('creatts','desc');
    ctx.state.data = { res : results };
}
