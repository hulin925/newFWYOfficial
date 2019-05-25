<template>
  <div>
    <div class="header clearfix">
      <div class="goBack">
        <i class="iconfont  icon-Back"></i>
      </div>
      <div class="center">
        <span>案源详情</span>
      </div>
      <div class="search">
        <i class="iconfont icon-search3"></i>
      </div>
    </div>

    <ul class="list">
      <li>
        <div class="title clearfix">
          <strong>被</strong>
          <span>{{dataList.bg}}</span>
          <!--<i>免费案源</i>-->
        </div>
        <div class="type clearfix">
          <div class="left">
            <span>执行</span>
            <span>{{dataList.type_cn}}</span>
          </div>
          <div class="right">
            <span>标的: <i>{{dataList.price}}</i><strong>万元</strong></span>
          </div>
        </div>
        <div class="Court">
          <strong>管辖</strong>
          <span>{{dataList.administer}}</span>
        </div>
        <div class="address">
          <strong>被告地址</strong>
          <span>{{dataList.bg_province}} {{dataList.bg_city}}</span>
        </div>
      </li>
    </ul>

    <div class="condition">
      <div>
        <span>保护隐私</span>
      </div>
      <div>
        <span>真实案源</span>
      </div>
      <div>
        <span>免费来源</span>
      </div>
    </div>

    <div class="introduction">
      <div class="caseList">
        <h1>案情简介</h1>
        <div class="caseContent">

        </div>
      </div>
      <div class="Explain"></div>
    </div>

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
        options.append('id',1);
        this.$store.dispatch('anYuanDetail',options)
          .then(data=>{
            console.log(data)
            this.dataList=data;
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
    margin-left:220/@r;
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
    padding:0 20/@r;
    font-size:24/@r;
    color:#aaa;
  }
  .list li{
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
  .Court strong{
    border:1px solid red;
    color:red;
    padding:0 6/@r;
    border-radius: 4/@r;
    line-height:26/@r;
    font-size:24/@r;
    display: inline-block;
  }
  .address,.title,.Court{
    padding:5/@r 0;
  }
  .address strong{
    border:1px solid #aaa;
    color:#aaa;
    padding:0 6/@r;
    border-radius: 4/@r;
    line-height:26/@r;
    font-size:24/@r;
    display: inline-block;
  }
  .condition{
    display:flex;
    background-color: #e3e3e3;
    justify-content:space-around;
    color:#5b5b5b;
  }
  .introduction{
    padding:20/@r;
  }
  .caseList h1{
    font-size:30/@r;
    border-left:2px solid #ccc;
  }
</style>
