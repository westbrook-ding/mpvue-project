import Vue from 'vue'
import Books from './index.vue'

const app = new Vue(Books)
app.$mount()

// page.json
export default{
  config: {
    navigationBarTitleText: '图书列表',
    enablePullDownRefresh:true,
    backgroundTextStyle:"light"
  }
}
