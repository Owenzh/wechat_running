var dbIns = require('../db/connect');

module.exports = async (ctx, next) => {
    // .select('id','title','author','category','content','creatts')
    let req_data = ctx.request.body;
    let results = await dbIns.DBConnect('article').where('id', req_data.id).update({
        title: req_data.title,
        category: req_data.category,
        content: req_data.content
    });
    ctx.state.data = {
        res: JSON.stringify(results)
    };
}