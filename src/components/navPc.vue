<template>
  <div class="app">
    <div class="headerWrap">
      <div class="top">
        <div class="wrap">
          <span>开发者平台</span>
          <span>品牌介绍</span>
          <span>侵权投诉</span>
          <span>代理合作</span>
        </div>
      </div>
      <div class="header clearfix wrap">
        <div class="headerLeft">
          <img src="https://web.3fgj.com/imgVue/lawyer.png" alt="">
          <h1>芯汇法务云</h1>
        </div>
        <div class="headerRight">
          <div class="download" @click.stop="download()">
            <span>下载APP</span>
          </div>
          <div class="singIn">
            <span class="beforeNone">登录</span>
          </div>
        </div>
      </div>
      <div class="navBorder" :class="{navFixed:fixed}">
        <div class="nav wrap">
          <div v-if="fixed">
            <img src="https://web.3fgj.com/imgVue/lawyer.ico" alt="">
          </div>

          <div v-for="item,index in navList" @click="changeShow(item,index)" :class="{active:item.isId==indexData}">
            <span>{{item.name}}</span>
          </div>


          <div class="navDownload" v-if="fixed" @click.stop="download()">
            <span>下载APP</span>
          </div>
          <div class="navSingIn" v-if="fixed">
            <span class="beforeNone">登录</span>
          </div>

        </div>

      </div>
    </div>

    <div v-if="fatiao">
      <LawyerFindLawDetails></LawyerFindLawDetails>
    </div>

    <div v-else>
      <LawyerFindRecommendPc :val="type"></LawyerFindRecommendPc>
    </div>


  </div>
</template>

<script>
  import LawyerFindRecommendPc from '../views/threeApp/stylePc/LawyerFindRecommendPc.vue'
  import LawyerFindLawDetails from '../views/threeApp/LawyerFind/LawyerFindLawDetails.vue'

  export default {
    name: "navPc",
    data() {
      return {
        navList: [],
        indexData: 1,
        fixed:false,
        type:{},
        fatiao:false
      }
    },
    components: {
      LawyerFindRecommendPc,
      LawyerFindLawDetails
    },
    mounted() {
      window.addEventListener('scroll', this.scrollTop);
    },
    created() {
      this.getType();
    },
    methods: {
      download(){
        let routeData=this.$router.resolve({
          name:'DownloadPc'
        })
        window.open(routeData.href,'_blank');
      },
      scrollTop() {
        let scrollTop = document.documentElement.scrollTop; //滚动条的高
        if (scrollTop > 100) {
          this.fixed=true;
        }else{
          this.fixed=false;
        }
        // let documentTop = document.body.scrollHeight       //全部内容的高
        // let screenHeight = window.screen.availHeight       //当前屏幕的高
        // if (scrollTop + screenHeight >= documentTop) {
        //   //干你想干的事儿
        //   console.log(2)
        // }
      },
      getType() {//获取分类
        let options = new FormData();
        this.$store.dispatch('getType', options)
          .then(data => {
            this.type=data[1];
            for (let i = 0; i < data.length; i++) {
              data[i].isId = i;
            }
            this.navList = data;
          })
      },
      changeShow(item,index) {
        if(index==2){
          this.fatiao=true;
        }else{
          this.fatiao=false;
        }
        this.type=item;
        this.indexData = index;
      }

    }

  }
</script>

<style scoped>

  .navFixed {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 55;
  }

  .wrap {
    width: 1080px;
    margin: 0 auto;
  }

  .navBorder {
    width:100%;
    background-color: #fff;
    border-bottom: 1px solid #dfdfdf;
  }
  .navBorder .navDownload span,.navBorder .navSingIn span{
    color:#da3838;
    font-size:16px;
    cursor: pointer;
    display:inline-block;
    margin-top:2px;
  }
  .navBorder .navSingIn span{
    border:1px solid #da3838;
    padding:0 12px;
  }
  .navSingIn span:hover{
    background-color: #da3838;
    color: #fff;
  }

  .top {
    text-align: right;
    height: 36px;
    border-bottom: 1px solid #dfdfdf;
    color: #999;
  }

  .top span {
    display: inline-block;
    line-height: 36px;
    padding: 0 10px;
    font-size: 14px;
    position: relative;
  }

  .top span:hover {
    color: #d3d3d3;
    cursor: pointer;
  }

  .top span:before {
    position: absolute;
    content: '';
    height: 15px;
    border-right: 1px solid #ccc;
    right: -3px;
    top: 10px;
  }

  .top span:last-child:before {
    border: 0;
  }

  .header {
    padding: 20px 0;
  }

  .headerLeft {
    float: left;
  }

  .headerLeft img {
    width: 35px;
    vertical-align: middle;
  }

  h1 {
    display: inline-block;
    font-size: 28px;
    font-family: 'KaiTi';
    font-weight: bold;
    vertical-align: middle;
  }

  .headerRight {
    float: right;
    display: flex;
  }

  .headerRight span {
    color: #da3838;
    padding: 3px 20px;
    line-height: 44px;
    font-size: 16px;
    position: relative;
  }

  .headerRight span:before {
    position: absolute;
    content: '';
    height: 15px;
    border-right: 1px solid #ccc;
    right: 0;
    top: 8px;
  }

  .headerRight div:first-child {
    margin-right: 30px;
  }

  .headerRight .beforeNone:before {
    border: 0;
  }

  .singIn span {
    border: 1px solid #da3838;
    border-radius: 4px;
  }

  .singIn span:hover {
    background-color: #da3838;
    color: #fff;
    cursor: pointer;
  }

  .download span:hover {
    color: #f18787;
    cursor: pointer;
  }

  .nav {
    display: flex;
    justify-content: space-around;
  }

  .nav div {
    padding: 10px 0;
    position: relative;
  }

  .active {
    color: #da3838;
  }

  .nav div.active:before {
    position: absolute;
    content: '';
    height: 3px;
    width: 100%;
    background-color: #da3838;
    left: 0;
    bottom: 0;
    border-radius: 3px;
  }

  .nav div:hover {
    cursor: pointer;
    color: #da3838;
  }

  .nav span {
    font-size: 18px;
  }
</style>
