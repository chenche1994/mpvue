<template>
  <div class="progressbar">
    <progress :percent='percent' activeColor="#ea5a49" active></progress>
    <p>{{year}}已经过去了{{days}}天，{{percent}}%</p>
  </div>
</template>
<script>
export default {
  methods: {
    isLeapYear () {
      let year = this.year
      if ((year % 100 !== 0 && year % 4 === 0) || (year % 100 === 0 && year % 400 === 0)) {
        return true
      } else {
        return false
      }
    },
    getDayOfYear () {
      return this.isLeapYear ? 366 : 365
    }
  },
  computed: {
    year () {
      return new Date().getFullYear()
    },
    days () {
      // 设置第一天为1月1号
      let start = new Date()
      start.setMonth(0)
      start.setDate(1)
      // 拿到时间戳，计算两者的差值，算出时间差
      let offset = new Date().getTime() - start.getTime()
      return parseInt(offset / 1000 / 60 / 60 / 24) + 1
    },
    percent () {
      return ((this.days / this.getDayOfYear()) * 100).toFixed(1)
    }
  }
}
</script>
<style scoped lang="sass">
.progressbar
  width: 100%;
  text-align: center
  margin-top: 10px
  margin-bottom: 40px
  progress
    margin: 4px 0
</style>
