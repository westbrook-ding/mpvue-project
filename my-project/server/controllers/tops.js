
const {mysql}=require('../qcloud.js');

module.exports=async (ctx)=>{
    const data=await mysql("books").select('id','title','image','count')
               .limit(9)
               .orderBy('count','desc');
    ctx.state.data=data;
}