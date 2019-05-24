<template>
  <div class="app" :class="this.$isMobile()?'':'isPc'" id="contain" ref="contain">
    <header>
      <div class="search">
        <img :src="titleImg" alt="" class="headerImg">
        <!--<div><img src="../../../assets/img/Back.png" alt="" class="goBack" @click="goBack"></div>-->
        <img src="../../../assets/img/search.png" alt="" class="searchImg">
        <input type="text" placeholder="输入关键之，支持全文检索" v-on:input="inputFunc()" v-model="keywords">
      </div>
    </header>
    <div class="content">
      <h1>最新发条</h1>
      <ul class="list">
        <li v-for="item,index in dataList" @click.stop="goDetails(item)">
          <div class="title">
            <p>{{item.title}}</p>
          </div>
          <div class="listContent clearfix">
            <span>发布机关:{{item.section}}</span>
            <i>发布日期:{{item.release_time}}</i>
          </div>
        </li>
        <li v-if="!dataList.length" class="bordernone">
          <p class="upwarp-nodata">亲,没有更多数据了~</p>
        </li>
      </ul>
      <p v-show="isLoading && dataList.length" style="height: 100px;text-align:center">
        <img
          class="d2-home__loading"
          src="https://hly.1000da.com.cn/assets/images/loading-spinner.svg"
          alt="loading"
        >加载中
      </p>
      <p v-show="!isLoading && dataList.length && dataList.length >= total" class="dataNone">没有更多数据了...</p>
      <!--<p v-show="!dataList.length" class="dataNone">暂无数据...</p>-->

      <!--内容...-->


    </div>
  </div>
</template>

<script>
  import {SearchBackThree, SearchIdThree} from '@/assets/public.js'
  // @ is an alias to /src

  export default {
    name: "SearchLaw",
    data() {
      return {
        classify: '',
        obj: {},
        id: '',
        titleImg: '',
        keywords: '',
        dataList: [],
        page: 1,
        total: 0,
        isLoading: false,
      }
    },
    watch: {
      val(val) {
        this.page = 1;
        this.$nextTick(() => {
          this.$refs.contain.scrollTop = 0;
        })
        // this.initData()
        //   .then(response => {
        //     this.dataList = response.list;
        //   }, err => {
        //
        //   }).catch((e) => {
        //   // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
        // })
      }
    },
    created() {
      this.initImg();
      this.initData()
        .then(response => {
          this.total = response.total;
          this.dataList = response.list;
        }, err => {

        }).catch((e) => {
        // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
      });

    },
    mounted() {
      var _this = this;
      var viewH;
      var contentH;
      var scrollTop;
      // this.$nextTick(() => {
      window.addEventListener("scroll", function () {
        _this.$nextTick(() => {
          if(_this.$refs.contain){
            contentH = _this.$refs.contain.clientHeight; //内容高度
          }
          viewH = document.documentElement.clientHeight; //可见高度
          scrollTop = document.documentElement.scrollTop; //滚动高度
        })

        if (scrollTop / (contentH - viewH) >= 0.95) { //到达底部100px时,加载新内容
          if (!_this.isLoading) {
            _this.isLoading = true;
            _this.page++;
            _this.initData()
              .then(response => {

                _this.dataList = _this.dataList.concat(response.list);

                _this.$nextTick(() => {
                  _this.isLoading = false;
                })
              }, err => {

              }).catch((e) => {
              // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
            })

          }
        }
      })
    },
    methods: {
      goDetails(item) {//点击跳转详情
        if (this.$isMobile()) {
          this.$router.push({name: 'LawyerFindLawDetails', query: {id: item.id}})
        } else {
          let routeData = this.$router.resolve({
            name: "LawyerFindLawDetails",
            query: {id: item.id}
          });
          window.open(routeData.href, '_blank');
        }
      },
      inputFunc() {
        this.initSearch();
      },
      initImg() {//获取页面图片数据
        let formData = new FormData();
        formData.append('flag', 'legal_guide');
        formData.append('port', '2');
        this.$store.dispatch('LawyerFindImg', formData)
          .then(data => {
            this.titleImg = data[0].pic[0];
          }, err => {

          })
      },
      initSearch() {//获取搜索数据
        this.page = 1;
        let options = new FormData();
        options.append('page', this.page);
        options.append('key_words', this.keywords);
        this.$store.dispatch('LawyerFindSearch', options).then(response => {
          console.log(response, 6666);
          this.total = response.total;
          this.dataList = response.list;
        }, err => {
        }).catch((e) => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
        })
      },
      initData() {//页面初始数据
        let options = new FormData();
        options.append('page', 1);
        options.append('tag', 'fatiao');//'fatiao' //this.GetQueryString('tag')
        options.append('id', '0');//'0'
        return this.$store.dispatch('LawyerFindFatiao', options)
      },
    }
  };
</script>

<style scoped lang="less">
  @r: 30rem;
  /*以fixed的方式固定mescroll的高度*/
  .isPc {
    top: 320/@r;
    margin:0 auto;
  }

  .d2-home__loading {
    height: 22px;
    width: 22px;
    margin-bottom: 10px;
    -webkit-animation: run 1s linear 0s infinite;
  }

  .app {
    font-weight: bold;
  }

  .search {
    position: relative;
    height: 500/@r;
  }

  .isPc .headerImg {
    height: 280px;
  }

  .search .searchImg {
    width: 50/@r;
    position: absolute;
    top: 60/@r;
    left: 15%;
    z-index: 3;
  }

  .search .goBack {
    width: 70/@r;
    position: absolute;
    top: 50/@r;
    left: 10/@r;
    z-index: 3;
    padding: 10/@r;

  }

  input {
    position: absolute;
    top: 50/@r;
    left: 50%;
    transform: translateX(-46%);
    width: 85%;
    height: 70/@r;
    border-radius: 45/@r;
    background-color: #cececf;
    padding: 0 30/@r;
    border: none;
    text-align: center;
    color: #6f6f6f;
    font-size: 32/@r;
  }

  header img {
    width: 100%;
  }

  .content {
    padding: 20/@r;
  }

  .content h1 {
    margin-top: 30/@r;
    font-size: 38/@r;
    line-height: 60/@r;
  }

  .list {
    margin-bottom: 50/@r;
  }

  .list li {
    margin-top: 40/@r;
    border-bottom: 1px solid #ccc;
  }

  .title {
    width: 100%;
  }

  .title p {
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 58/@r;
    font-size: 32/@r;
    color: #2f2f2f;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .listContent {
    margin-top: 40/@r;
    height: 80/@r;
    color: #9f9f9f;
  }

  .listContent span {
    width: 58%;
    float: left;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .listContent i {
    text-align: right;
    width: 42%;
    float: right;
  }

  .content .bordernone {
    border: none;
    text-align: center;
    height: 180/@r;
    font-size: 36/@r;
    color: #9d9d9d;
  }
  .dataNone{
    text-align:center;
    line-height:100px;
    color:#aaa;
  }
</style>
