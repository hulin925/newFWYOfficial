<template>
  <div class="app">
    <ul class="list">
      <li class="clearfix">
        <div class="left">手机号 :</div>
        <div class="right">{{userInfo.phone}}</div>
      </li>
      <li class="clearfix">
        <div class="left">验证码 :</div>
        <div class="right">
          <el-input v-model="checkcode" placeholder="请输入验证码"></el-input>
          <span v-if="timeActions" @click="sendCodes()">获取验证码</span>
          <span v-else>{{times}}S后重新获取</span>
        </div>
      </li>
      <li class="clearfix">
        <div class="left">旧密码 :</div>
        <div class="right">
          <el-input v-model="oldpassword" placeholder="请输入旧密码" show-password></el-input>
        </div>
      </li>
      <li class="clearfix">
        <div class="left">新密码 :</div>
        <div class="right">
          <el-input v-model="password" placeholder="请输入新密码" show-password></el-input>
        </div>
      </li>
      <li class="clearfix confirm">
        <el-button type="success" @click="submit">完 成</el-button>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "PersonalCollection",
    data() {
      return {
        userInfo: {},
        data: [],
        noData:false,
        input:'',
        times:60,
        timeActions:true,
        oldpassword:'',
        password:'',
        checkcode:'',
      }
    },
    created() {
      this.userInfos = JSON.parse(localStorage.getItem('userInfo'));
      if (!this.userInfos) {
        this.noData=true;
        this.$store.commit('showCloseOutPcBox');
        this.noData=true;
        this.$message({
          message:'请重新登录，登录过期',
          type:'warning',
          center:true
        })
        return;
      }
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    },
    methods: {
      submit(){
        let options = new FormData();
        options.append('uid',this.userInfo.uid );
        options.append('token',this.userInfo.token);
        options.append('is_login', 'true');
        options.append('oldpassword', this.oldpassword);//旧密码
        options.append('username', this.userInfo.username);//电话
        options.append('password', this.password);//新密码
        options.append('checkcode', this.checkcode);//验证码
        this.$store.dispatch('changePassword', options)
          .then(data => {
            if(data.code==10000){
              this.$message({
                message: data.message,
                type: 'success',
                center: true
              })
              this.oldpassword="";
              this.password="";
              this.checkcode="";
              this.timeActions=true;
              setTimeout(()=>{
                this.$message({
                  message: '请重新登录',
                  type: 'success',
                  center: true
                })
              },800)
            }else if(data.code=10010){
              this.$message({
                message:data.message,
                type:'success',
                center:true
              })
            }else if(data.code==10104){
              this.$message({
                message:data.message,
                type:'success',
                center:true
              })
            }

          })
      },
      sendCodes() {//发送验证码,忘记密码
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
        options.append('username', this.userInfo.username);
        options.append('do', 'reset');
        this.$store.dispatch('sendCode', options)
          .then(data => {
            console.log(data)
            // this.checkcode=data.info;
          })
      },

    },
  }
</script>

<style scoped lang="less" type="text/less">
  @r: 30rem;

  .app{
    padding-left:200px;
  }
  .list li{
    /*border-bottom:1px solid #ddd;*/
    line-height:60px;
  }
  .left{
    float:left;
    margin-right:20px;
  }
  .right{
    float:left;
    position:relative;
  }
  .right span{
    cursor: pointer;
    color:#fff;
    padding:8px;
    background-color: green;
    line-height:20px;
    position:absolute;
    top:13px;
    right:-120px;
    border-radius:4px;
  }

  .nodata img{
    display:block;
    margin:0 auto;
    width:60%;
  }
  .nodata{
    font-size:18px;
    text-align:center;
    line-height:80px;
    color:#a2a2a2;
  }
  .list .nodata{
    border:0;
  }
  .confirm{
    padding-left:100px;
  }
</style>
