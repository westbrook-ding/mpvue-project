<template>
    <div class="detail">
        <BookInfo :bookInfo="info"></BookInfo>
        <CommentList :comments="commentList"></CommentList>
        <div class="comments" v-if="allowComment">
            <textarea v-model="comment" placeholder="请输入短评"></textarea>
        </div>
        <div class="location"  v-if="allowComment">
            位置:<switch  :checked="location" @change="getLocation" color="#EA5149"/>
            <span>{{location}}</span>
        </div>
        <div class="model"  v-if="allowComment">
            手机型号:<switch @change="getModel" :checked="model" color="#EA5149"/>
             <span>{{model}}</span>
        </div>
        <button type="warn" size="small" style="width:660rpx;margin:20px auto;" @click="addComment"  v-if="allowComment">添加评论</button>
        <p v-else>未登录或已评论过啦</p>
         <button type="warn"  style="width:660rpx;margin:20px auto;" open-type="share">分享给好友</button>
         <button type="warn"  style="width:660rpx;margin:20px auto;" @click="to_booklist">返回列表</button>
    </div>
</template>

<script>
import utils from '@/utils/'
import BookInfo from '@/components/BookInfo.vue'
import CommentList from '@/components/CommentList.vue'
export default {
    components:{
        BookInfo,
        CommentList
    },
    data(){
        return{
            bookid:"",
            info:{},
            comment:"",
            commentList:[],
            location:"",
            model:"",
            userInfo:{}
        }
    },
    computed:{
        allowComment () {
            // 未登录
            if(!this.userInfo.openId){
                return false;
            }
            const isComment=this.commentList.filter(v=>v.user_info.openid==this.userInfo.openid).length;
            // 评论过
            if(isComment){
                return false;
            }
            return true;
        }
    },
    methods:{
        // 获取图书详情
        async getBookDetail () {
           const info=await utils.post("/weapp/bookdetail",{id:this.bookid});
           
           this.info=info;
           wx.setNavigationBarTitle({
                title: info.title
           })
        },
        // 获取位置
        getLocation (e) {
            console.log("获取位置",e.target.value)
            if(e.target.value){
                const ak="1qWmwYdFZDGrUtC98q9t8HsjfCQGqvqW";
                 wx.getLocation({
                    success: (res)=> {
                        const {latitude,longitude}=res;
                        console.log(res);
                        wx.request({
                            method:"GET",
                            url:'http://api.map.baidu.com/geocoder/v2/',
                            data:{
                                ak,
                                location:`${latitude},${longitude}`,
                                output:'json'
                            },
                            success:(res)=>{
                                console.log("百度",res);
                                if(res.data.status===0){
                                    this.location=res.data.result.addressComponent.city;
                                } else{
                                    this.location="未知地点";
                                }
                            }
                        })
                    }
               })
            } else{
                this.location="";
            }
           
        },
        // 获取手机型号
        getModel (e) {
            if(e.target.value){
                try {
                    const res = wx.getSystemInfoSync();
                   
                    this.model=res.model;
                } catch (e) {
                  this.model="未知手机型号";
                }
            } else{
                this.model="";
            }
        },
        // 获取评论列表
        async getComments (){
            const data=await utils.get('/weapp/commentList',{bookid:this.bookid});
            this.commentList=data;
            
        },
        // 添加评论
        async addComment (){
            if(!this.comment){
                 utils.showModal("温馨提示","请输入短评!");
                return;
            }
            // comment bookid openid location model
            const data={
                comment:this.comment,
                bookid:this.bookid,
                openid:this.userInfo.openId,
                location:this.location,
                phone:this.model
            }
            const addRes=await utils.post("/weapp/addComment",data);
           
            this.comment="";
            utils.showSuccess("评论成功");
            this.getComments();
        },
        to_booklist () {
            wx.switchTab({
                url:"/pages/books/main"
            })
        }
    },
    mounted(){
        this.bookid=this.$root.$mp.query.id;

        this.getBookDetail();
        this.getComments();

        const userInfo=wx.getStorageSync('userInfo');
      
        if(userInfo){
            this.userInfo=userInfo;
        }
    }
}
</script>

<style lang="scss" scoped>
   .detail{
       p{
           text-align:center;
           margin-bottom:10px;
           font-size:14px;
       }
   }
   .comments{
       margin-top:30rpx;
       padding:6px 10px;
       textarea{
           font-size:14px;
           height:200rpx;
           border:1px solid #EA5149;
           width:100%;
           border-radius:6px;
       }
   }
   .location,.model{
       padding: 0 10px;
       margin-top:20rpx;
       font-size:14px;
   }
</style>


