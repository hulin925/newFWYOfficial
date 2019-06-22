<template>
  <div>
    <div class="wrap clearfix">
      <div class="left">
        <div class="top">
          <h1>
            <img :src="face" alt="">
          </h1>
          <p>法务云</p>
        </div>
        <ul class="bottom">
          <li v-for="item,index in personalDataPc" @click="change(item,index)" :class="{active:item.active}">{{item.name}}</li>
        </ul>
      </div>

      <div class="right">
        <router-view></router-view>
      </div>

    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  export default {
    name: "personalData",
    computed:mapGetters([
      'personalDataPc',
    ]),
    data() {
      return {
        dataInfo:{},
        face:''
      }
    },
    created(){
      this.dataInfo=JSON.parse(sessionStorage.getItem('userInfo'));
      console.log(this.dataInfo)
      if(this.dataInfo){
        this.face=this.dataInfo.weburl+this.dataInfo.face;
        console.log(this.face)
      }
    },
    methods: {
      change(item,index) {
        this.$store.commit('personalDataPc',index);
        this.$router.push({name:item.pushName})
      }
    }
  }
</script>

<style scoped>

  .wrap {
    width: 1000px;
    margin: 30px auto;
  }

  .left {
    width: 200px;
    float: left;
    text-align: center;
  }

  .left h1 {
    width: 100px;
    height: 100px;
    padding:5px;
    border: 1px solid #ddd;
    margin: 0 auto;
    border-radius: 50%;
    background-image: url("../../../assets/img/headerIcon.png");
    background-size: cover;
    overflow: hidden;
  }
  h1 img{
    width:100%;
  }

  .left p {
    padding-top: 10px;
    line-height: 30px;
  }

  .left .bottom {
    margin-top: 120px;
  }

  .left .bottom li {
    line-height: 30px;
    cursor: pointer;
    margin: 20px 0;
    position: relative;
  }

  .left .bottom li.active:before {
    position: absolute;
    content: "";
    top: 5px;
    left: 50px;
    width: 5px;
    height: 20px;
    background-color: red;
  }

  .right {
    float: right;
    width: 800px;
    border: 1px solid #ddd;
    padding: 40px;
  }


</style>
