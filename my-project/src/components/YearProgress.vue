<template>
  <div class="yearProgress">
    <progress :percent="percent" show-info activeColor="#EA5149"/>
    <p>{{year}}年已经过去了{{day}}天，{{percent}}%</p>
  </div>
</template>

<script>
export default {
  methods: {
    isLeapYear () {
      let year = new Date().getFullYear()
      if (year / 400 === 0) {
        return true
      } else if (year / 4 === 0 && year / 100 !== 0) {
        return true
      } else {
        return false
      }
    }
  },
  computed: {
    year () {
      return new Date().getFullYear()
    },
    day () {
      // 设置开始时间为今年的1月1日
      let start = new Date()
      start.setMonth(0)
      start.setDate(1)
      // 今天的时间戳-今年1月1日的时间戳
      let offsetTime = new Date().getTime() - start.getTime()
      return parseInt(offsetTime / 1000 / 60 / 60 / 24) + 1
    },
    percent () {
      let yearDays = this.isLeapYear() ? 366 : 365
      // toFixed()将number四舍五入保留几位小数
      return (this.day / yearDays * 100).toFixed(1)
    }
  }
}
</script>

<style lang="scss">
.yearProgress{
  width:100%;
  margin-bottom:120rpx;
  text-align: center;
  p{
    margin-top:20rpx;
  }
}
</style>
