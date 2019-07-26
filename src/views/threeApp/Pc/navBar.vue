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
          <span v-for="item,index in navList" @click.stop="pushIndex(item,index)" :class="{active:index==nowIndex}">
            {{item.name}}
          </span>
        </div>
      </div>
    </div>

    <router-view></router-view>


  </div>
</template>

<script>
    export default {
        name: "navBar",
      data(){
          return{
            nowIndex:0,
            navList:[
              {
                name:'首页',
                routerName:'IndexPc',
                id:0
              },
              {
                name:'法家号',
                routerName:'navPc',
              },
              {
                name:'关于我们',
                routerName:'AboutPc',
              },
              {
                name:'app下载',
                routerName:'DownloadPc',
              }
            ]
          }
      },
      methods:{
        pushIndex(item,index){
          this.nowIndex=index;
          if(index==1){
            let routeData=this.$router.resolve({
              name:item.routerName
            })
            window.open(routeData.href,'_blank');
            // this.$router.push({name:item.routerName})
          }else{
            this.$router.push({name:item.routerName})
          }
        }
      }
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
    /*padding:0 20px;*/
    text-align:center;
    display:inline-block;
    letter-spacing:2px;
    cursor:pointer;
    position:relative;
    width:100px;
  }
  .right span.active:before{
    position:absolute;
    content:'';
    left:50%;
    bottom:0;
    width:60%;
    transform:translateX(-50%);
    height:2px;
    background-color: #5d74ff;
    color:#5d74ff;
  }
  .right span:hover{
    color:#b998d0;
  }

  .wrap {
    width: 1080px;
    margin: 0 auto;
  }
</style>
