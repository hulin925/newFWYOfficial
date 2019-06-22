<template>
  <div>
    <ul class="list">
      <li class="clearfix" v-for="item,index in data">
        <div class="title clearfix" @click.stop="PersonalTopics(item)">
          <div class="left">
            <img :src="item.faces" alt>
          </div>

          <div class="Grade">
            <img
              src="../../../../assets/img/lanV.png"
              alt
              v-if="item.cert_type!=1"
              class="GradeFirst"
            >
            <img src="../../../../assets/img/level.png" alt v-else class="GradeTwo">
          </div>

          <div class="center">
            <h2 :class="{GradeColor:item.cert_type != 1}">{{item.username}}</h2>
            <p>{{item.company}}</p>
            <p>{{item.province_cn}} {{item.city_cn}}</p>
          </div>
          <div class="right" @click.stop="Follows(item)">
            <span v-if="item.isguanzhu==0">+ 关注</span>
            <span v-else class="cancelFollow">
                      <i class="iconfont icon-gou"></i>
                      已关注
                    </span>
          </div>
        </div>
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
      }
    },
    created() {
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      this.initData();
    },
    methods: {
      initData() {
        if (!this.userInfo) {
          return;
        }
        let options = new FormData();
        options.append('uid', this.userInfo.uid);
        options.append('token', this.userInfo.token);
        this.$store.dispatch('PersonalGz', options)
          .then(data => {
            console.log(data)
            data.forEach(item=>{
              item.faces=item.weburl+item.face;
            })
            this.data = data;
          })
      }
    }


  }
</script>

<style scoped lang="less" type="text/less">
  @r: 30rem;


  .list li{
    margin-bottom:30px;
  }
  .list .title {
    height: 88 / @r;
    position: relative;
    cursor: pointer;
  }

  .title .left {
    float: left;
    width: 80px;
    height: 80px;
    background-image: url("../../../../assets/img/headerIcon.png");
    background-size: cover;
    border-radius: 50%;
    overflow: hidden;
  }

  .title .left img {
    width: 100%;
    height: 100%;
  }

  .center {
    float: left;
    color: #939393;
    margin-left: 20px;
  }

  .center h2 {
    font-size:20px;
    color: #000;
    margin-bottom: 4px;
  }

  .title .right {
    float: right;
    cursor: pointer;
  }

  .title .right span {
    display: block;
    border: 1px solid #ff8200;
    border-radius: 10 / @r;
    font-size: 28 / @r;
    color: #ff8200;
    text-align: center;
    line-height: 50 / @r;
    letter-spacing: 4 / @r;
    padding: 4 / @r 16 / @r;
  }

  .title .right .cancelFollow {
    border: 1px solid #b0b0b0;
    color: #b0b0b0;
  }

  .title .right .Advertisement {
    border: 1px solid #0ac1b2;
    color: #0ac1b2;
  }
  .Grade {
    position: absolute;
    left: 50px;
    top: 56px;
    width: 24px;
  }

  .Grade .GradeFirst {
    width: 100%;
  }

  .Grade .GradeTwo {
    width: 90%;
  }

  .list .GradeColor {
    color: #ff8200;
  }


</style>
