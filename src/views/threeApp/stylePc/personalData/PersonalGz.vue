<template>
  <div>
    <ul v-if="noData" class="list">
      <li class="nodata">
        <img src="../../../../assets/img/noDataPc.png" alt="">
        <span>您暂未关注任何律师！</span>
      </li>
    </ul>
    <ul class="list" v-else>
      <li class="clearfix" v-for="item,index in data" @click.stop="JumpPersonal(item)">
        <div class="title clearfix">
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
                      <!--<i class="iconfont icon-gou"></i>-->
                      取消关注
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
        noData:false,
      }
    },
    created() {
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      this.initData();
    },
    methods: {
      initData() {
        if (!this.userInfo) {
          this.noData=true;
          return;
        }
        let options = new FormData();
        options.append('uid', this.userInfo.uid);
        options.append('token', this.userInfo.token);
        this.$store.dispatch('PersonalGz', options)
          .then(data => {
            console.log(data)
            if(data.code==10001){
              this.noData=true;
              return;
            }else if(data.code==10101){
              this.noData=true;
              this.$message({
                message:'请重新登录，登录过期',
                type:'warning',
                center:true
              })
              return;
            }
            data.forEach(item=>{
              item.faces=item.weburl+item.face;
            })
            this.data = data;
          })
      },
      JumpPersonal(item){
        //跳转个人律师专题页
        // this.$router.push({name: "LawyerSpecial", query: {lid: item.uid}})
        let routeData=this.$router.resolve({
          name:'LawyerSpecialPc',
          query:{lid:item.lid}
        })
        window.open(routeData.href,"_blank");

        sessionStorage.setItem("LawyerId", item.lid);
      },
      Follows(item) {//关注接口
        if(!this.userInfo){
          this.$message({
            message:'请先登录',
            type: 'warning',
            center: true
          });
          return;
        }
        let options = new FormData();
        options.append('uid', this.userInfo.uid);
        options.append('token', this.userInfo.token);
        options.append('lid', item.lid);
        this.$store.dispatch('follows', options)
          .then(data => {
            console.log(data)
            this.initData();
            // this.data = this.data.map(obj => {
            //   if (item.lid == obj.lid) {
            //     obj.isguanzhu = data.flag;
            //     return obj;
            //   }
            //   return obj;
            // })
          })
      },

    }


  }
</script>

<style scoped lang="less" type="text/less">
  @r: 30rem;


  .list li{
    margin-bottom:30px;
    border-bottom:1px solid #ddd;
    padding-bottom:20px;
  }
  .list .title {
    height: 88 / @r;
    position: relative;
    cursor: pointer;
  }

  .title .left {
    float: left;
    width: 60px;
    height: 60px;
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
  .center p{
    line-height:24px;
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
    left: 35px;
    top: 40px;
    width: 20px;
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

  .nodata img{
    display:block;
    margin:0 auto;
    width:60%;
  }
  .nodata{
    font-size:18px;
    text-align:center;
    line-height:80px;
    color:#a2a2a2;
  }
  .list .nodata{
    border:0;
  }


</style>
