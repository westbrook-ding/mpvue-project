const {mysql} = require('../qcloud')

module.exports = async (ctx)=>{
  const {id} = ctx.request.body
  console.log("id",id);
  const data=await mysql('books').select('books.*','csessioninfo.user_info')
            .join("csessioninfo",'books.openid','csessioninfo.open_id')
            .where('id',id).first();

  const info=JSON.parse(data.user_info);
  ctx.state.data=Object.assign({},data,{
    tags:data.tags.split(","),
    summary:data.summary.split("\n"),
    user_info:{
      nickName:info.nickName,
      image:info.avatarUrl
    }
  })

  console.log("详情",data);
  await mysql('books')
          .where('id',id)
          .increment('count',1)
  
}