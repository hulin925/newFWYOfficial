<template>
	<div id="app">
		<router-view v-if="isRouterAlive"></router-view>

    <!--预加载-->
		<div :class="isMobile?'loadingMask':'loadingMask1'" v-show="isLoading">

			<div>
				<i></i>
				<span>拼命加载中...</span>
			</div>

		</div>


    <div class="warpSingIn" v-show="closeOutPcBox">
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
              <el-input type="password" placeholder="请输入密码" v-model="loginForm.password"  @keyup.enter="logOn()" show-password></el-input>
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
              <el-input type="password" placeholder="请输入密码" v-model="loginForm.registerPassword" show-password></el-input>
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
              <el-input type="password" placeholder="请输入新密码" v-model="loginForm.forgetPassword" @keyup.enter="changePassword()" show-password>
              </el-input>
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
	import {mapGetters} from 'vuex'
  import pcProvinceData from '@/assets/pcProvinceData.js'
	export default {
		name: 'app',
    provide (){
      return {
        reload:this.reload
      }
    },
		computed:mapGetters([
			'isLoading',
      'closeOutPcBox',
      'getCode',
      'showErr1',//登录提示
      'showErr2',//登录提示
      'showErr3',//登录提示
      'forget',
  // 'isZan'
		]),
    data(){
		  return{
        isRouterAlive:true,
        isMobile:false,//判断哪端加载图标不一样
        value: [],
        cityData: [],//选中数据
        options: pcProvinceData,
        // getCode:false,
        // showErr1:false,
        // showErr2:false,
        // showErr3:false,
        // forget:false,
        time:60,
        times:60,
        timeAction:true,
        timeActions:true,
        upData:true,
        errMessage: '',
        isShow:true,
        navList: [],
        indexData: 0,
        fixed: false,
        type: {},
        fatiao: false,
        images:[],
        loginForm: {
          name: '',
          name1: '',
          password: '',
          checkcode: '',
          forgetPassword:'',
          registerPassword:'',
        }

      }
    },
    mounted() {
      // if (this.$isMobile()) {
      //   this.$router.replace('/LawyerFindRecommend');
      // } else {
      //   this.$router.replace('/navPc');
      // }
    },
    created(){
		  this.isMobile=this.$isMobile();
    },
    methods:{
      reload (){
        this.isRouterAlive = false;
        this.$nextTick(function(){
          this.isRouterAlive = true
        })
      },
      getCity(name){//获取省市
        if(name.includes('省')){
          return {
            province:name.substring(0,name.indexOf('省')+1),
            city:name.substring(name.indexOf('省')+1)
          }
        }else{
          return {
            province:name,
            city:name
          };
        }
      },
      Close() {//关闭注册
        this.$store.commit('hidenCloseOutPcBox');
        // this.closeOutPc = !this.closeOut;
      },
      logOn() {//登录
        let options = new FormData();
        options.append('username', this.loginForm.name);
        options.append('password', this.loginForm.password);
        this.$store.dispatch('logOn', options)
          .then(data => {
            if (Number(data.code) == 10106) {
              // this.showErr1 = true;
              this.$store.commit('showshowErr1');
              this.errMessage = data.message;
            } else {
              this.reload();
              // this.showErr1 = false;
              this.$store.commit('hidenshowErr1');
              // this.closeOutPc = false;
              this.$store.commit('hidenCloseOutPcBox');
              localStorage.setItem('userInfo', JSON.stringify(data));
              this.$message({
                message:'登录成功',
                type: 'success',
                center: true
              })
            }
          }, err => {
          })
      },
      showCode() {//
        this.loginForm.checkcode='';
        this.loginForm.registerPassword='';
        this.value=[];
        this.loginForm.name='';
        // this.getCode = true;
        this.$store.commit('showgetCode');
        this.$nextTick(()=>{
          this.$refs.input2.focus();
        })
      },
      forgetPassword() {//忘记秘密
        this.isShow=true;
        // this.forget = true;
        this.$store.commit('showforget');
        this.upData=true;
        this.loginForm.name1='';
        this.$nextTick(()=>{
          this.$refs.input3.focus();
        })
      },
      sendCode() {//发送验证码
        var phone = this.loginForm.name;
        if(!(/^1[3456789]\d{9}$/.test(phone))){
          // this.showErr2 = true
          this.$store.commit('showshowErr2');
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
              // this.showErr2 = true;
              this.$store.commit('showshowErr2');
              this.errMessage = data.message;
            } else {
              // this.showErr2 = false;
              this.$store.commit('hidenshowErr2');
              // this.closeOut=false;
            }
          })
      },
      registerData() {//新用户注册
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
              // this.showErr2 = true;
              this.$store.commit('showshowErr2');
              this.errMessage = data.message;
            } else if (Number(data.code) == 10004) {
              this.showErr2 = true;
              this.errMessage = data.message;
            } else if (Number(data.code) == 10104) {
              // this.showErr2 = true;
              this.$store.commit('showshowErr2');
              this.errMessage = data.message;
            } else {
              this.logOn();
              this.reload();
              this.$message({
                message:'注册成功',
                type:'success',
                center:true
              })
              // this.showErr2 = false;
              this.$store.commit('hidenshowErr2')
              this.$store.commit('hidenCloseOutPc');
              // this.closeOutPc = false;
              localStorage.setItem('userInfo', JSON.stringify(data));
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
      singIn() {//已有账号
        // this.getCode = false;
        this.$store.commit('hidengetCode');
        this.$nextTick(()=>{
          this.$refs.input1.focus();
        })
      },
      sendCodes() {//发送验证码,忘记密码
        var phone = this.loginForm.name1;
        if(!(/^1[3456789]\d{9}$/.test(phone))){
          // this.showErr3 = true;
          this.$store.commit('showshowErr3');
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
              // this.showErr3 = true;
              this.$store.commit('showshowErr3');
              this.errMessage = data.message;
            } else {
              // this.showErr3 = false;
              this.$store.commit('hidenshowErr3');
              // this.closeOut=false;
            }
          })
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
              // this.showErr3 = true;
              this.$store.commit('showshowErr3');
              this.errMessage = data.message;
            } else {
              this.loginForm.name=this.loginForm.name1;
              this.loginForm.password=this.loginForm.forgetPassword;
              // this.showErr3 = false;
              this.$store.commit('hidenshowErr3');
              this.upData=false;
              this.logOn();

              // this.closeOut=false;
            }
          })
      },
      backSingIn() {//返回登录
        // this.forget = false;
        this.$store.commit('hidenforget');
        this.$nextTick(()=>{
          this.$refs.input1.focus();
        })
      },
      handleChange(value) {//选中的地址
        this.cityData = value;
      },


    }

	}
</script>

<style lang="less">
	@import '~vux/src/styles/reset.less';
	@r: 30rem;

	#app {
		background-color: #fff;
		font-size: 28/@r;
	}

	a {
		color: red;
		text-decoration: underline;
	}
  #FabulousMask div{
     position: absolute;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
     text-align: center;
     width: 220/@r;
     height: 220/@r;
     overflow: hidden;
   }
  #FabulousMask i{
    display: block;
    width: 100%;
    height: 100%;
    background: url(./assets/img/pointStart.png) no-repeat;
    background-size: 2000% 100%;
    animation: moveHande .65s forwards 1 steps(19);
  }
  @keyframes moveHande {
    form {
      background-position-x: left;
    }
    to {
      background-position-x: right;
    }
  }

	.loadingMask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, .4);
		color: #fff;
	}
  .loadingMask1 {
    position: fixed;
    top: 170px;
    left: 200px;
    right: 600px;
    bottom: 0;
    /*background-color: rgba(0, 0, 0, .2);*/
    color: #555;
  }
  .loadingMask1 div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }

  .loadingMask1 i {
    display: inline-block;
    width: 80/@r;
    height: 80/@r;
    background: url("./assets/img/isLoading .png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    animation: isRotate .5s linear infinite;
  }

  .loadingMask1 span {
    display: block;
    text-align: center;
    font-size: 30/@r;
    line-height: 2;
    font-family: "微软雅黑";
  }

	.loadingMask div {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
	}

	.loadingMask i {
		display: inline-block;
		width: 80/@r;
		height: 80/@r;
		background: url("./assets/img/loadingIcon.png") no-repeat;
		-webkit-background-size: 100% 100%;
		background-size: 100% 100%;
		animation: isRotate .5s linear infinite;
	}

	.loadingMask span {
		display: block;
		text-align: center;
		font-size: 30/@r;
		line-height: 2;
		font-family: "微软雅黑";
	}
	@keyframes isRotate{
		0% {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(-180deg);
		}
		100% {
			transform: rotate(-360deg);
		}
	}

  .warpSingIn {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
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
    height:50px;
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

  .singInFork .denglu {
    background-color: #ff5b5f;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
    margin-top:20px;
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
