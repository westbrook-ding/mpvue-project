<template>
  <div class="comment-list">
    <div class="page-title" v-if='comments.length'>
      评论
    </div>
    <div class="comment"
        v-for='comment in comments' 
        :key='comment.id'
        @click="to_detail(comment.bookid)"
        >
      <div class="user">
        <div class="inline">
          
          <img :src="comment.user_info.image" 
                class="avatar"
                mode='aspectFit'
            >
          {{comment.user_info.nickName}}
        </div>
        <div class="rf">
          {{comment.location||'未知地点'}}
          <span class="text-primary">
            --
          </span>
          {{comment.phone||'未知型号'}}
        </div>
      </div>
      <div class="content">
        {{comment.comment}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['comments','type'],
  methods:{
    to_detail (id) { 
      if(this.type==="user"){
         wx.navigateTo({
            url:'/pages/detail/main?id='+id
        })
      }

    }
  }
}
</script>

<style lang='scss' scoped>
.comment-list{
  margin-bottom:20rpx;
  background:#eee;
  font-size:14px;
  .page-title{
    padding:0 20px;
  }
  .comment{
    background: white;
    margin-bottom:10px;
    padding:5px 20px;
    .content{
      margin:10px 0;
    }
    .user{
      .inline{
        display:inline;
        .avatar{
          width:20px;
          height:20px;
          border-radius: 50%;
        }
      }

    }

  }

}
</style>

