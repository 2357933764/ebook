<template>
  <div>
    <div class="home" v-if="isAuth">
    <SearchBar
        disabled
        @onClick="onSearchBarkClick"
        :hotSearch="hotSearch"
      />
     <HomeCard
        :data="homeCard"
        @onBookClick="onHomeBookClick"
      />
      <HomeBanner
        img="http://www.youbaobao.xyz/book/res/bg.jpg"
        title="第一个小程序"
        subTitle="点击看看"
         @onClick="onHomeBannerClick"
      />  
      <div :style="{marginTop: '23px'}">
      <HomeBook
          title="为你推荐"
          :row="1"
          :col="3"
          :data="recommend"
          mode="col"
          btn-text="换一批"
          @onMoreClick="recommendChange('recommend')"
          @onBookClick="onHomeBookClick"
        />
      </div>
      <div :style="{marginTop: '23px'}">
          <HomeBook
            title="免费阅读"
            :row="2"
            :col="2"
            :data="freeRead"
            mode="row"
            btn-text="换一批"
            @onMoreClick="recommendChange('freeRead')"
            @onBookClick="onHomeBookClick"
           />
      </div>
      <div :style="{marginTop: '23px'}">
        <HomeBook
          title="当前最热"
          :row="1"
          :col="4"
          :data="hotBook"
          mode="col"
          btn-text="换一批"
          @onMoreClick="recommendChange('hotBook')"
          @onBookClick="onHomeBookClick"
        />
      </div>
      <div :style="{marginTop: '23px'}">
        <HomeBook
          title="分类"
          :row="3"
          :col="2"
          :data="category"
          mode="category"
          btn-text="查看全部"
          @onMoreClick="onCategoryMoreClick"
          @onBookClick="onCategoryClick"
        />
      </div>
    </div>
  <Auth v-if="!isAuth" @getUserInfo="init"/>
  </div>
</template>

<script>
import HomeBook from '../../components/home/HomeBook'
import SearchBar from '../../components/home/SearchBar'
import HomeCard from '../../components/home/HomeCard'
import Auth from '../../components/base/Auth'
import HomeBanner from '../../components/home/HomeBanner'
import {getHomeData, recommend, freeRead, hotBook, register} from '../../api/index'
import {getSetting, hideLoading, showLoading,
  getUserInfo, setStorageSync, getStorageSync, getUserOpenId} from '../../api/wechat'

export default {
  mounted () {
    // this.getHomeData()
    // this.getSetting()
    this.init()
  },
  data () {
    return {
      hotSearch: '',
      homeCard: {},
      banner: {},
      recommend: [],
      freeRead: [],
      hotBook: [],
      category: [],
      isAuth: true
    }
  },

  components: {
    SearchBar,
    HomeCard,
    HomeBanner,
    HomeBook,
    Auth
  },
  methods: {
    getHomeData (openId, userInfo) {
      getHomeData({ openId: '1234' }).then(response => {
        console.log('shuju')
        console.log(response)
        const {
          data: {
            hotSearch: {
              keyword
            },
            shelf,
            banner,
            recommend,
            freeRead,
            hotBook,
            category,
            shelfCount
          }
        } = response.data
        this.hotSearch = keyword
        this.banner = banner
        this.recommend = recommend
        this.freeRead = freeRead
        this.hotBook = hotBook
        this.category = category
        this.homeCard = {
          bookList: shelf,
          num: shelfCount,
          userInfo: {
            nickname: '美女',
            avatar: 'https://www.youbaobao.xyz/book/img/loading2.ae9e5924.jpeg'
          }
        }
        hideLoading()
      }).catch(err => {
        console.log('捕获异常', err)
        hideLoading()
      })
    },
    recommendChange (key) {
      switch (key) {
        case 'recommend':
          recommend().then(
            response => {
              this.recommend = response.data.data
            }
          )
          break
        case 'freeRead':
          freeRead().then(
            response => {
              this.freeRead = response.data.data
            }
          )
          break
        case 'hotBook':
          hotBook().then(
            response => {
              this.hotBook = response.data.data
            }
          )
          break
      }
    },
    getUserInfo () {
      const onOpenIdComplete = (openId, userInfo) => {
        this.getHomeData(openId, userInfo)
        register(openId, userInfo)
      }
      getUserInfo(
        (userInfo) => {
          setStorageSync('userInfo', userInfo)
          console.log(userInfo)
          const openId = getStorageSync('openId')
          if (!openId || openId.length === 0) {
            console.log('没拿到')
            getUserOpenId()
            console.log(openId)
            console.log('11111')
          } else {
            console.log('拿到了')
            console.log(openId)
            onOpenIdComplete(openId, userInfo)
          }
        },
        () => {
          console.log('2失败')
          this.isAuth = false
        }
      )
    },
    getSetting () {
      getSetting(
        'userInfo',
        () => {
          console.log('1成功')
          this.isAuth = true
          this.getUserInfo()
        },
        () => {
          console.log('1失败')
          hideLoading()
          this.isAuth = false
        }
      )
    },
    init () {
      showLoading('正在加载')
      // this.getSetting()
      this.getHomeData()
    },
    //
    //
    // xiajieke
    onSearchBarkClick () {
      this.$router.push({
        path: '/pages/search/main',
        query: {hotSearch: this.hotSearch}
      })
    },
    onHomeBookClick (book) {
      console.log(book)
      // 跳转到详情页
      this.$router.push({
        path: '/pages/detail/main',
        query: {
          fileName: book.fileName
        }
      })
    },
    onCategoryClick (category) {
      this.$router.push({
        path: '/pages/list/main',
        query: {
          key: 'categoryId',
          text: category.category,
          title: category.categoryText
        }
      })
    },
    onCategoryMoreClick () {
      this.$router.push({
        path: '/pages/categoryList/main'
      })
    },
    onBannerClick () {
      console.log('banner click...')
    }
  }
}
</script>

<style lang="scss" scoped>
 
</style>
