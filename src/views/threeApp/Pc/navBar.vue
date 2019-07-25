<template>
  <div>
    <!--:class="this.$isMobile()?'':'isPc'"-->
    <div class="isPc">
      <div class="wrap clearfix">
        <div class="logo">
          <img src="https://web.3fgj.com/imgVue/lawyer.png" alt="">
          <span>芯汇法务云</span>
        </div>
        <div class="right">
          <span @click.stop="pushIndex()">首页</span>
          <span @click.stop="pushAbout()">关于我们</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "navBar"
    }
</script>

<style scoped lang="less" type="text/less">
  @r: 30rem;

  .isPc {
    position: fixed;
    left: 0;
    top: 0;
    height: 70px;
    width: 100%;
    background-color: rgba(108, 106, 106, .4);
    z-index: 999;
    padding:15px;
  }
  .logo{
    float:left;
  }
  .logo img{
    width:40px;
    cursor:pointer;
  }
  .logo span{
    color:#fff;
    font-size:26px;
    font-family:'KaiTi';
    cursor:pointer;
  }
  .right{
    float:right;
  }
  .right span{
    color:#fff;
    line-height:40px;
    padding:0 20px;
    display:inline-block;
    letter-spacing:2px;
    cursor:pointer;
  }
  .right span:hover{
    color:#5d74ff;
  }

  .wrap {
    width: 1080px;
    margin: 0 auto;
  }
</style>
