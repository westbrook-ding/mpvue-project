<template>
    <div class="container">
       <div class="userinfo">
           <img :src="userinfo.avatarUrl" alt=""/>
           <p v-if="userinfo.nickName">{{userinfo.nickName}}</p>
           <p v-else>
               <button open-type="getUserInfo"  @click="doLogin" type="warn" size="mini">点击登录</button>           
           </p>
       </div>
       <YearProgress></YearProgress>
       <button type="warn" size="small" style="width:600rpx;" @click="scanBook" v-if="userinfo.openId">添加图书</button>
    </div>
</template>
<script>
import YearProgress from '@/components/YearProgress.vue'
import qcloud from 'wafer2-client-sdk'
import config from '@/config/index'
import utils from '@/utils/index'
export default {
  data () {
    return {
      userinfo: {
        avatarUrl: '../../../static/img/unlogin.png',
        nickName: ''
      }
    }
  },
  methods: {
    doLogin () {
      // 设置登录地址
      console.log(config.loginUrl)
      qcloud.setLoginUrl(config.loginUrl)
      qcloud.login({
        success: (userInfo) => {
          console.log('登录成功', userInfo)
          utils.showSuccess('登录成功!')
          wx.setStorageSync('userInfo', userInfo)
          this.userinfo = userInfo // 已有openId
          // 视频中无oppenId 需通过如下方式获取
          // qcloud.request({
          //     url: config.userUrl,
          //     login: true,
          //     success (userRes) {
          //         showSuccess('登录成功')
          //         wx.setStorageSync('userinfo', userRes.data.data)
          //         self.userinfo = userRes.data.data
          //     }
          // })
        },
        fail: function (err) {
          console.log('登录失败', err)
        }
      })
    },
    // 添加图书请求
    async addBook(isbn){
      console.log("isbn",isbn);
      const res=await utils.post("/weapp/addbook",{
        isbn,
        openid:this.userinfo.openId
      })
      utils.showModal('添加成功',`${res.title}添加成功!`)
    },
    // 微信扫码
    scanBook () {
      // 允许从相机和相册扫码
      wx.scanCode({
        success: (res) => {
          console.log(res)
          if(res.result){
            this.addBook(res.result);
          }
        }
      })
    }
  },
  created () {
    console.log('个人中心页面启动了')
  },
  onShow () {
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.userinfo = userInfo
    }
  },
  components: {
    YearProgress
  }
}
</script>
<style lang="scss">
.container{
  padding:0 30rpx;  
}
.userinfo{
    margin:100rpx 0 50rpx 0;
    text-align:center;
    img{
        width:150rpx;
        height:150rpx;
        border-radius:50%;
        margin:20rpx;
    }
}
</style>
