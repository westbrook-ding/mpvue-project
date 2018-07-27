<template>
    <div>
       <TopSwiper :topData="tops"></TopSwiper>
       <Card v-for="book in books" :key="book.id" :bookinfo="book"></Card> 
       <p class="book_more" v-if="!more">没有更多数据了</p>
    </div>
</template>
<script>
// page  1    0-10
// page  2    10-20
// page<10 && page>1 没有数据了
import utils from '@/utils/index.js'
import Card  from '@/components/Card.vue'
import TopSwiper from '@/components/TopSwiper.vue'
export default {
  data(){
    return{
      books:[],
      page:1,
      more:true,
      tops:[]
    }
  },
  methods: {
    async loadBookList (init) {
      if(init){
        this.page=1;
        this.more=true;
      }
      wx.showNavigationBarLoading();
      const data=await utils.get("/weapp/booklist",{page:this.page});
      // 本页不是第一页并且数据条数小于10  就没有更多了
      if(data.list.length<10 && this.page>1){
        this.more=false;
      }
      if(init){
        this.books=data.list;
         wx.stopPullDownRefresh();
      } else{
        // 下拉刷新 累加数据
        this.books=this.books.concat(data.list)
      }
      wx.hideNavigationBarLoading();
     
    },
    async getTops () {
      const tops=await utils.post("/weapp/tops");
      this.tops=tops;
    },
  },
  // 下拉刷新
  onPullDownRefresh(){
    this.loadBookList(true);
     this.getTops();
  },
  // 触底加载
  onReachBottom () {
    // 没有更多就不加载了
    if(!this.more){
      return;
    }
    this.page=this.page+1;
    this.loadBookList(false);
  },
  create () {
    console.log('图书页面启动了')
  },
  mounted () {
    this.loadBookList(true);
    this.getTops();
  },
  components:{
    Card,
    TopSwiper
  }
}
</script>
<style scoped>
 .book_more{
   font-size:12px;
   text-align: center;
   margin-bottom:5px;
 }
</style>

