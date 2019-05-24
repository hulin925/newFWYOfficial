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
        <div class="headerCenter">
          <input type="text" placeholder="请输入想了解的法条信息">
          <span @click.stop="searchFatiao()">搜索</span>
        </div>
        <div class="headerRight">
          <div class="download" @click.stop="download()">
            <span>下载APP</span>
          </div>
          <div class="singIn" @click.stop="goSingIn()">
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
          <div class="navSingIn" v-if="fixed" @click.stop="goSingIn()">
            <span class="beforeNone">登录</span>
          </div>

        </div>

      </div>
    </div>

    <!--法条组件-->
    <div v-if="fatiao">
      <LawyerFindFatiaoPc></LawyerFindFatiaoPc>
    </div>

    <div v-else>
      <LawyerFindRecommendPc :val="type"></LawyerFindRecommendPc>
    </div>


    <div class="warpSingIn" v-show="closeOut">
      <div class="singInFrame">
        <div class="fork clearfix">
          <span @click.stop="Close()">×</span>
        </div>

          <div class="singInLogo">
            <img src="https://web.3fgj.com/imgVue/lawyer.ico" alt="">
            <span>芯汇法务云</span>
          </div>

          <div class="singInFork" v-if="!forget">
            <div>
              <input type="text" placeholder="请输入手机号" v-model="loginForm.name"
                     oninput="value=value.replace(/[^\d]/g,'');if(value.length>11)value=value.slice(0,11)">
            </div>
            <div>
              <input type="password" placeholder="请输入密码" v-model="loginForm.password">
            </div>
            <div v-show="getCode" class="sendCode" v-model="loginForm.checkcode">
              <input type="text" placeholder="请输入密码" oninput="value=value.replace(/[^\d]/g,'')">
              <span>发送验证码</span>
            </div>
            <div class="denglu" v-show="!getCode" @click.stop="logOn()">
              <span>登录</span>
            </div>
            <div class="register" @click.sotp="showCode()" :class="{activeBg:getCode}">
              <span>注册</span>
            </div>
            <div class="Password" v-if="!getCode" @click.stop="forgetPassword()">
              <span>忘记密码</span>
            </div>
            <div class="Password" @click.stop="singIn()" v-else>
              <span>已有账号</span>
            </div>
          </div>

        <div class="singInFork" v-else>
          <div>
            <input type="text" placeholder="请输入手机号"
                   oninput="value=value.replace(/[^\d]/g,'');if(value.length>11)value=value.slice(0,11)">
          </div>
          <div class="denglu">
            <span>发送</span>
          </div>
          <div class="Password alignCenter" v-if="!getCode" @click.stop="forgetPassword()">
            <span @click.stop="backSingIn">返回登录</span>
          </div>
        </div>


      </div>


    </div>

  </div>
</template>

<script>
  import LawyerFindRecommendPc from '../views/threeApp/stylePc/LawyerFindRecommendPc.vue'
  import LawyerFindFatiaoPc from '../views/threeApp/stylePc/LawyerFindFatiaoPc.vue'

  export default {
    name: "navPc",
    data() {
      return {
        navList: [],
        indexData: 1,
        fixed: false,
        type: {},
        fatiao: false,
        getCode: false,
        forget:false,
        closeOut:false,
        loginForm:{
          name:'',
          password:'',
          checkcode:''
        }
      }
    },
    components: {
      LawyerFindRecommendPc,
      LawyerFindFatiaoPc
    },
    mounted() {
      window.addEventListener('scroll', this.scrollTop);

    },
    created() {
      this.getType();
    },
    methods: {
      logOn(){
        console.log(this.loginForm)
      },
      goSingIn(){//登录
        this.closeOut=!this.closeOut;
      },
      Close(){//关闭注册
        this.closeOut=!this.closeOut;
      },
      backSingIn(){//返回登录
        this.forget=false;
      },
      forgetPassword() {//忘记秘密
        this.forget=true;
      },
      singIn() {//已有账号
        this.getCode = false;
      },
      showCode() {//注册
        this.getCode = true;
      },
      download() {
        let routeData = this.$router.resolve({
          path: '/DownloadPc'
        })
        window.open(routeData.href, '_blank');
        console.log(routeData,22)
      },
      scrollTop() {
        let scrollTop = document.documentElement.scrollTop; //滚动条的高
        if (scrollTop > 100) {
          this.fixed = true;
        } else {
          this.fixed = false;
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
            this.type = data[1];
            for (let i = 0; i < data.length; i++) {
              data[i].isId = i;
            }
            this.navList = data;
          })
      },
      searchFatiao(){
        this.fatiao = true;
        this.indexData = 2;
      },
      changeShow(item, index) {

        if (index == 2) {
          this.fatiao = true;
        } else {
          this.fatiao = false;
          this.type = item;
        }
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
    width: 100%;
    background-color: #fff;
    border-bottom: 1px solid #dfdfdf;
  }

  .navBorder .navDownload span, .navBorder .navSingIn span {
    color: #da3838;
    font-size: 16px;
    cursor: pointer;
    display: inline-block;
    margin-top: 2px;
  }

  .navBorder .navSingIn span {
    border: 1px solid #da3838;
    padding: 0 12px;
  }

  .navSingIn span:hover {
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

  .headerCenter{
    float:left;
    margin-left:30px;
    padding-top:5px;
  }
  .headerCenter input{
    height:36px;
    width:400px;
    border:1px solid #ccc;
    text-indent:1.5em;
    vertical-align: middle;
  }
  .headerCenter span{
    width:80px;
    height:36px;
    display:inline-block;
    background-color: #dd3b3d;
    color:#fff;
    text-align:center;
    line-height:36px;
    font-size:16px;
    margin-left:10px;
    cursor:pointer;
    vertical-align: middle;
  }
  .headerCenter input::-webkit-input-placeholder {
    color: #9a9a9a;
    /* placeholder字体大小  */
    font-size: 16px;
    /* placeholder位置  */
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

  .warpSingIn {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    background-color: rgba(0, 0, 0, .2);
  }

  .warpSingIn .singInFrame {
    width: 420px;
    padding-bottom: 20px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .singInLogo {
    text-align: center;
  }

  .singInLogo img {
    vertical-align: middle;
  }

  .singInLogo span {
    vertical-align: middle;
    font-size: 24px;
    font-family: 'KaiTi'
  }

  .fork {
    width: 100%;
  }

  .fork span {
    float: right;
    font-size: 30px;
    text-align: center;
    line-height: 30px;
    padding: 0 10px;
    color: #ccc;
    cursor: pointer;
  }

  .singInFork {
    padding-top: 20px;
    text-align: center;
  }

  .singInFork input {
    height: 40px;
    width: 320px;
    text-indent: 1em;
    border: 1px solid #ccc;
  }

  .singInFork div {
    height: 40px;
    width: 320px;
    margin: 10px auto;
    line-height: 40px;
  }

  input::-webkit-input-placeholder {
    color: #ccc;
    /* placeholder字体大小  */
    font-size: 15px;
    /* placeholder位置  */
  }

  .denglu {
    background-color: #ff5b5f;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }

  .singInFork .register {
    border: 1px solid #ff5b5f;
    color: red;
    margin-bottom: 0;
    cursor: pointer;
  }

  .singInFork .Password {
    margin: 0 auto;
    text-align: right;
  }

  .singInFork .Password span {
    font-size: 14px;
    color: #979797;
    cursor: pointer;
  }

  .singInFork .Password span:hover {
    color: red;
  }

  .singInFork .activeBg {
    background-color: #ff5b5f;
    color: #fff;
  }

  .sendCode {
    position: relative;
  }

  .sendCode span {
    position: absolute;
    right: 10px;
    top: 0;
    cursor: pointer;
    color: #7c7b7b;
  }

  .sendCode span:hover {
    color: #363636;
  }
  .singInFork .alignCenter{
    text-align:center;
  }
</style>
