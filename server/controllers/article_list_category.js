var dbIns = require('../db/connect');

module.exports = async (ctx, next) => {
    console.log('article_list_category');
    console.log(ctx.params.category)
    // const cate = ctx.request.url;
    let results = await dbIns.DBConnect
        .select('id','title','author','category','content','creatts')
        .from('article')
        .where('category',ctx.params.category)
        .orderBy('creatts','desc');
    ctx.state.data = { res : results };
}
