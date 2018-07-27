
const {mysql}=require("../qcloud.js");

module.exports=async (ctx)=>{
    const {page,openid}=ctx.request.query;
    const size=10;
    // mysql链式查询
    const mysqlSelect=mysql('books')
                .select('books.*','cSessionInfo.user_info')
                .join('cSessionInfo','books.openid','cSessionInfo.open_id')
                .orderBy("id","desc");
    let books
    //根据openid查询
    if(openid){
        books=await mysqlSelect.where("openid",openid);
    } else{
        // 查询所有
        books=await mysqlSelect.limit(size).offset((Number(page)-1)*size);
    }
                
    ctx.state.data={
        list:books.map(v=>{
            const info=JSON.parse(v.user_info);
            return Object.assign({},v,{
                user_info:{
                    nickName:info.nickName
                }
            })
        })
    }
}