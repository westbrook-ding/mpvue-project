
const {mysql}=require('../qcloud');

module.exports=async (ctx)=>{
    const {bookid,openid}=ctx.request.query;
    const res=mysql("comments").select("comments.*","csessioninfo.user_info")
              .join("csessioninfo",'comments.openid','csessioninfo.open_Id');
    // console.log("评论列表",data);
    let data="";
    if(bookid){
        data=await res.where("bookid",bookid);
    } else if(openid){
        data=await res.where("openid",openid);
    }
    
    if(data.length>0){
        ctx.state.data=data.map(v=>{
            const info=JSON.parse(v.user_info);
            return Object.assign({},v,{
                    user_info:{
                       nickName: info.nickName,
                       image:info.avatarUrl
                    }
                })
        })
    } else{
        ctx.state.data=[];
    }
   
}