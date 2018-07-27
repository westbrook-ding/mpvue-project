import Vue from 'vue'
import Me from './index.vue'

const app = new Vue(Me)
app.$mount()

export default{
  config: {
    navigationBarTitleText: '个人中心'
  }
}
