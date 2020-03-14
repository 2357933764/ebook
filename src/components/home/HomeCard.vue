<template>
  <div class="home-card">
      <div class="home-card-inner">
          <div class="user-info">
            <div class="avater">
              <ImageView 
              :src="avatar"
              round
              height="100%"
              mode="scaleToFill"
              />
            </div>
            <div class="nickname">{{nickname}}</div>
            <div class="shelf-text">书架共有{{data.num}}本好书</div>
            <div class="round-item"></div>
            <div class="shelf-text">特别精选</div>
             <div class="feedback"  @click="onFeedBackClick">反馈</div>
          </div>
          <div class="book-info">
            <div class="book-wrapper">
              <div class="image-wrapper"
                v-for="(item, index) in bookList" :key="index"
                @click="onBookClick(item)"
              >
              <ImageView :src="item.cover" />
              </div>
            </div>
            
            <div class="shelf" @click="gotoShelf">书架</div>
            <van-icon
            class="arrow"
            name="arrow"
            size="11px"
            color="#828489"
          ></van-icon>
          </div>
      </div>
      <van-dialog id="van-dialog"></van-dialog>
  </div>
</template>

<script>
import ImageView from '../base/ImageView'
import Dialog from 'vant-weapp/dist/dialog/dialog'

export default {
  components: {
    ImageView
  },
  props: {
    data: Object,
    hasSign: {
      type: Boolean,
      default: false
    },
    signDay: {
      type: Number,
      default: 0
    }

  },
  mounted () {
  },
  // computed: {
  //   avatar () {
  //     return (this.data.userInfo.avatar && this.data.userInfo && this.data) || ''
  //   },
  //   nickname () {
  //     return (this.data.userInfo.nickname && this.data.userInfo && this.data) || ''
  //   },
  //   bookList () {
  //     return (this.data && this.data.bookList) || []
  //   }
  // },
  computed: {
    avatar () {
      return (this.data && this.data.userInfo && this.data.userInfo.avatar) || ''
    },
    nickname () {
      return (this.data && this.data.userInfo && this.data.userInfo.nickname) || ''
    },
    bookList () {
      return (this.data && this.data.bookList) || []
    }
  },
  methods: {
    gotoShelf () {
    },
    onBookClick (book) {
      this.$emit('onBookClick', book)
    },
    sign () {},
    onFeedBackClick () {
      Dialog.confirm({
        title: '反馈',
        message: '您是否确认提交反馈信息？',
        confirmButtonText: '是',
        cancelButtonText: '否'
      }).then(() => {
        console.log('点击是之后的事件')
      }).catch(() => {
        console.log('点击否之后的事件')
      })
    }
  }
}
</script>

<style lang="scss">
    .home-card{
      margin: 20px 20px;
      background-image: linear-gradient(-90deg, #54575F 0%, #595B60 100%);
      border-radius: 30px;
      position:relative;

        .home-card-inner {
          padding: 20px; 
          box-sizing: border-box;
            .user-info{
              display: flex;
              align-items: center;
              
              .avater{
                //flex:auto;
                width:20px;
                height: 20px;
              }
              .nickname,.shelf-text{
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #FFFFFF;
                text-align: center;
                margin: 0 8px;
              }
              .round-item{
                background: #A2A2A2;
                border-radius: 50%;
                width:4px;
                height:4px;

              }
              .shelf-text{
                opacity: .7;
              }
              .feedback{
                width:44px;
                line-height: 23px;
                //height:23px;
                background: rgba(216,216,216,.3);
                border-radius: 200px 0 0 200px;
                position: absolute;
                right:0;
                font-family: PingFangSC-Regular;
                font-size: 11px;
                color: #FFFFFF;
                text-align: center;
              }
            }
            .book-info{
              margin-top: 18px;
              display: flex;
              align-items: center;
              .book-wrapper{
                flex:1;
                display:flex;
                justify-content: space-around;
                .image-wrapper {
                width:72px;
                height:100%;
              }
              }
              .shelf{
                display: flex;
                width:15px;
                opacity: 0.8;
                font-family: PingFangSC-Regular;
                font-size: 11px;
                color: #FFFFFF;
                text-align: center;
              }
            }
            }
            .feedback-wrapper{
                position:absolute;
            }
        
      }
</style>