<template>
  <div class="home">
    <SearchBar
        disabled
        @onClick="onSearchBarkClick"
        :hot-search="hotSearch"
      />
     <HomeCard
        @onClick="onHomeCardClick"
      />
      <HomeBanner
        img="http://www.youbaobao.xyz/book/res/bg.jpg"
        title="第一个小程序"
        subTitle="点击看看"
         @onClick="onHomeBannerClick"
      />  
     
  </div>
</template>

<script>
import SearchBar from '../../components/home/SearchBar'
import HomeCard from '../../components/home/HomeCard'
import HomeBanner from '../../components/home/HomeBanner'
export default {
  components: {
    SearchBar,
    HomeCard,
    HomeBanner
  },
  methods: {
    onSearchBarkClick () {
      // 跳转到搜索页
    },
    onHomeCardClick () {
      // 跳转到搜索页
    },
    onHomeBannerClick () {
      // 跳转到搜索页
    }
  }
}
</script>

<style lang="scss" scoped>
 
</style>
