<template>
  <div>
    <ul>
      <li class="clearfix">
        <div class="left">
          <span>头像</span>
        </div>
        <div class="right">
          <img :src="data.faces" alt="">
        </div>
      </li>
      <li class="clearfix">
        <div class="left">
          <span>昵称</span>
        </div>
        <div class="right">
          <span>{{data.nickname}}</span>
        </div>
      </li>
      <li class="clearfix">
        <div class="left">
          <span>性别</span>
        </div>
        <div class="right">
          <span v-if="data.sex==1">男</span>
          <span v-else>女</span>
        </div>
      </li>
      <li class="clearfix">
        <div class="left">
          <span>我的地址</span>
        </div>
        <div class="right">
          <span>{{data.detail}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "information",
      data(){
          return{
            userInfo:{},
            data:{},
          }
      },
      created(){
          this.userInfo=JSON.parse(sessionStorage.getItem('userInfo'));
          this.initData();
      },
      methods:{
          initData(){
            let options=new FormData();
            options.append('uid',this.userInfo.uid);
            options.append('token',this.userInfo.token);
            this.$store.dispatch('PersonalData',options)
              .then(data=>{
                this.data=data;
                data.faces=data.weburl+data.face;
              })
          },
      }

    }
</script>

<style scoped>

  li{
    line-height:40px;
    font-size:18px;
    border-bottom:1px solid #ddd;
    padding:15px 0;
  }
  .left{
    width:20%;
    float:left;
    overflow: hidden;
  }
  .right{
    width:80%;
    float:left;
  }
  .right img{
    width:40px;
    vertical-align:middle;
  }

</style>
