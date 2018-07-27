import Vue from 'vue'
import Comments from './index.vue'

const app = new Vue(Comments)
app.$mount()

export default{
  config: {
    navigationBarTitleText: '我的评论',
    enablePullDownRefresh:true,
    backgroundTextStyle:"light"
  }
}

