<template>
  <div>
    <!--:class="this.$isMobile()?'':'isPc'"-->
    <div class="isPc" v-if="!this.$isMobile()">
      <div class="wrap clearfix">
        <div class="logo">
          <img src="https://web.3fgj.com/imgVue/lawyer.png" alt="">
          <span>芯汇法务云</span>
        </div>
        <div class="right">
          <span v-for="item,index in navListPc" @click.stop="pushIndex(item,index)" :class="{active:index==nowIndex}">
            {{item.name}}
          </span>
        </div>
      </div>
    </div>

    <div class="isPc1" v-else>
        <div class="right1">
          <span v-for="item,index in navListMobile" @click.stop="pushIndexMobile(item,index)" :class="{active:index==nowIndex}">
            {{item.name}}
          </span>
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
            navListPc:[
              {
                name:'首页',
                routerName:'IndexPc',
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
            ],
            navListMobile:[
              {
                name:'首页',
                routerName:'IndexPc',
              },
              {
                name:'法家号',
                routerName:'LawyerFindRecommend',
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
        },
        pushIndexMobile(item,index){
          this.nowIndex=index;
          // if(index==1){
          //   let routeData=this.$router.resolve({
          //     name:item.routerName
          //   })
          //   window.open(routeData.href,'_blank');
          //   // this.$router.push({name:item.routerName})
          // }else{
            this.$router.push({name:item.routerName})
          // }
        },

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
  .isPc1 {
    position: fixed;
    left: 0;
    top: 0;
    height: 100/@r;
    width: 100%;
    background-color: rgba(108, 106, 106, .4);
    z-index: 999;
  }
  .right1{
    display: flex;
    justify-content:space-around;
    line-height:100/@r;
  }
  .right1 span{
    color:#fff;
    width:25%;
    text-align:center;
    position:relative;
  }
  .right1 span.active:before{
    position:absolute;
    content:'';
    width:70%;
    height:4/@r;
    background-color: #5d74ff;
    color:#5d74ff;
    left:50%;
    bottom:0;
    transform:translateX(-50%);
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
    color:#ccc;
  }

  .wrap {
    width: 1080px;
    margin: 0 auto;
  }
</style>
