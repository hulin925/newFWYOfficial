<template>
  <div>
    <div class="headerBox">

      <div class="header clearfix">
        <div class="goBack">
          <i class="iconfont  icon-Back"></i>
        </div>
        <div class="center">
          <span>案源库</span>
        </div>
        <div class="search" @click.stop="search">
          <i class="iconfont icon-search3"></i>
        </div>
      </div>

      <popup v-model="show8" position="bottom" :show-mask="false" height="100%">
        <div class="box">
          <div>
            <span @click.stop="show8=false"><</span>
            <input type="text" ref="input" v-model="inputContent">
            <i @click.stop="searchBtn">点解</i>
          </div>
          <ul>
            <li></li>
          </ul>
        </div>

      </popup>

      <div class="navBar">
        <div class="navBarBox">
          <!--<span>智能排序</span>-->
          <popup-picker v-if="!switch6" placeholder="智能排序" :data="sort" v-model="value6"
                        style="display: inline-block;font-size:15px;" :columns="1"></popup-picker>
          <i class="iconfont icon-xiala"></i>
        </div>
        <div class="navBarBox">
          <!--<span>全国</span>-->
          <popup-picker v-if="!switch7" placeholder="全国" :data="region" v-model="value7"
                        style="display: inline-block;font-size:15px;" :columns="1" :show-name="true"></popup-picker>
          <i class="iconfont icon-xiala"></i>
        </div>
        <div class="navBarBox">
          <!--<span>筛选</span>-->
          <popup-picker v-if="!switch8" placeholder="筛选" :data="screen" v-model="value8"
                        style="display: inline-block;font-size:15px;" :columns="1" :show-name="true"></popup-picker>
          <i class="iconfont icon-xiala"></i>
        </div>
      </div>

    </div>

    <ul class="list" v-if="dataList.length">
      <li v-for="item,index in dataList" @click.stop="anYuanDetail(item)">
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
        <div class="Court clearfix">
          <div class="CourtContent">{{item.administer}}</div>
          <div class="CourtIcon">
            <i class="iconfont icon-heart-off"></i>
            <span>23</span>
          </div>
        </div>
        <div class="address">
          <span>{{item.bg_province}} {{item.bg_city}}</span>
        </div>
      </li>

    </ul>

    <!--<div>-->
    <!--<popup-picker title="时间" :inline-desc="`当前值[${formatDemoValue}]`"v-model="formatDemoValue" :data="[['01','02','03'],['11','12','13']]" :display-format="format"></popup-picker>-->
    <!--</div>-->

    <ul class="list" v-else>
      <li>暂无数据</li>
    </ul>

  </div>
</template>

<script>
  import {PopupPicker, Group, Popup} from "vux";

  export default {
    name: "anYuanKu",
    components: {
      PopupPicker,
      Group,
      Popup
    },
    data() {
      return {
        dataList: {},
        switch6: false,
        switch7: false,
        switch8: false,
        show8: false,
        value6: [],
        value7: [],
        value8: [],
        sort: [],//智能排序
        region: [],//地区
        screen: [],//类型
        inputContent:''
      }
    },
    created() {
      this.initData();
    },
    watch: {
      value6() {
        this.initData();
      },
      value7() {
        this.$nextTick(() => {
          this.initData();
        })
      },
      value8() {
        this.initData();
      }
    },
    methods: {
      searchBtn(){
        this.initData();
      },
      search() {
        this.show8 = true;
        this.$nextTick(()=>{
          this.$refs.input.focus();
        })

      },
      initData() {
        let options = new FormData();
        options.append('page', 1);
        if (this.value8[0]) {
          options.append('fid', this.value8[0]);
        }
        if (this.value7[0]) {
          options.append('bg_province', this.value7[0]);
        }
        options.append('price', '');
        options.append('sort', this.value6);
        options.append('keyword', this.inputContent);
        this.$store.dispatch('anYuan', options)
          .then(data => {
            data.region.forEach((item) => {
              return item.name = item.region_name;
            })
            this.sort = data.sort;
            this.region = data.region.map(item => {
              item.value = item.name + '';
              return item;
            });
            this.screen = data.industry.map(item => {
              item.value = item.id + '';
              return item;
            });
            console.log(data.list,666)
            this.dataList = data.list;
          })
      },
      anYuanDetail(item) {
        this.$router.push({name: 'anYuanDetail', query: {id: item.id}});
        console.log(item.id)
      },

    }

  }
</script>

<style scoped lang="less" type="text/less">
  @r: 30rem;

  .headerBox {
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
  }

  .navBar {
    display: flex;
    width: 100%;
    justify-content: space-around;
    border-bottom: 1px solid #e5e5e5;
    line-height: 70/@r;
    background-color: #fff;
    font-size: 32/@r;
  }

  .navBar .navBarBox {
    width: 33%;
    position: relative;
    text-align: center;
  }

  .navBar .navBarBox:before {
    position: absolute;
    content: '';
    top: 20/@r;
    right: 0;
    width: 1px;
    height: 30/@r;
    background-color: #d1d1d1;
  }

  .navBar .navBarBox:nth-child(3):before {
    width: 0;
  }

  .icon-xiala {
    color: #aaa;
  }

  .header {
    height: 80/@r;
    background-color: #000;
    padding: 0 10/@r;
    color: #fff;
  }

  .header .goBack {
    float: left;
    padding-top: 10/@r;
  }

  .header .center {
    float: left;
    font-size: 32/@r;
    line-height: 80/@r;
    margin-left: 230/@r;
  }

  .header .search {
    float: right;
    padding: 14/@r 20/@r 10/@r;
  }

  .icon-search3 {
    font-size: 36/@r;
  }

  .icon-Back {
    font-size: 42/@r;
    padding: 20/@r;
  }

  .list {
    padding: 160/@r 20/@r 100/@r;
    font-size: 24/@r;
    color: #aaa;
  }

  .list li {
    border-bottom: 1px solid #e5e5e5;
    padding: 20/@r 0;
  }

  .title strong {
    float: left;
    border: 1px solid #fa7b83;
    padding: 0 4/@r;
    line-height: 28/@r;
    border-radius: 4/@r;
    color: #fa7b83;
    margin: 8/@r 12/@r 0 0;
  }

  .title span {
    float: left;
    font-size: 30/@r;
    color: #000;
  }

  .title i {
    float: right;
    border: 1px solid #aaa;
    padding: 0 10/@r;
    border-radius: 8/@r;
    line-height: 34/@r;
  }

  .type {
    padding: 10/@r 0;
  }

  .type .left {
    float: left;
    border: 1px solid #dab86c;
    border-radius: 6/@r;
    color: #dab86c;
    line-height: 34/@r;
  }

  .type .left span {
    display: inline-block;
    height: 34/@r;
    padding: 0 10/@r;
  }

  .type .left span:nth-child(1) {
    background-color: #dab86c;
    color: #fff;
  }

  .type .right {
    float: right;
  }

  .type .right i {
    color: #f96972;
  }

  .type .right strong {
    color: #000;
  }

  .Court .CourtContent {
    float: left;
  }

  .Court .CourtIcon {
    float: right;
  }

  .CourtIcon .icon-heart-off {
    display: inline-block;
    font-size: 26/@r;
  }

  .box {
    width: 100%;
    height: 100%;
    position: relative;
  }

</style>
