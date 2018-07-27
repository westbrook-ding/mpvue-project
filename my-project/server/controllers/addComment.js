
const {mysql}=require("../qcloud.js");

module.exports=async (ctx)=>{
    const {bookid,openid,phone,comment,location}=ctx.request.body;
    try{
        await mysql("comments").insert({
            bookid,openid,phone,comment,location
        })
        ctx.state.data={
            msg:"success"
        }
    } catch(e){
        console.log(e);
        ctx.state={
            code:"-1",
            data:{
                msg:"评论失败"+e.sqlMessage
            }
        }
    }
}