<template>
  <div class="isPc">
    <div class="noneData" v-if="noneData">
      <img src="../../../assets/img/follow.png" alt>
      <p>暂无相关数据！</p>
    </div>

    <section id="contain" ref="contain" v-else>
      <ul class="list">
        <!--v-loading="isElLoading" element-loading-text="拼命加载中"-->
        <!--element-loading-spinner="el-icon-loading"-->
        <!--element-loading-background="transparent"-->
        <!--style="min-height:800px;"-->
        <li v-for="item,index in dataList">
          <div v-if="item.pic">
            <div class="title clearfix">
              <div class="left">
                <img :src="item.pic[0]" alt>
              </div>
              <div class="center">
                <h2>{{item.advtitle}}</h2>
              </div>
              <div class="right">
                <span class="Advertisement">广 告</span>
              </div>
            </div>
            <div class="AdvertisementContent" @click.stop="pictureJump(item)">
              <img :src="item.pic[0]" alt>
            </div>
          </div>
          <div v-else>
            <div class="title clearfix" @click.stop="PersonalTopics(item)">
              <div class="left">
                <img :src="item.faces" alt>
              </div>

              <div class="Grade">
                <img
                  src="../../../assets/img/lanV.png"
                  alt
                  v-if="item.cert_type!=1"
                  class="GradeFirst"
                >
                <img src="../../../assets/img/level.png" alt v-else class="GradeTwo">
              </div>

              <div class="center">
                <h2 :class="{GradeColor:item.cert_type != 1}">{{item.username}}</h2>
                <p v-if="item.add_time!=0">{{item.add_time}}</p>
                <p v-else>{{item.company}}</p>
              </div>
              <div class="right" @click.stop="Follows(item)">
                <span v-if="item.isguanzhu==0">+ 关注</span>
                <span v-else class="cancelFollow">
                      <i class="iconfont icon-gou"></i>
                      已关注
                    </span>
              </div>
            </div>
            <div class="topTitle" @click.stop="JumpDetail(item)">{{item.title}}</div>
            <!--<div class="brief clearfix">-->
            <!--<span>刑事</span>-->
            <!--<span>治安</span>-->
            <!--</div>-->
            <div v-if="item.classify==2" @click.stop="JumpDetail(item)">
              <div class="content" ref="contentss">
                <div v-html="item.content"></div>
              </div>
              <div class="Img clearfix" :style="{width:item.num==4?'80%':'100%'}">
                <div class="ImgIcon" v-for="v,index in item.arr" v-if="item.num>1&&item.num!=4">
                  <div>
                    <img v-lazy="v" alt>
                  </div>
                </div>

                <div class="ImgIcon" v-for="v,index in item.arr" v-if="item.num==4">
                  <div>
                    <img v-lazy="v" alt>
                  </div>
                </div>

                <div class="firstImg" v-if="item.num==1">
                  <div>
                    <img v-lazy="item.arr[0]" alt>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="item.classify==6" @click.stop="JumpDetail(item)">
              <div class="content">
                <div v-html="item.content"></div>
              </div>
              <div class="Img clearfix" :style="{width:item.AndroidNumber==4?'80%':'100%'}">
                <div
                  class="ImgIcon"
                  v-for="v,index in item.thumbnail"
                  v-if="item.AndroidNumber>1&&item.AndroidNumber!=4"
                >
                  <div>
                    <img v-lazy="v" alt>
                  </div>
                </div>

                <div
                  class="ImgIcon"
                  v-for="v,index in item.thumbnail"
                  v-if="item.AndroidNumber==4"
                >
                  <div>
                    <img v-lazy="v" alt>
                  </div>
                </div>

                <div class="firstImg" v-if="item.AndroidNumber==1">
                  <div>
                    <img v-lazy="item.thumbnail[0]" alt>
                  </div>
                </div>
              </div>
            </div>
            <div class="Img clearfix" v-if="item.classify==3">
              <div v-if="item.local==0">
                <video :poster="item.cover" controls="controls">
                  <source :src="item.videos" type="video/mp4">
                </video>
              </div>
              <div v-else-if="item.local==1">
                <!--//width="320" height="240"-->
                <video :poster="item.cover" controls="controls">
                  <source :src="item.path" type="video/mp4">
                </video>
              </div>
            </div>

            <div class="bottom">
              <div @click.stop="JumpDetail(item)">
                <i class="iconfont icon-yuedu"></i>
                <span>阅读</span>
                <i>{{item.click =''?'0':item.click?item.click:'0'}}</i>
              </div>
              <!--//item.id,item.classify,item.isguanzhu-->
              <div @click.stop="JumpDetail(item)">
                <i class="iconfont icon-pinglun1"></i>
                <span>评论</span>
                <i>{{item.history_comment_count}}</i>
              </div>
              <div @click.stop="Fabulous(item)" :class="{color:item.iszan == 1}">
                <span>
                      <i class="iconfont icon-zan" :class="{color:item.iszan == 1}"></i>
                    </span>
                <span>点赞</span>
                <i>{{item.histort_reward_count}}</i>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <p v-show="isLoading && dataList.length && dataList.length < total" style="height: 100px;text-align:center">
        <img
          class="d2-home__loading"
          src="https://hly.1000da.com.cn/assets/images/loading-spinner.svg"
          alt="loading"
        >加载中
      </p>
      <p v-show="!isLoading && dataList.length && dataList.length >= total" class="dataNone">没有更多数据了...</p>
      <p v-show="!dataList.length" class="dataNone">暂无数据...</p>
    </section>

    <div class="showStart">
      <toast v-model="showStart" type="text" :time="1000">
        <div class="pointStart">
          <i></i>
        </div>
      </toast>
    </div>
    <!--<oneImg :value="isOff" :data="arrImg" @setShow="isOff=false"></oneImg>-->

    <div class="goTop" v-show="showTop" @click.stop="goTop">
      <svg-icon icon-class="goTop"></svg-icon>
    </div>
  </div>
</template>

<script>
  import {PopupPicker, Group, Toast} from "vux";
  import {mapGetters} from "vuex";
  import svgIcon from "@/components/SvgIcon";
  // import oneImg from '@/components/Img.vue'
  export default {
    inject:['reload'],
    props: {
      val: ""
    },
    name: "lawyerFind",
    components: {
      svgIcon,
      PopupPicker, //vux
      Group, //vux
      Toast //vux
      // oneImg
    },
    data() {
      return {
        userInfo: {},
        fatiao: "",
        navId: "", //nav
        navType: "", //导航
        AdvertisingData: [], //广告
        showStart: false, //点赞
        ImgPass: {}, //传图片对象
        isOff: false,
        isLoading: false,
        noneData: false,
        lid: "",
        isNewLoading: true,
        dataList: [],
        showTop: false,
        total: 0,
        page: 1,
        // isElLoading:false
      };
    },
    computed: Object.assign(mapGetters(["arrImg"]), {}),
    watch: {
      page(){
        let randomData = Math.floor(10 * Math.random());
        for (let i = 0; i < this.AdvertisingData.length; i++) {
          if (this.page == i + 1) {
            let AdvertisingData = this.AdvertisingData[i];
            if (this.page == 1 && randomData + (i * 9) == 0) {
              this.dataList.splice(randomData + (i * 9) + 1, 0, AdvertisingData)
            } else {
              this.dataList.splice(randomData + (i * 9), 0, AdvertisingData)
            }
          }
        }
      },
      val(val) {
        this.page = 1;
        this.$nextTick(() => {
          if (this.$refs.contain) {
            this.$refs.contain.scrollTop = 0;
          }
        })
        this.initData()
          .then(
            data => {
              if (Number(data.code) == 10001) {
                //判定数据是否存在,显示关注按钮
                this.noneData = true;
                this.isLoading = false;
              } else {
                this.noneData = false;
              }
              if (data.total) {
                this.total = data.total;
              }
              var data = data.list;
              // this.total =

              this.$nextTick(() => {
                //视频处理
                var videos = document.getElementsByTagName("video");
                for (var i = videos.length - 1; i >= 0; i--) {
                  (function () {
                    var p = i;
                    videos[p].addEventListener("play", function () {
                      pauseAll(p);
                    });
                  })();
                }

                function pauseAll(index) {
                  for (var j = videos.length - 1; j >= 0; j--) {
                    if (j != index) videos[j].pause();
                  }
                }
              });
              var weburl = data[0].weburl;
              //图片截取
              var imgReg = /<img.*?(?:>|\/>)/gi;
              var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;

              data.forEach(v => {
                if (!v.thumbnail) {
                  v.thumbnail = [];
                }
                //拼接链接图片和视频
                v.faces = v.weburl + v.face;
                if (v.classify == 3) {
                  v.cover = v.weburl + v.thumbnail;
                  v.videos = v.weburl + v.path;
                }
                if (v.classify == 6 && v.thumbnail.length) {
                  if (v.thumbnail instanceof Array) {
                    let arr = v.thumbnail;
                    arr = arr.map(v => {
                      return weburl + v;
                    });
                    v.thumbnail = arr;
                  } else {
                    let arr = JSON.parse(v.thumbnail);
                    arr = arr.map(v => {
                      return weburl + v;
                    });
                    v.thumbnail = arr;
                  }
                  v.AndroidNumber = v.thumbnail.length;
                }
                if (v.classify == 2) {
                  let str = v.content;
                  v.content = str.replace(imgReg, "");
                  let arr = str.match(imgReg);
                  if (arr && arr.length) {
                    arr = arr.map(item => {
                      let n = item.indexOf('"');
                      let m = item.lastIndexOf('"');
                      item = item.substring(n + 1, m);
                      return item.split(" ")[0].split('"')[0];
                    });
                    //截取大于6张的图片
                    if (arr.length > 5) {
                      arr = arr.slice(0, 6);
                    } else {
                      arr;
                    }
                    v.arr = arr;
                    v.num = arr.length;
                  }

                  if (v.content) {
                    v.content = v.content.replace(/<(?!img).*?>/g, "");
                    // v.content=v.content.replace(/<[^<]+?>/g);
                  }
                }
              });
              this.dataList = data;
              // this.isElLoading = false;
              this.$store.commit("hidenLoading");
            },
            err => {
              // this.isElLoading = false;
            }
          )
          .catch(e => {
          });
      }
    },
    created() {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
      this.Advertisement(); //广告接口
      this.initData()
        .then(
          data => {
            if (Number(data.code) == 10001) {
              this.isLoading = false;
              //判定数据是否存在,显示关注按钮
              this.noneData = true;
            } else {
              this.noneData = false;
            }
            if (data.total) {
              this.total = data.total;
            }

            var data = data.list;

            this.$nextTick(() => {
              //视频处理
              var videos = document.getElementsByTagName("video");
              for (var i = videos.length - 1; i >= 0; i--) {
                (function () {
                  var p = i;
                  videos[p].addEventListener("play", function () {
                    pauseAll(p);
                  });
                })();
              }

              function pauseAll(index) {
                for (var j = videos.length - 1; j >= 0; j--) {
                  if (j != index) videos[j].pause();
                }
              }
            });
            var weburl = data[0].weburl;
            //图片截取
            var imgReg = /<img.*?(?:>|\/>)/gi;
            var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;

            data.forEach(v => {
              if (!v.thumbnail) {
                v.thumbnail = [];
              }
              //拼接链接图片和视频
              v.faces = v.weburl + v.face;
              if (v.classify == 3) {
                v.cover = v.weburl + v.thumbnail;
                v.videos = v.weburl + v.path;
              }
              if (v.classify == 6 && v.thumbnail.length) {
                if (v.thumbnail instanceof Array) {
                  let arr = v.thumbnail;
                  arr = arr.map(v => {
                    return weburl + v;
                  });
                  v.thumbnail = arr;
                } else {
                  let arr = JSON.parse(v.thumbnail);
                  arr = arr.map(v => {
                    return weburl + v;
                  });
                  v.thumbnail = arr;
                }
                v.AndroidNumber = v.thumbnail.length;
              }
              if (v.classify == 2) {
                let str = v.content;
                v.content = str.replace(imgReg, "");
                let arr = str.match(imgReg);
                if (arr && arr.length) {
                  arr = arr.map(item => {
                    let n = item.indexOf('"');
                    let m = item.lastIndexOf('"');
                    item = item.substring(n + 1, m);
                    return item.split(" ")[0].split('"')[0];
                  });
                  //截取大于6张的图片
                  if (arr.length > 5) {
                    arr = arr.slice(0, 6);
                  } else {
                    arr;
                  }
                  v.arr = arr;
                  v.num = arr.length;
                }

                if (v.content) {
                  v.content = v.content.replace(/<(?!img).*?>/g, "");
                  // v.content=v.content.replace(/<[^<]+?>/g);
                }
              }
            });
            this.dataList = data;
            // this.isElLoading = false;
            this.$store.commit("hidenLoading");
          },
          err => {
            // this.isElLoading = false;
          }
        )
        .catch(e => {
        });
    },
    mounted() {
      var _this = this;
      var viewH;
      var contentH;
      var scrollTop;
      // this.$nextTick(() => {
      window.addEventListener("scroll", function () {
        _this.$nextTick(() => {
          if (_this.$refs.contain) {
            contentH = _this.$refs.contain.clientHeight; //内容高度
          }
          viewH = document.documentElement.clientHeight; //可见高度
          scrollTop = document.documentElement.scrollTop; //滚动高度
        })

        if (scrollTop / (contentH - viewH) >= 0.95) { //到达底部100px时,加载新内容
          if (!_this.isLoading && _this.isNewLoading) {
            _this.isLoading = true;
            _this.page++;
            _this.initData()
              .then(
                data => {
                  if (Number(data.code) == 10001) {
                    //判定数据是否存在,显示关注按钮
                    _this.noneData = true;
                  } else {
                    _this.noneData = false;
                  }

                  // console.log(data)
                  if (data.total) {
                    _this.total = data.total;
                  }
                  var data = data.list;
                  _this.$nextTick(() => {
                    //视频处理
                    var videos = document.getElementsByTagName("video");
                    for (var i = videos.length - 1; i >= 0; i--) {
                      (function () {
                        var p = i;
                        videos[p].addEventListener("play", function () {
                          pauseAll(p);
                        });
                      })();
                    }

                    function pauseAll(index) {
                      for (var j = videos.length - 1; j >= 0; j--) {
                        if (j != index) videos[j].pause();
                      }
                    }
                  });
                  var weburl = data[0].weburl;
                  //图片截取
                  var imgReg = /<img.*?(?:>|\/>)/gi;
                  var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;

                  data.forEach(v => {
                    if (!v.thumbnail) {
                      v.thumbnail = [];
                    }
                    //拼接链接图片和视频
                    v.faces = v.weburl + v.face;
                    if (v.classify == 3) {
                      v.cover = v.weburl + v.thumbnail;
                      v.videos = v.weburl + v.path;
                    }
                    if (v.classify == 6 && v.thumbnail.length) {
                      if (v.thumbnail instanceof Array) {
                        let arr = v.thumbnail;
                        arr = arr.map(v => {
                          return weburl + v;
                        });
                        v.thumbnail = arr;
                      } else {
                        let arr = JSON.parse(v.thumbnail);
                        arr = arr.map(v => {
                          return weburl + v;
                        });
                        v.thumbnail = arr;
                      }
                      v.AndroidNumber = v.thumbnail.length;
                    }
                    if (v.classify == 2) {
                      let str = v.content;
                      v.content = str.replace(imgReg, "");
                      let arr = str.match(imgReg);
                      if (arr && arr.length) {
                        arr = arr.map(item => {
                          let n = item.indexOf('"');
                          let m = item.lastIndexOf('"');
                          item = item.substring(n + 1, m);
                          return item.split(" ")[0].split('"')[0];
                        });
                        //截取大于6张的图片
                        if (arr.length > 5) {
                          arr = arr.slice(0, 6);
                        } else {
                          arr;
                        }
                        v.arr = arr;
                        v.num = arr.length;
                      }
                      if (v.content) {
                        v.content = v.content.replace(/<(?!img).*?>/g, "");
                        // v.content=v.content.replace(/<[^<]+?>/g);
                      }
                    }
                  });
                  _this.dataList = _this.dataList.concat(data);
                  _this.$nextTick(() => {
                    _this.isLoading = false;
                  })
                  // _this.isElLoading = false;
                  this.$store.commit("hidenLoading");
                },
                err => {
                  _this.isLoading = false;
                  _this.isNewLoading = false;
                  // _this.isElLoading = false;
                }
              )
              .catch(e => {
              });

          }

        }


      })
      // });
    },
    methods: {
      //返回顶部
      goTop() {
        this.$refs.contain.scrollTop = 0;
      },
      pictureJump(item) {
        //广告跳转对接
        window.open(item.outside_link,'_blank');
        // window.location.href = item.outside_link;
      },
      Advertisement() {
        //广告接口
        let options = new FormData();
        options.append("flag", "find");
        this.$store.dispatch("Advertisement", options).then(data => {
          this.AdvertisingData = data;
        });
      },
      GetQueryString(name) {
        //截取?后想要的数据 lawyerId
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
      },
      PersonalTopics(item) {
        //跳转个人律师专题页
        // this.$router.push({name: "LawyerSpecial", query: {lid: item.uid}})
        let routeData=this.$router.resolve({
          name:'LawyerSpecialPc',
          query:{lid:item.uid}
        })
        window.open(routeData.href,"_blank");

        localStorage.setItem("LawyerId", item.uid);
      },
      JumpDetail(obj) {
        //跳转律师详情页
        let routeData = this.$router.resolve({
          path: "/LawyerFindArticleDetailPc",
          query: {id: obj.id, lid: obj.uid, classify: obj.classify, tag: this.val.tag}
        });
        window.open(routeData.href, "_blank");
      },
      // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
      initData() {
        // this.dataList = [];
        // this.isElLoading = true;
        //获取页面初始数据
        //   this.$store.commit("showLoading");
        let options = new FormData();
        if (this.userInfo) {
          options.append('uid', this.userInfo.uid);
          options.append('token', this.userInfo.token);
        }
        options.append("id", this.val.id);
        options.append("tag", this.val.tag);
        options.append("page", this.page);
        // options.append("uid", 1068);
        return this.$store
          .dispatch("LawyerFindRecommend", options)
      },
      Fabulous(item) {
        //点赞接口
        if(!this.userInfo){
          this.$store.commit('showCloseOutPcBox');
          this.$message({
            message:'请先登录',
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
            // this.$router.push({name: "LawyerSpecial", query: {lid: item.uid}})
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
            this.dataList = this.dataList.map(obj => {
              if (item.id == obj.id && item.classify == obj.classify) {
                obj.iszan = data.flag;
                obj.histort_reward_count = data.zannum;
                return obj;
              }
              return obj;
            })
          })
      },
      Follows(item) {//关注接口
        if(!this.userInfo){
          this.$store.commit('showCloseOutPcBox');
          // this.$store.commit('showCloseOutPc');
          this.$message({
            message:'请先登录',
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
            this.dataList = this.dataList.map(obj => {
              if (item.uid == obj.uid) {
                obj.isguanzhu = data.flag;
                return obj;
              }
              return obj;
            })
          })
      }

    }
  };
</script>

<style scoped lang="less" type="text/less">
  @r: 30rem;

  #contain {
    width: 700px;
    margin: 0 auto;
  }

  .d2-home__loading {
    height: 22px;
    width: 22px;
    margin-bottom: 10px;
    -webkit-animation: run 1s linear 0s infinite;
  }

  section > .goTop {
    position: fixed;
    bottom: 60px;
    right: 60px;
    width: 40px;
    height: 40px;
    cursor: pointer;
  }

  section > .goTop > svg {
    display: block;
    width: 100%;
    height: 100%;
    color: #fff;
  }

  .isPc {
    width: 700px;
    /*overflow: hidden;*/
    margin: 0 auto;
  }

  .isPc .ImgIcon {
    width: 160px;
    height: 160px;
    padding: 10px;
  }

  .isPc .Img {
    width: 60%;
  }

  .isPc .firstImg {
    width: 60%;
    /*height:200px;*/
  }

  .icon-gou {
    font-size: 20 / @r;
    color: #000;
  }

  .topTitle {
    font-size: 36 / @r;
    color: #000;
    line-height: 48 / @r;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 12 / @r 0 6 / @r;
  }

  .list li {
    padding: 32 / @r 32 / @r 0;
    border-bottom: 20 / @r solid #eee;
  }

  .list .title {
    height: 88 / @r;
    position: relative;
    cursor: pointer;
  }

  .title .left {
    float: left;
    width: 80 / @r;
    height: 80 / @r;
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
    margin-left: 20 / @r;
    line-height: 34 / @r;
    font-size: 24 / @r;
  }

  .center h2 {
    font-size: 30 / @r;
    color: #000;
    height: 44 / @r;
    line-height: 44 / @r;
    margin-bottom: 4 / @r;
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

  .brief {
    margin-top: 16 / @r;
  }

  .brief span {
    float: left;
    padding: 0 15 / @r;
    border: 1px solid #dddddd;
    border-radius: 10 / @r;
    text-align: center;
    line-heihgt: 40 / @r;
    margin-right: 20 / @r;
    color: #666666;
  }

  .brief span:last-child {
    margin: 0;
  }

  .content {
    font-size: 32 / @r !important;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    line-height: 48 / @r;
    color: #333;
  }
  .content:hover{
    cursor:pointer;
  }

  .content div {
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    -webkit-text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
  }

  .Img {
    margin: 16 / @r 0;
    width: 100%;
    height: 100%;
    position: relative;
  }

  .Img video {
    width: 100%;
    display: block;
    margin-bottom: 20 / @r;
  }

  .ImgIcon {
    float: left;
    /*width: 31%;*/
    width: 228 / @r;
    height: 228 / @r;
    padding: 5 / @r;
  }

  .ImgIcon > div {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }

  .ImgIcon img {
    position: absolute;
    min-width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .bottom {
    border-top: 1px solid #e9e9e9;
    display: flex;
    justify-content: space-between;
  }

  .bottom div {
    cursor: pointer;
  }

  .bottom div:nth-child(2) {
    margin-left: -36 / @r;
  }

  .icon-zan {
    position: absolute;
    left: -55 / @r;
    top: -2 / @r;
    font-size: 60 / @r;
    color: #878787;
  }

  .icon-pinglun {
    display: inline-block;
    vertical-align: bottom;
    font-size: 40 / @r;
  }

  .icon-yuedu {
    display: inline-block;
    vertical-align: bottom;
    font-size: 40 / @r;
  }

  .bottom div {
    line-height: 72 / @r;
    color: #666;
    position: relative;
  }

  .bottom .color {
    /*color: #db5f5f;*/
    color: #ff8200;
  }

  .firstImg {
    width: 100%;
    height: 400 / @r;
    position: relative;
    overflow: hidden;
    margin-bottom: 20 / @r;
  }

  .firstImg img {
    display: block;
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .noneData {
    width: 100%;
    text-align: center;
    margin-top: 40%;
    line-height: 200 / @r;
  }

  .noneData img {
    /*width:100%;*/
  }

  .Grade {
    position: absolute;
    left: 44 / @r;
    top: 50 / @r;
    width: 32 / @r;
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

  .pointStart {
    width: 220 / @r;
    height: 220 / @r;
    overflow: hidden;
  }

  .pointStart i {
    display: block;
    width: 100%;
    height: 100%;
    background: url(../../../assets/img/pointStart.png) no-repeat;
    background-size: 2000% 100%;
    animation: moveHande 0.65s forwards 1 steps(19);
  }

  @keyframes moveHande {
    form {
      background-position-x: left;
    }
    to {
      background-position-x: right;
    }
  }

  .AdvertisementContent {
    margin: 20 / @r 0;
    position: relative;
    width: 100%;
    height: 400 / @r;
    overflow: hidden;
  }

  .AdvertisementContent img {
    height: 100%;

    /*position: absolute;*/
    /*top: 50%;*/
    /*left: 50%;*/
    /*transform: translate(-50%, -50%);*/
  }
  .dataNone {
    text-align: center;
    line-height: 100px;
    color: #aaa;
  }
</style>
