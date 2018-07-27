const https=require("https");
const {mysql}=require('../qcloud');

// 新增图书
// 1.获取豆瓣信息
// https://developers.douban.com/wiki/?title=book_v2#get_isbn_book
// https://api.douban.com/v2/book/isbn/9787536692930
// 2. 入库

// 最终入库数据  
// isbn:条形码 openid,rate:评分 title:书名 image:图片 alt:豆瓣链接, publisher:出版商 
// summary:书的简介 ,price:价格,tags:标签,author:作者

module.exports=async (ctx)=>{
    // 获取post 请求参数 ctx.request.body
    const {isbn,openid}=ctx.request.body;   // 对象解构赋值
    console.log('添加图书',isbn,openid);
    if(isbn && openid){
        // 不允许重复添加同一本书
        const findRes=await mysql('books').select().where('isbn',isbn);
        console.log("查询数据库",findRes);
        if(findRes.length){
            ctx.state={
                code:-1,
                data:{
                    msg:'图书已存在'
                }
            }
            return;
        }

        let url='https://api.douban.com/v2/book/isbn/'+isbn
        const bookinfo= await getJson(url);
        console.log("从豆瓣获取的图书信息",bookinfo);

        // 处理入库数据
        const rate=bookinfo.rating.average;
        const {title,image,alt,publisher,summary,price}=bookinfo;
        const author=bookinfo.author.join(",");   //作者可能为多个 
        const tags=bookinfo.tags.map(v=>{
          return `${v.title} ${v.count}`;
        }).join(',');
        
        console.log("需入库数据",{
            isbn,openid,rate,title, image, alt, publisher, summary ,price,tags,author
          });
        // 入库
        try{
            // 插入是异步操作 用try catch处理错误
            await mysql('books').insert({
                isbn,openid,rate,title, image, alt, publisher, summary ,price,tags,author
            })
            // ctx.body 无然后ctx.state   ctx.state.code默认为0 0表示成功
            ctx.state.data={
                title,
                msg:'success'
            }
        } catch(e){
            ctx.state={
                code:-1,
                data:{
                    msg:"新增失败"+e.sqlMessage
                }
            }
        }

       
    }
}

// nodejs https模块请求第三方豆瓣api
function getJson(url){
    return new Promise((resolve,reject)=>{

        https.get(url,res=>{
            let urlData='';
            res.on('data',data=>{
                urlData+=data;
            })
            res.on('end',data=>{
                // urlData为json数据
               const bookinfo=JSON.parse(urlData);
               if(bookinfo.title){
                   resolve(bookinfo);
               } else{
                   reject(bookinfo);
               }
            })
        })

    })

}