<template>
  <div>
    <section class="isPc">
      <ul class="list">
        <li>
          <div class="title clearfix" @click.stop="PersonalTopics(data)">
            <div class="left">
              <img :src="lidImg" alt="">
            </div>

            <div class="Grade">
              <img src="../../../assets/img/lanV.png" alt="" v-if="data.cert_type!=1" class="GradeFirst">
              <img src="../../../assets/img/level.png" alt="" v-else class="GradeTwo">
            </div>

            <div class="center">
              <h2 :class="{GradeColor:data.cert_type != 1}">{{data.username}}</h2>
              <p v-if="data.add_time!=0">{{data.add_time}}</p>
              <p v-else>{{data.company}}</p>
            </div>
            <div class="right" @click.stop="Follows(data)">
              <span v-if="data.isguanzhu==0">+ 关注 </span>
              <span v-else class="cancelFollow">
                    <i class="iconfont  icon-gou"></i>
                    已关注
                </span>
            </div>
          </div>
          <div class="brief clearfix">
            <!--<span>刑事</span>-->
            <!--<span>治安</span>-->
            <i>阅读 {{data.click}}</i>
            <i class="iconfont  icon-yuedu"></i>
          </div>
          <div class="topTitle">{{data.title}}</div>
          <div class="content" v-if="data.classify==2">
            <div v-html="data.content"></div>
          </div>
          <div class="content" v-if="data.classify==3">
            <div v-if="data.local==0">
              <video
                width="320" height="240" :poster="data.cover" controls="controls" webkit-playsinline="true"
                x5-video-player-type="h5" x5-video-player-fullscreen="true"
              >
                <source :src="data.videos" type="video/mp4">
              </video>
            </div>
            <div v-else-if="data.local==1">
              <video
                width="320" height="240" :poster="data.cover" controls="controls" webkit-playsinline="true"
                x5-video-player-type="h5"
              >
                <source :src="data.path" type="video/mp4">
              </video>
            </div>


          </div>
          <div class="content Article" v-if="data.classify==6">
            <div>{{data.content}}</div>
            <div class="clearfix">
              <div class="ImgIcon" v-for="v in data.thumbnail">
                <img v-lazy="v" alt="">
              </div>
            </div>
            <div class="statement">
              <p>免责声明：本文来自芯汇法务云客户端自媒体，不代表芯汇法务云的观点和立场。</p>
            </div>
          </div>
          <div class="bottom clearfix">
            <div @click.stop="Fabulous(data)" :class="{color:data.iszan == 1}">
              <span><i class="iconfont  icon-zan" :class="{color:data.iszan == 1}"></i></span>
              <span>点赞</span>
              <i>{{data.histort_reward_count}}</i>
            </div>
            <div @click.stop="Collection(data)" :class="{color:data.iscollection == 1}">
              <span><i class="iconfont  icon-shoucang"></i></span>
              <span>收藏</span>
            </div>
          </div>
        </li>
      </ul>

      <div class="newComment clearfix">
        <div class="writeComment clearfix">
          <div class="left">
            <img src="https://web.3fgj.com/imgVue/lawyer.png" alt="">
          </div>
          <div class="right">
            <textarea name="" id="" cols="30" rows="10" placeholder="发表你的精彩品论" v-model="commentData"></textarea>
            <span></span>
          </div>
        </div>
        <div class="Publish" @click.stop="CommentPass(data)">
          <span>发表</span>
        </div>
      </div>

      <ul class="userComment">
        <li class="clearfix" v-for="item,index in dataList" v-if="dataList.length">
          <div class="userHead">
            <img :src="weburl+item.face" alt="">
          </div>
          <div class="userInfo">
            <p>{{item.nickname}}</p>
            <p>{{item.content}}</p>
            <p>{{item.add_time*1000 | getAddTime}}</p>
          </div>
        </li>
        <li class="Product">
          <p>~ 亲 暂无更多评论~</p>
        </li>
      </ul>
    </section>


    <div class="showStart">
      <toast v-model="showStart" type="text" :time="1000">
        <div class="pointStart">
          <i></i>
        </div>
      </toast>
    </div>

    <div class=""></div>

  </div>
</template>

<script>
  // 引入mescroll的vue组件
  import {PopupPicker, Group, Toast} from 'vux'
  import MescrollVue from 'mescroll.js/mescroll.vue'

  export default {
    name: "lawyerFind",
    inject:['reload'],
    components: {
      MescrollVue,// 注册mescroll组件
      PopupPicker,//vux
      Group,//vux
      Toast,//vux
    },
    data() {
      return {
        commentData: '',//评论数据
        userInfo: {},
        id: '',//文章id
        lid: '',//律师
        classify: '',//文章类型
        tag: '',
        showStart: false,
        weburl: '',
        data: {},//初始数据
        lidImg: '',
        list: [],
        dataList: [] // 列表数据
      }
    },
    mounted() {

    },
    created() {
      this.lid = this.$route.query.lid;
      this.id = this.$route.query.id;
      this.classify = this.$route.query.classify;
      this.tag = this.$route.query.tag;
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));

      this.initFind();

    },
    methods: {
      Collection(item) {//收藏接口
        if (!this.userInfo) {
          this.$store.commit('showCloseOutPcBox');
          this.$message({
            message: '请先登录',
            type: 'warning',
            center: true
          })
          return;
        }
        let options = new FormData();
        options.append('uid', this.userInfo.uid);
        options.append('token', this.userInfo.token);
        options.append('type', this.classify);
        options.append('id', item.id);
        this.$store.dispatch('Collection', options)
          .then(data => {
            if (item.id == this.data.id && item.classify == this.data.classify) {
              this.data.iscollection = data.info;
              return this.data;
            }
            return this.data;
          })
      },
      CommentPass(now) {//评论接口，
        if (!this.userInfo) {
          this.$store.commit('showCloseOutPcBox');
          this.$message({
            message: '请先登录',
            type: 'warning',
            center: true
          })
          return;
        }
        if (!this.commentData) {
          this.$message({
            message: '请填写内容',
            type: 'warning',
            center: true
          });
          return;
        }
        let options = new FormData();
        if (this.userInfo) {
          options.append('uid', this.userInfo.uid);//1068有评论
          options.append('token', this.userInfo.token);
        }
        options.append('type', now.classify);
        options.append('toid', now.id);
        options.append('content', this.commentData);
        this.$store.dispatch('LawyerFindArticleComment', options)
          .then(data => {
            if(Number(data.code)==10101){
              // this.$router.push({name:"navPc"});
              localStorage.removeItem('userInfo');
              this.$message({
                message:'登录过期，请重新登录',
                type: 'warning',
                center: true
              })
              this.reload();
              this.$store.commit('showCloseOutPcBox');
              return;
            }

            this.initFind();
            this.commentData='';
          })


      },
      PersonalTopics(item) {//跳转个人律师专题页
        // this.$router.push({name: 'LawyerSpecialPc', query: {lid: item.uid}});
        let routeData=this.$router.resolve({
          name:'LawyerSpecialPc',
          query:{lid:item.uid}
        })
        window.open(routeData.href,"_blank");
        localStorage.setItem('LawyerId', item.uid);
      },
      GetQueryString(name) { //截取?后想要的数据 lawyerId
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
      },
      // mescroll组件初始化的回调,可获取到mescroll对象
      mescrollInit(mescroll) {
        this.mescroll = mescroll // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
      },
      initFind(page, mescroll) { //获取页面初始数据
        // this.$store.commit("showLoading");
        let options = new FormData();
        if (this.userInfo) {
          options.append('uid', this.userInfo.uid);
        }
        options.append('id', this.id);
        // options.append('tag', this.tag);
        options.append('classify', this.classify);
        options.append('page', 1);
        this.$store.dispatch('LawyerFindArticleDetail', options)
          .then(data => {
            document.title=data.title;

            data.videos = data.weburl + data.path;//拼接后的video
            data.cover = data.weburl + data.thumbnail;//拼接后的封面
            this.weburl = data.weburl;
            this.data = data;//初始数据
            this.lidImg = data.weburl + data.face;//拼接的头像
            this.dataList = data.list;
            if (data.classify == 6) { //获取app端图片
              let arr = JSON.parse(data.thumbnail);
              arr = arr.map(v => {
                return data.weburl + v
              })
              data.thumbnail = arr;
            }

            //图片截取
            var imgReg = /<img.*?(?:>|\/>)/gi;
            if (data.content) {
              let str = data.content;
              data.contents = str.replace(imgReg, '');
              let arr = data.content.match(imgReg);
              if (arr && arr.length) {
                arr = arr.map(item => {
                  let n = item.indexOf('"');
                  let m = item.lastIndexOf('"');
                  item = item.substring(n + 1, m);
                  return item.split(' ')[0].split('"')[0];
                });
                data.arr = arr;
              }
            }
            // this.$store.commit("hidenLoading");
          }, err => {
          }).catch((e) => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
        })
      },
      Follows(item) {//关注接口
        if (!this.userInfo) {
          this.$store.commit('showCloseOutPcBox');
          this.$message({
            message: '请先登录',
            type: 'warning',
            center: true
          })
          return;
        }
        let options = new FormData();
        options.append('uid', this.userInfo.uid);
        options.append('token', this.userInfo.token);
        options.append('lid', item.uid);
        this.$store.dispatch('followPc', options)
          .then(data => {
            if(Number(data.code)==10101){
              localStorage.removeItem('userInfo');
              this.$message({
                message:'登录过期，请重新登录',
                type: 'warning',
                center: true
              })
              // this.$router.push({name:"navPc"});
              this.reload();
              this.$store.commit('showCloseOutPcBox');
              return;
            }
            if (item.uid == this.data.uid) {
              this.data.isguanzhu = data.flag;
              return this.data;
            }
            return this.data;
          })
      },
      Fabulous(item) { //点赞接口
        //点赞接口
        if (!this.userInfo) {
          this.$store.commit('showCloseOutPcBox');
          this.$message({
            message: '请先登录',
            type: 'warning',
            center: true
          })
          return;
        }
        let options = new FormData();
        options.append('uid', this.userInfo.uid);
        options.append('token', this.userInfo.token);
        options.append("lid", item.uid);
        options.append("fid", item.id); //文章id
        options.append("type", item.classify); //文章类型
        this.$store.dispatch('FabulousPc', options)
          .then(data => {
            if(Number(data.code)==10101){
              localStorage.removeItem('userInfo');
              this.$message({
                message:'登录过期，请重新登录',
                type: 'warning',
                center: true
              })
              // this.$router.push({name:"navPc"});
              this.reload();
              this.$store.commit('showCloseOutPcBox');
              return;
            }
            if (data.flag == 1) {
              this.showStart = true;
            }
            if (item.id == this.data.id && item.classify == this.data.classify) {
              this.data.iszan = data.flag;
              this.data.histort_reward_count = data.zannum;
              return this.data;
            }
            return this.data;
          })
      },

    },

  }
</script>

<style scoped lang="less">
  @r: 30rem;

  .isPc {
    width: 700px;
    margin: 0 auto;
  }

  /*通过fixed固定mescroll的高度*/
  .mescroll {
    position: fixed;
    top: 0;
    bottom: 0;
    height: auto;
  }

  video {
    margin: 0 auto;
    width: 60%;
    display: block;
  }

  .topTitle {
    font-size: 36/@r;
    color: #000;
    line-height: 48/@r;
    padding-bottom: 15px;
  }

  section {
    padding-bottom: 40/@r;
  }

  .list li {
    padding: 32/@r 32/@r 0;
    overflow: hidden;
  }

  .list .title {
    height: 88/@r;
    position: relative;
  }

  .title .left {
    float: left;
    width: 88/@r;
    height: 88/@r;
    background-image: url("../../../assets/img/headerIcon.png");
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
    margin-left: 20/@r;
    line-height: 34/@r;
    font-size: 24/@r;
  }

  .center h2 {
    font-size: 32/@r;
    color: #000;
    line-height: 50/@r;
    margin-bottom: 4/@r;
  }

  .title .right {
    float: right;
    cursor: pointer;
  }

  .title .right span {
    display: block;
    border: 1px solid #FF8200;
    border-radius: 10/@r;
    font-size: 28/@r;
    color: #FF8200;
    text-align: center;
    line-height: 50/@r;
    letter-spacing: 4/@r;
    padding: 4/@r 16/@r;
  }

  .title .right .cancelFollow {
    border: 1px solid #b0b0b0;
    color: #b0b0b0;
  }

  .brief {
    margin-top: 16/@r;
    color: #878787;
  }

  .brief .icon-yuedu {
    margin-right: 12/@r;
    margin-top: -8/@r;
  }

  .brief span {
    float: left;
    padding: 0 15/@r;
    border: 1px solid #ddd;
    border-radius: 10/@r;
    text-align: center;
    line-height: 40/@r;
    margin-right: 20/@r;
    margin-bottom: 20/@r;
    color: #666666;
  }

  .brief span:last-child {
    margin: 0;
  }

  .brief i {
    float: right;
  }

  .content {
    font-size: 32/@r;
    color: #333;
  }

  .content div {
    line-height: 40/@r;
  }

  .Img {
    margin-top: 16/@r;
    width: 100%;
    position: relative;
  }

  .Img .ImgIcon {
    float: left;
    width: 31%;
    height: 100px;
    background-color: red;
    margin: 0 20/@r 20/@r 0;
  }

  .border {
    border-bottom: 1px solid #dddddd;
    margin-top: 30/@r;
  }

  .bottom {
    margin-top: 30/@r;
    /*display: flex;*/
    /*justify-content: space-between;*/
  }

  .bottom .color {
    color: #FF8200;
  }

  .bottom div {
    line-height: 88/@r;
    color: #666666;
    position: relative;
    float: right;
    margin-left: 60px;
    padding:10px 0;
  }


  .icon-zan {
    position: absolute;
    left: -55/@r;
    top: 10px;
    font-size: 60/@r;
    color: #878787;
  }

  .icon-shoucang {
    font-size: 36/@r;
    vertical-align: bottom;
  }

  .icon-pinglun {
    display: inline-block;
    vertical-align: bottom;
    font-size: 40/@r;
  }

  .icon-yuedu {
    display: inline-block;
    vertical-align: bottom;
    font-size: 40/@r;
  }

  .userComment {
    padding: 0 32/@r;
  }

  .userComment li {
    padding: 30/@r 0;
    border-bottom: 1px solid #eee;
    color: #666;
  }

  .userComment .userHead {
    float: left;
    width: 80/@r;
    height: 80/@r;
    background-image: url("../../../assets/img/headerIcon.png");
    background-size: cover;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 20/@r;
  }

  .userComment .userHead img {
    width: 100%;
    height: 100%;
  }

  .userComment .userInfo {
    float: right;
    width: 85%;
  }

  .userComment .userInfo p {
    line-height: 40/@r;
    padding: 8/@r 0;
  }

  .userComment .userInfo p:nth-child(2) {
    color: #000;
    font-size: 32/@r;
  }

  .userComment .userInfo p:nth-child(3) {
    font-size: 24/@r;
  }

  .Product {
    text-align: center;
    line-height: 100/@r;
  }

  .Article img {
    margin-bottom: 20/@r;
  }

  .openApp {
    position: fixed;
    bottom: 20/@r;
    left: 2%;
    background-color: #8c94ff;
    color: #fff;
    width: 96%;
    line-height: 80/@r;
    font-size: 32/@r;
    text-align: center;
    -webkit-border-radius: 30/@r;
    -moz-border-radius: 30/@r;
    border-radius: 30/@r;
  }

  .Grade {
    position: absolute;
    left: 46/@r;
    top: 54/@r;
    width: 34/@r;
  }

  .Grade .GradeFirst {
    width: 100%;
  }

  .Grade .GradeTwo {
    width: 90%;
  }

  .list .GradeColor {
    color: #FF8200;
  }

  .pointStart {
    width: 220/@r;
    height: 220/@r;
    overflow: hidden;
  }

  .pointStart i {
    display: block;
    width: 100%;
    height: 100%;
    background: url(../../../assets/img/pointStart.png) no-repeat;
    background-size: 2000% 100%;
    animation: moveHande .65s forwards 1 steps(19);
  }

  @keyframes moveHande {
    form {
      background-position-x: left;
    }
    to {
      background-position-x: right;
    }
  }

  .statement {
    padding-top: 20/@r;
    font-size: 24/@r;
    text-align: center;
    color: #878787;
  }

  .statement p {
    line-height: 40/@r;
  }

  .openApp {
    position: fixed;
    z-index: 99999;
    bottom: 20/@r;
    left: 2%;
    background-color: #8c94ff;
    color: #fff;
    width: 96%;
    line-height: 80/@r;
    font-size: 32/@r;
    text-align: center;
    -webkit-border-radius: 30/@r;
    -moz-border-radius: 30/@r;
    border-radius: 30/@r;
  }

  .bottom div {
    cursor: pointer;
  }

  .newComment {
    padding: 20px 0;
    border-bottom: 1px solid #ccc;
  }

  .writeComment .left {
    float: left;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
  }

  .writeComment .left img {
    width: 100%;
  }

  .writeComment .right {
    width: 90%;
    height: 120px;
    float: right;
    margin-right: 5px;
  }

  .writeComment .right textarea {
    width: 100%;
    height: 100%;
    padding: 10px 20px;
    border-color: #ddd;
    font-size: 14px;
  }

  .Publish {
    width: 80px;
    height: 30px;
    background-color: #e71844;
    color: #fff;
    text-align: center;
    line-height: 30px;
    border-radius: 5px;
    float: right;
    margin-top: 20px;
    cursor: pointer;
  }

  .Publish:hover {
    background-color: #c91138;
  }


</style>
