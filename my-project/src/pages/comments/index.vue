<template>
    <div class="comment">
        <CommentList :type="'user'" :comments="commentList" v-if="userInfo.openId"></CommentList>
        <p>我添加的图书</p>
        <Card v-for="book in books" :key="book.id" :bookinfo="book" v-if="userInfo.openId"></Card>
        <div v-if="books.length<1" class="footer">
           还未添加过图书,快去添加图书
        </div>
    </div>
</template>
<script>
import utils from '@/utils/'
import CommentList from '@/components/CommentList.vue'
import Card from '@/components/Card.vue'
export default {
  components:{
    CommentList,
    Card
  },
  data(){
    return{
      commentList:[],
      userInfo:{},
      books:[]
    }
  },
  methods:{
    init () {
      wx.showNavigationBarLoading();
      this.getCommentList();
      this.getBookList();
      wx.hideNavigationBarLoading();
    },
    async getCommentList () {
       const data=await utils.get('/weapp/commentList',{openid:this.userInfo.openId});
       this.commentList=data;
    },
    async getBookList () {
      const data=await utils.get('/weapp/booklist',{openid:this.userInfo.openId});
      this.books=data.list;
    }
  },
   // 下拉刷新
  onPullDownRefresh(){
    this.init();
    wx.stopPullDownRefresh();
    console.log("下拉了");
  },
  mounted(){
    const userInfo=wx.getStorageSync('userInfo');
    if(userInfo){
        this.userInfo=userInfo;
    }
    this.init();
    
  }
}
</script>
<style lang="scss" scoped>
 .comment{
   p{
     font-size:14px;
     padding:0 40rpx;
     background-color: #eeeeee;
   }
   .footer{
     text-align: center;
     font-size: 14px;
     margin:10px 0;
   }
 }
</style>

