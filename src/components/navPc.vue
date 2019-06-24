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
          <div class="singIn" @click.stop="goSingIn()" v-if="!dataInfo">
            <span class="beforeNone">登录</span>
          </div>
          <div class="userInfos" v-else>
            <h1>
              <img :src="face" alt="">
            </h1>
            <div class="clearfix">
              <strong>{{dataInfo.nickname}}</strong>
              <i class="iconfont icon-xiala"></i>
            </div>
            <ul class="Personal">
              <li @click="PersonalCenter()">个人中心</li>
              <li @click="singOut()">退出</li>
            </ul>
          </div>
        </div>

      </div>
      <div class="navBorder" :class="{navFixed:fixed}">
        <div class="nav wrap">
          <div v-if="fixed">
            <img src="https://web.3fgj.com/imgVue/lawyer.ico" alt="">
          </div>

          <div v-for="item,index in navList" @click="changeShow(item,index)" :class="{active:item.isId==indexData}" id="navs" class="everyDiv">
            <span>{{item.name}}</span>
          </div>


          <div class="navDownload"  @click.stop="download()" v-if="fixed">
            <span>下载APP</span>
          </div>
          <!--<div class="navSingIn" @click.stop="goSingIn()"  v-if="!dataInfo">-->
            <!--<span class="beforeNone">登录</span>-->
          <!--</div>-->
          <div class="userInfos navUser" v-if="dataInfo&&fixed">
            <h1>
              <img :src="face" alt="">
            </h1>
            <div class="clearfix">
              <strong>{{dataInfo.nickname}}</strong>
              <i class="iconfont icon-xiala"></i>
            </div>
            <ul class="Personal">
              <li @click="PersonalCenter()">个人中心</li>
              <li @click="singOut()">退出</li>
            </ul>
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


    <div class="warpSingIn" v-show="closeOutPc">
      <div class="singInFrame">
        <div class="fork clearfix">
          <span @click.stop="Close()">×</span>
        </div>

        <div class="singInLogo">
          <img src="https://web.3fgj.com/imgVue/lawyer.ico" alt="">
          <span>芯汇法务云</span>
        </div>

        <div class="singInFork" v-if="!forget">

          <div v-if="!getCode">
            <div>
              <input type="text" placeholder="请输入手机号" v-model="loginForm.name"  ref="input1"
                     oninput="value=value.replace(/[^\d]/g,'');if(value.length>11)value=value.slice(0,11)">
            </div>
            <div>
              <input type="password" placeholder="请输入密码" v-model="loginForm.password"  @keyup.enter="logOn()">
            </div>
            <div class="showErr" v-if="showErr1">
              <p>
                <i class="iconfont icon-msnui-forbid"></i>
                <span>{{errMessage}}</span>
              </p>
            </div>
            <div class="denglu" @click.stop="logOn()">
              <span>登录</span>
            </div>
            <div class="register" @click.sotp="showCode()" :class="{activeBg:getCode}">
              <span>注册</span>
            </div>
            <div class="Password" @click.stop="forgetPassword()">
              <span>忘记密码</span>
            </div>
          </div>


          <div v-else>
            <div>
              <input type="text" placeholder="请输入手机号" v-model="loginForm.name" @keyup.enter="sendCode()" ref="input2"
                     oninput="value=value.replace(/[^\d]/g,'');if(value.length>11)value=value.slice(0,11)">
            </div>
            <div class="sendCode">
              <input type="text" placeholder="请输入验证码" v-model="loginForm.checkcode">
              <span @click="sendCode()" v-if="timeAction">| 发送验证码</span>
              <span v-else>{{time}}S后重新获取</span>
            </div>
            <div>
              <input type="password" placeholder="请输入密码" v-model="loginForm.registerPassword">
            </div>
            <div class="selectCity">
              <el-cascader
                v-model="value"
                :options="options"
                @change="handleChange"></el-cascader>
            </div>
            <div class="showErr" v-if="showErr2">
              <p>
                <i class="iconfont icon-msnui-forbid"></i>
                <span>{{errMessage}}</span>
              </p>
            </div>
            <div class="register" @click.sotp="registerData()" :class="{activeBg:getCode}">
              <span>注册</span>
            </div>
            <div class="Password" @click.stop="singIn()">
              <span>已有账号</span>
            </div>
          </div>
        </div>

        <div class="singInFork" v-else>
          <div v-if="upData">
            <div>
              <input type="text" placeholder="请输入手机号" v-model="loginForm.name1" @keyup.enter="sendCodes()" ref="input3"
                     oninput="value=value.replace(/[^\d]/g,'');if(value.length>11)value=value.slice(0,11)">
            </div>
            <div class="sendCode" v-show="!isShow">
              <input type="text" placeholder="请输入验证码" v-model="loginForm.checkcode" >
              <span @click="sendCodes()" v-if="timeActions">| 发送验证码</span>
              <span v-else>{{times}}S后重新获取</span>
            </div>
            <div v-show="!isShow">
              <input type="password" placeholder="请输入新密码" v-model="loginForm.forgetPassword" @keyup.enter="changePassword()">
            </div>
            <div class="showErr" v-if="showErr3">
              <p>
                <i class="iconfont icon-msnui-forbid"></i>
                <span>{{errMessage}}</span>
              </p>
            </div>
            <div class="denglu" @click="sendCodes()" v-if="isShow">
              <span>发送</span>
            </div>
            <div class="denglu" @click="changePassword()" v-else>
              <span>确认</span>
            </div>
            <div class="Password alignCenter" @click.stop="backSingIn">
              <span>返回登录</span>
            </div>
          </div>
          <div v-else class="upData">
            <p>密码修改成功！</p>
            <div class="Password alignCenter" @click.stop="backSingIn">
              <span>返回登录</span>
            </div>
          </div>
        </div>


      </div>


    </div>

  </div>
</template>

<script>
  import LawyerFindRecommendPc from '../views/threeApp/stylePc/LawyerFindRecommendPc.vue'
  import LawyerFindFatiaoPc from '../views/threeApp/stylePc/LawyerFindFatiaoPc.vue'
  import pcProvinceData from '@/assets/pcProvinceData.js'
  import {mapGetters} from 'vuex'

  export default {
    name: "navPc",
    inject:['reload'],
    computed:mapGetters([
      'closeOutPc'
    ]),
    data() {
      return {
        dataInfo:{},
        face:'',
        value: [],
        cityData: [],//选中数据
        options: pcProvinceData,
        time:60,
        times:60,
        timeAction:true,
        timeActions:true,
        showErr1: false,//登录提示
        showErr2: false,//登录提示
        showErr3: false,//登录提示
        upData:true,
        errMessage: '',
        isShow:true,
        navList: [],
        indexData: 0,
        fixed: false,
        type: {},
        fatiao: false,
        getCode: false,
        forget: false,
        loginForm: {
          name: '',
          name1: '',
          password: '',
          checkcode: '',
          forgetPassword:'',
          registerPassword:''
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
      this.dataInfo=JSON.parse(sessionStorage.getItem('userInfo'));
      if(this.dataInfo){
        this.face=this.dataInfo.weburl+this.dataInfo.face;
      }
    },
    methods: {
      PersonalCenter(){//个人中心
        let routerData=this.$router.resolve({
          name:'personalData'
        })
        window.open(routerData.href,"_blank");
      },
      singOut(){//退出
        sessionStorage.removeItem('userInfo');
        this.reload();
      },
      changePassword(){//修改密码
        let options = new FormData();
        options.append('username', this.loginForm.name1);
        options.append('is_login', 'false');
        // options.append('oldpassword', '');
        options.append('password', this.loginForm.forgetPassword);
        options.append('checkcode', this.loginForm.checkcode);
        // options.append('uid', '');
        // options.append('token', '');
        this.$store.dispatch('changePassword', options)
          .then(data => {
            if (Number(data.code) == 10015) {
              this.showErr3 = true;
              this.errMessage = data.message;
            } else {
              this.showErr3 = false;
              this.upData=false;
              // this.closeOut=false;
            }
          })
      },
      sendCode() {//发送验证码
        var phone = this.loginForm.name;
        if(!(/^1[3456789]\d{9}$/.test(phone))){
          this.showErr2 = true
          this.errMessage ='您的手机号码不正确，请重新填写！';
          return;
        }
        this.timeAction=false;
        let timer=setInterval(()=>{
          this.time--;
          if(this.time==0){
            this.timeAction=true;
            this.password='重新获取';
            clearInterval(timer);//关闭定时器
            this.time=60;
          }
        },1000)
        let options = new FormData();
        options.append('username', this.loginForm.name);
        options.append('do', 'reg');
        this.$store.dispatch('sendCode', options)
          .then(data => {
            if (Number(data.code) == 10015) {
              this.showErr2 = true;
              this.errMessage = data.message;
            } else {
              this.showErr2 = false;
              // this.closeOut=false;
            }
          })
      },
      sendCodes() {//发送验证码,忘记密码
        var phone = this.loginForm.name1;
        if(!(/^1[3456789]\d{9}$/.test(phone))){
          this.showErr3 = true
          this.errMessage ='您的手机号码不正确，请重新填写！';
          return;
        }
        this.isShow=false;
        this.loginForm.checkcode='';
        this.loginForm.password='';
        this.timeActions=false;
        let timers=setInterval(()=>{
          this.times--;
          if(this.times==0){
            this.timeActions=true;
            this.password='重新获取';
            clearInterval(timers);//关闭定时器
            this.times=60;
          }
        },1000);
        let options = new FormData();
        options.append('username', this.loginForm.name1);
        options.append('do', 'reset');
        this.$store.dispatch('sendCode', options)
          .then(data => {
            if (Number(data.code) == 10015) {
              this.showErr3 = true;
              this.errMessage = data.message;
            } else {
              this.showErr3 = false;
              // this.closeOut=false;
            }
          })
      },
      logOn() {//登录
        let options = new FormData();
        options.append('username', this.loginForm.name);
        options.append('password', this.loginForm.password);
        this.$store.dispatch('logOn', options)
          .then(data => {
            if (Number(data.code) == 10106) {
              this.showErr1 = true;
              this.errMessage = data.message;
            } else {
              this.reload();
              this.showErr1 = false;
              // this.closeOutPc = false;
              this.$store.commit('hidenCloseOutPc');
              sessionStorage.setItem('userInfo', JSON.stringify(data));
              this.$message({
                message:'登录成功',
                type: 'success',
                center: true
              })
            }
          }, err => {
          })
      },
      goSingIn() {//登录
        this.$store.commit('showCloseOutPc');
        // this.closeOutPc = !this.closeOut;
        this.getCode=false;
        this.showErr1=false;
        this.showErr2=false;
        this.showErr3=false;
        this.forget=false;

        this.$nextTick(()=>{
          this.$refs.input1.focus();
        })
      },
      Close() {//关闭注册
        this.$store.commit('hidenCloseOutPc');
        // this.closeOutPc = !this.closeOut;
      },
      backSingIn() {//返回登录
        this.forget = false;
        this.$nextTick(()=>{
          this.$refs.input1.focus();
        })
      },
      forgetPassword() {//忘记秘密
        this.isShow=true;
        this.forget = true;
        this.upData=true;
        this.loginForm.name1='';
        this.$nextTick(()=>{
          this.$refs.input3.focus();
        })
      },
      singIn() {//已有账号
        this.getCode = false;
        this.$nextTick(()=>{
          this.$refs.input1.focus();
        })
      },
      handleChange(value) {
        this.cityData = value;
      },
      showCode() {
        this.loginForm.checkcode='';
        this.loginForm.registerPassword='';
        this.value=[];
        this.loginForm.name='';
        this.getCode = true;
        this.$nextTick(()=>{
          this.$refs.input2.focus();
        })
      },
      registerData() {//注册
        let options = new FormData();
        options.append('username', this.loginForm.name);
        options.append('checkcode', this.loginForm.checkcode);
        options.append('password', this.loginForm.registerPassword);
        options.append('province_cn', this.cityData[0]);
        options.append('city_cn', this.cityData[1]);
        options.append('area_cn', this.cityData[2]);
        this.$store.dispatch('register', options)
          .then(data => {
            if (Number(data.code) == 10106) {
              this.showErr2 = true;
              this.errMessage = data.message;
            } else if (Number(data.code) == 10004) {
              this.showErr2 = true;
              this.errMessage = data.message;
            } else if (Number(data.code) == 10104) {
              this.showErr2 = true;
              this.errMessage = data.message;
            } else {
              this.$message({
                message:'注册成功',
                type:'success',
                center:true
              })
              this.showErr2 = false;
              this.$store.commit('hidenCloseOutPc');
              // this.closeOutPc = false;
              sessionStorage.setItem('userInfo', JSON.stringify(data));
              setTimeout(()=>{
                this.$message({
                  message:'登录成功',
                  type: 'success',
                  center: true
                })
              },800)
            }
          }, err => {
          })

      },
      download() {
        let routeData = this.$router.resolve({
          path: '/DownloadPc'
        })
        window.open(routeData.href, '_blank');
      },
      scrollTop() {
        let scrollTop = document.documentElement.scrollTop; //滚动条的高
        var navs=document.querySelectorAll('#navs');
        if (scrollTop > 100) {
          this.fixed = true;
          // navs.forEach((item)=>{
          //   item.style.marginLeft=-10+'px';
          // })
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
            var data = data.slice(1);
            data[0].name = '首页';
            this.type = data[0];
            for (let i = 0; i < data.length; i++) {
              data[i].isId = i;
            }
            this.navList = data;
          })
      },
      searchFatiao() {
        this.fatiao = true;
        this.indexData = 2;
      },
      changeShow(item, index) {

        if (index == 1) {
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
  .navBorder .navUser{
    padding:0;
  }
  .navBorder .navDownload{
    margin-right:20px;
    position:relative;
  }
  .navBorder .navDownload:before{
    position:absolute;
    content:'';
    right:-12px;
    top:30%;
    width:1px;
    height:20px;
    background-color: #ccc;
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
    position:relative;
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

  .headerCenter {
    float: left;
    margin-left: 30px;
    padding-top: 5px;
  }
  .headerCenter input:focus{
    border-color:red;
  }
  .headerCenter input {
    height: 36px;
    width: 400px;
    border: 1px solid #ccc;
    text-indent: 1.5em;
    vertical-align: middle;
  }

  .headerCenter span {
    width: 80px;
    height: 36px;
    display: inline-block;
    background-color: #dd3b3d;
    color: #fff;
    text-align: center;
    line-height: 36px;
    font-size: 16px;
    margin-left: 10px;
    cursor: pointer;
    vertical-align: middle;
  }

  .headerCenter input::-webkit-input-placeholder {
    color: #9a9a9a;
    /* placeholder字体大小  */
    font-size: 16px;
    /* placeholder位置  */
  }
  .userInfos{
    display: flex;
    margin-left:-15px;
    cursor:pointer;
    position:relative;
  }
  .userInfos:hover .Personal{
    display: block;
  }
  .userInfos .Personal{
    position: absolute;
    top:43px;
    left:0;
    text-align:center;
    width:100%;
    background-color: #fff;
    z-index: 9999;
    padding:10px 0;
    display: none;
  }
  .userInfos .Personal li{
    line-height:30px;
  }
  .userInfos .Personal li:hover{
    color:red;
  }
  .userInfos div{
    padding-top:12px;
  }
  .userInfos h1{
    width:40px;
    height:40px;
    border-radius: 25px;
    overflow: hidden;
    margin:3px 10px 0 0;
  }
  .userInfos img{
    width:100%;
    height:100%;
    display: inline-block;
  }
  .userInfos strong{
    float: left;
    width:60px;
    overflow: hidden;
    margin-right:5px;
  }
  .userInfos i{
    float: right;
    display: inline-block;
  }
  .icon-xiala{
    color:#727272;
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
    width: 200%;
    background-color: #da3838;
    left: -50%;
    bottom: 0;
    border-radius: 3px;
  }

  .nav .everyDiv:hover {
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
    z-index: 1;
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
    z-index: 2;
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

  .singInFork div input {
    height: 40px;
    width: 320px;
    text-indent: 1em;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .singInFork div div {
    height: 40px;
    width: 320px;
    margin: 10px auto;
    line-height: 40px;
  }

  .singInFork .selectCity {
    margin-bottom: 25px;
  }

  .singInFork .showErr {
    height: 40px;
    width: 320px;
    text-indent: 1em;
    border: 1px solid red;
    text-align: left;
    background-color: #fff5f5;
  }

  .icon-msnui-forbid {
    color: red;
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

  .singInFork .alignCenter {
    text-align: center;
  }

  .singInFork input:focus {
    border-color: #409eff;
  }
  .upData p{
    text-align:center;
    line-height:30px;
    font-size:20px;
    color:green;
    padding-left:20px;
  }
</style>
