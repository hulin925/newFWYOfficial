<template>
  <div>
    <ul>
      <li class="clearfix" >
        <div class="left">
          <img src="https://web.3fgj.com/imgVue/lawyer.ico" alt="">
        </div>
        <div class="right">
          <h1>答复了吗老师发的好消息：7月1日禁摩令将取消？符合标准就能上路了好消息：7月1日禁摩令将取消？符合标准就能上路了好消息：7月1日禁摩令将取消？符合标准就能上路了</h1>
          <p>
            <span>送范德萨说</span>
            <span>50评论</span>
            <span>3天前</span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "PersonalCollection",
    data(){
      return{
        userInfo: {},
        data: [],
      }
    },
    created(){
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      this.initData();
    },
    methods:{
      initData() {
        if (!this.userInfo) {
          return;
        }
        let options = new FormData();
        options.append('uid', this.userInfo.uid);
        options.append('token', this.userInfo.token);
        this.$store.dispatch('PersonalCollection', options)
          .then(data => {
            console.log(data)
            this.data = data;
          })
      }
    }

  }
</script>

<style scoped>

  ul li{
    margin-bottom:30px;
  }
  .left{
    width:140px;
    height:100px;
    float:left;
    margin-right:0px;
  }
  .left img{
    width:100%;
    height:100%;
  }
  .right{
    width:540px;
    float:right;
  }
  h1{
    width:100%;
    height:70px;
    font-size:22px;
    text-overflow:ellipsis;
    overflow:hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    word-break: break-all;
  }
  .right span{
    color:#a2a2a2;
    margin-right:20px;
    line-height:30px;
    display: inline-block;
  }


</style>
