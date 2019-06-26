<template>
  <div>
    <ul v-if="noData">
      <li class="nodata">
        <img src="../../../../assets/img/noDataPc.png" alt="">
        <span>您暂未收藏相关文章！</span>
      </li>
    </ul>
    <ul v-else>
      <!--长文章-->
      <li class="clearfix" v-for="item,index in longArticle" @click.stop="JumpDetails(item)">
        <div class="left">
          <img :src="item.srcData" alt="">
        </div>
        <div class="right">
          <h1>{{item.title}}</h1>
          <p>
            <span>评论 {{item.history_comment_count}}</span>
            <span>阅读 {{item.histort_reward_count}}</span>
            <span>发布于 {{item.add_time*1000 | getAddTime}}</span>
          </p>
        </div>
        <div class="close" @click.stop="cancellCollection(item,'content_id')">×</div>
      </li>
      <!--短文章-->
      <li class="clearfix" v-for="item,index in shortArticle" @click.stop="JumpDetail(item)">
        <div class="left">
          <img :src="item.shortImg" alt="">
        </div>
        <div class="right">
          <h1>{{item.content}}</h1>
          <p>
            <span>评论 {{item.history_comment_count}}</span>
            <span>阅读 {{item.histort_reward_count}}</span>
            <span>发布于 {{item.add_time*1000 | getAddTime}}</span>
          </p>
        </div>
        <div class="close" @click.stop="cancellCollection(item,'article_id')">×</div>
      </li>
      <!--视频-->
      <li class="clearfix" v-for="item,index in video" @click.stop="JumpDetailV(item)">
        <div class="left">
          <video controls="controls">
            <source :src="item.videos" type="video/mp4">
          </video>
        </div>
        <div class="right">
          <h1>{{item.title}}</h1>
          <p>
            <span>评论 {{item.history_comment_count}}</span>
            <span>阅读 {{item.histort_reward_count}}</span>
            <span>发布于 {{item.add_time*1000 | getAddTime}}</span>
          </p>
        </div>
        <div class="close" @click.stop="cancellCollection(item,'video_id')">×</div>
      </li>
      <!--法条-->
      <li v-for="item,index in law" @click.stop="JumpDetailLawyer(item)">
        <h1>{{item.title}}</h1>
        <p>
          <span>{{item.section}}</span>
          <span>发布于 {{item.add_time*1000 | getAddTime}}</span>
        </p>
        <div class="close" @click.stop="cancellCollection(item,'law_id')">×</div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "PersonalCollection",
    data(){
      return{
        userInfo: {},
        data: [],
        longArticle:[],
        shortArticle:[],
        law:[],
        noData:false,
        video:[],
      }
    },
    created(){
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      this.initData();
    },
    methods:{
      JumpDetailLawyer(item){
        let routeData = this.$router.resolve({
          path: "/LawyerFindLawDetailsPc",
          query: {id: item.id}
        });
        window.open(routeData.href, "_blank");
      },
      JumpDetailV(item){//跳转详情3
        let routeData = this.$router.resolve({
          path: "/LawyerFindArticleDetailPc",
          query: {id: item.id, lid: item.uid, classify:3}
        });
        window.open(routeData.href, "_blank");
      },
      JumpDetails(item){//跳转详情2
        let routeData = this.$router.resolve({
          path: "/LawyerFindArticleDetailPc",
          query: {id: item.id, lid: item.uid, classify:2}
        });
        window.open(routeData.href, "_blank");
      },
      JumpDetail(item){//跳转详情6
        let routeData = this.$router.resolve({
          path: "/LawyerFindArticleDetailPc",
          query: {id: item.id, lid: item.uid, classify:6}
        });
        window.open(routeData.href, "_blank");
      },
      initData() {
        if (!this.userInfo) {
          return;
        }
        let options = new FormData();
        options.append('uid', this.userInfo.uid);
        options.append('token', this.userInfo.token);
        this.$store.dispatch('PersonalCollection', options)
          .then(data => {
            if(data.code==10001){
              this.noData=true;
              return;
            }
            data.video.forEach(item=>{
              item.videos=item.weburl+item.path;
            })
            this.video=data.video;
            data.long_article.forEach(item=>{
              var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
              if(item.content.match(srcReg)){
                item.srcData=item.content.match(srcReg)[1];
              }
            });
            this.longArticle = data.long_article;
            data.short_article.forEach(item=>{
              item.shortImg=item.weburl+item.thumbnail;
            })
            this.shortArticle = data.short_article;
            this.law = data.law;

          })
      },
      cancellCollection(item,type) {//删除长文章收藏
        if (!this.userInfo) {
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
        if(type=='content_id'){
          options.append('content_id', item.id);
        }else if(type=='article_id'){
          options.append('article_id', item.id);
        }else if(type=='video_id'){
          options.append('video_id', item.id);
        }else if(type=='law_id'){
          options.append('law_id', item.id);
        }
        this.$store.dispatch('cancellCollection', options)
          .then(data => {
            this.initData();
          })
      },


    }

  }
</script>

<style scoped>

  ul li{
    margin-bottom:30px;
    position:relative;
    cursor: pointer;
  }
  .close{
    position:absolute;
    right:0;
    top:0;
    font-size:30px;
    padding:0 20px;
    cursor:pointer;
    color:#ccc;
  }
  .left{
    width:200px;
    height:120px;
    float:left;
    margin-right:0px;
    border:1px solid #ddd;
    background-image: url("../../../../assets/img/headerIcon.png");
    background-size: cover;
    overflow: hidden;
  }
  .left video{
    width:100%;
    height:100%;
  }
  .left img{
    width:100%;
    height:100%;
  }
  .right{
    width:500px;
    float:right;
  }
  h1{
    width:90%;
    height:70px;
    font-size:20px;
    text-overflow:ellipsis;
    overflow:hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    word-break: break-all;
  }
  .right span{
    color:#a2a2a2;
    margin-right:20px;
    line-height:30px;
    display: inline-block;
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
  }
  h2{
    line-height:40px;
    font-size:20px;
  }


</style>
