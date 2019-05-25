<template>
    <div>
      <div class="header clearfix">
        <div class="goBack">
          <i class="iconfont  icon-Back"></i>
        </div>
        <div class="center">
          <span>案源库</span>
        </div>
        <div class="search">
          <i class="iconfont icon-search3"></i>
        </div>
      </div>

      <ul class="list">
        <li v-for="item,index in dataList">
          <div class="title clearfix">
            <strong>被</strong>
            <span>{{item.bg}}</span>
            <i>免费案源</i>
          </div>
          <div class="type clearfix">
            <div class="left">
              <span>执行</span>
              <span>{{item.type_cn}}</span>
            </div>
            <div class="right">
              <span>标的: <i>{{item.price}}</i><strong>万元</strong></span>
            </div>
          </div>
          <div class="Court">
            <span>{{item.administer}}</span>
          </div>
          <div class="address">
            <span>{{item.bg_province}} {{item.bg_city}}</span>
          </div>
        </li>
      </ul>

    </div>
</template>

<script>
    export default {
        name: "anYuanKu",
      data(){
          return{
            dataList:{}
          }
      },
      created(){
        this.initData();
      },
      methods:{
          initData(){
            let options=new FormData();
            options.append('page',1);
            this.$store.dispatch('anYuan',options)
              .then(data=>{
                console.log(data)
                this.dataList=data.list;
              })
          },
      }

    }
</script>

<style scoped lang="less" type="text/less">
  @r:30rem;

  .header{
    height:80/@r;
    background-color: #000;
    padding:0 10/@r;
    color:#fff;
  }
  .header .goBack{
    float:left;
    padding-top:10/@r;
  }
  .header .center{
    float:left;
    font-size:32/@r;
    line-height:80/@r;
    margin-left:230/@r;
  }
  .header .search{
    float:right;
    padding:14/@r 20/@r 10/@r ;
  }
  .icon-search3{
    font-size:36/@r;
  }
  .icon-Back{
    font-size:42/@r;
    padding:20/@r;
  }
  .list{
    padding:20/@r;
    font-size:24/@r;
    color:#aaa;
  }
  .list li{
    border-bottom:1px solid #e5e5e5;
    padding:20/@r 0;
  }
  .title strong{
    float:left;
    border:1px solid #fa7b83;
    padding:0 4/@r;
    line-height:28/@r;
    border-radius:4/@r;
    color:#fa7b83;
    margin:8/@r 12/@r 0 0;
  }
  .title span{
    float:left;
    font-size:30/@r;
    color:#000;
  }
  .title i{
    float:right;
    border:1px solid #aaa;
    padding:0 10/@r;
    border-radius:8/@r;
    line-height:34/@r;
  }
  .type{
    padding:10/@r 0;
  }
  .type .left{
    float:left;
    border:1px solid #dab86c;
    border-radius:6/@r;
    color:#dab86c;
    line-height:34/@r;
  }
  .type .left span{
    display:inline-block;
    height:34/@r;
    padding:0 10/@r;
  }
  .type .left span:nth-child(1){
    background-color:#dab86c;
    color:#fff;
  }
  .type .right{
    float:right;
  }
  .type .right i{
    color:#f96972;
  }
  .type .right strong{
    color:#000;
  }

</style>
