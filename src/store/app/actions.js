

// const str = 'https://xhfwy3.sanhedao.com.cn/public/index.php/client/v3';

const str = 'https://xhfwy3.sanhedao.com.cn/public/index.php/uapi/v4';

//案源库
const strFour = 'https://xhfwy3.sanhedao.com.cn/public/index.php/uapi/v4/';

export default {
  //获取发现页和关注数据3.0
  initFind(store, data) {
    return new Promise((resolve, reject) => {
      axios.post(str + '/find/gettype', data)
        .then(data => {
          let res = data.data;
          if (Number(res.code) == 10000) {
            resolve(res)
          } else {
            reject(data.msg)
          }
        })
    })
  },
  //获取发现页下的法条数据3.0
  LawyerFindFatiao(store, data) {
    return new Promise((resolve, reject) => {
      axios.post(str + '/find/getdatabyid', data)
        .then(data => {
          let res = data.data;
          if (Number(res.code) == 10000) {
            resolve(res.data)
          } else {
            resolve({
              data: []
            })
          }
        })
    })
  },
  //获取发现页下的法条图片3.0
  LawyerFindImg(store, data) {
    return new Promise((resolve, reject) => {
      axios.post(str + '/advertisement/showbyid', data)
        .then(data => {
          let res = data.data;
          if (Number(res.code) == 10000) {
            resolve(res.data)
          } else {
            reject(data.msg)
          }
        })
    })
  },
  //获取发现页下的法条Search3.0
  LawyerFindSearch(store, data) {
    return new Promise((resolve, reject) => {
      axios.post(str + '/find/globalsearch', data)
        .then(data => {
          let res = data.data;
          if (Number(res.code) == 10000) {
            resolve(res.data)
          } else {
            resolve({
              list: []
            })
          }
        })
    })
  },
  //获取法条详情列表数据3.0
  LawyerFindFatiaoDetails(store, data) {
    return new Promise((resolve, reject) => {
      axios.post(str + '/find/getdetail', data)
        .then(data => {
          let res = data.data;
          if (Number(res.code) == 10000) {
            resolve(res.data)
          } else {
            reject(data.msg)
          }
        })
    })
  },
  //获取发现页下的推荐3.0
  LawyerFindRecommend(store, data) {
    return new Promise((resolve, reject) => {
      axios.post(str + '/find/getdatabyid', data)
        .then(data => {
          let res = data.data;
          if (Number(res.code) == 10000) {
            resolve(res.data)
          } else if (Number(res.code) == 10001) {
            resolve(res)
          } else {
            reject(res.data)
          }
        })
    })
  },
  //获取发现页下的关注3.0
  LawyerFindFollow(store, data) {
    return new Promise((resolve, reject) => {
      axios.post(str + '/find/getdatabyid', data)
        .then(data => {
          let res = data.data;
          if (Number(res.code) == 10000) {
            resolve(res.data.list)
          } else {
            reject(data.msg)
          }
        })
    })
  },
  //获取发现页关注和取消关注3.0
  follows(store, data) {
    return new Promise((resolve, reject) => {
      axios.post(str + '/find/fans', data)
        .then(data => {
          let res = data.data;
          if (Number(res.code) == 10000) {
            resolve(res)
          } else {
            reject(data.msg)
          }
        })
    })
  },
  //获取发现页点赞3.0
  Fabulous(store, data) {
    return new Promise((resolve, reject) => {
      axios.post(str + '/find/zan', data)
        .then(data => {
          let res = data.data;
          if (Number(res.code) == 10000) {
            resolve(res)
          } else {
            reject(data.msg)
          }
        })
    })
  },
  //获取发现页下的推荐文章详情
  LawyerFindArticleDetail(store, data) {
    return new Promise((resolve, reject) => {
      axios.post(str + '/find/getdetail', data)
        .then(data => {
          let res = data.data;
          if (Number(res.code) == 10000) {
            resolve(res.data)
          } else {
            reject(data.msg)
          }
        })
    })
  },
  //详情页下的评论
  LawyerFindArticleComment(store, data) {
    return new Promise((resolve, reject) => {
      axios.post(str + '/comment/comment', data)
        .then(data => {
          let res = data.data;
          if (Number(res.code) == 10000) {
            resolve(res.data)
          } else if(Number(res.code) == 10101){
            resolve(res);
          }else {
            reject(data.message)
          }
        })
    })
  },
  //获取发现页下的合同3.0
  LawyerFindContract(store, data) {
    return new Promise((resolve, reject) => {
      axios.post(str + '/find/getdatabyid', data)
        .then(data => {
          let res = data.data;
          if (Number(res.code) == 10000) {
            resolve(res.data.list)
          } else {
            reject(data.msg)
          }
        })
    })
  },
  //获取关于我们3.0
  aboutThree(store, data) {
    return new Promise((resolve, reject) => {
      axios.post(str + '/User/agree', data)
        .then(data => {
          let res = data.data;
          if (Number(res.code) == 10000) {
            resolve(res.data)
          } else {
            reject(data.msg)
          }
        })
    })
  },
  //获取律师专题页home
  LawyerSpecial(store, data) {
    return new Promise((resolve, reject) => {
      axios.post(str + '/special/index', data)
        .then(data => {
          let res = data.data;
          if (Number(res.code) == 10000) {
            resolve(res.data);
            // store.commit('this',res.code)
            store.commit('followObj', res.data)
          } else {
            reject(res.msg)
          }
        })
    })
  },
  //获取律师专题下的视频
  LawyerVideo(store, data) {
    return new Promise((resolve, reject) => {
      axios.post(str + '/special/getbyflag', data)
        .then(data => {
          let res = data.data;
          if (Number(res.code) == 10000) {
            resolve(res.data)
          } else {
            reject(res.msg)
          }
        })
    })
  },
  //获取律师专题页下的观点文章
  LawyerViewPointArticle(store, data) {
    return new Promise((resolve, reject) => {
      axios.post(str + '/special/getbyflag', data)
        .then(data => {
          let res = data.data;
          if (Number(res.code) == 10000) {
            resolve(res.data)
          } else {
            reject(res.msg);
          }
        })
    })
  },
  //获取文书服务
  LawyerService(store, data) {
    return new Promise((resolve, reject) => {
      axios.post(str + '/goods/newgetdoc', data)
        .then((data) => {
          let res = data.data;
          if (Number(res.code) == 10000) {
            resolve(res.data);
          } else {
            reject(res.message);
          }
        })
    })
  },
  //获取文书服务里的合同类型
  LawyerServiceContract(store, data) {
    return new Promise((resolve, reject) => {
      axios.post(str + '/home/showall', data)
        .then(data => {
          let res = data.data;
          if (Number(res.code) == 10000) {
            resolve(res.data)
          } else {
            reject(res.message)
          }
        })
    })
  },
  //获取我的粉丝
  MyFans(store, data) {
    return new Promise((resolve, reject) => {
      axios.post(str + '/special/getmyfans', data)
        .then(data => {
          let res = data.data;
          if (Number(res.code) == 10000) {
            resolve(res.data);
          } else {
            reject(res.message);
          }
        })
    })
  },
  //获取我的粉丝
  Advertisement(store, data) {
    return new Promise((resolve, reject) => {
      axios.post(str + '/home/indexTopAdv', data)
        .then(data => {
          let res = data.data;
          if (Number(res.code) == 10000) {
            resolve(res.data);
          } else {
            reject(res.message);
          }
        })
    })
  },
  //发现页获取分类
  getType(store, data) {
    return new Promise((resolve, reject) => {
      axios.post(str + '/find/gettype', data)
        .then(data => {
          let res = data.data;
          if (Number(res.code) == 10000) {
            resolve(res.data);
          } else {
            reject(res.message);
          }
        })
    })
  },
  //案源库
  anYuan(store, data) {
    return new Promise((resolve, reject) => {
      axios.post(strFour + 'caseku/getcaselist', data)
        .then(data => {
          let res = data.data;
          if (Number(res.code) == 10000) {
            resolve(res.data);
          } else if(Number(res.code) == 10001){
            resolve(res.data);
          } else {
            reject(res.message);
          }
        })
    })
  },
  //案源详情
  anYuanDetail(store, data) {
    return new Promise((resolve, reject) => {
      axios.post(strFour + 'caseku/getcasedetial', data)
        .then(data => {
          let res = data.data;
          if (Number(res.code) == 10000) {
            resolve(res.data);
          }else {
            reject(res.message);
          }
        })
    })
  },
  //PC登录
  logOn(store, data) {
    return new Promise((resolve, reject) => {
      axios.post(str + '/User/login', data)
        .then(data => {
          let res = data.data;
          if (Number(res.code) == 10000) {
            resolve(res.data);
          }else if(Number(res.code) == 10106){
            resolve(res);
          }else {
            reject(res.message);
          }
        })
    })
  },
  //PC获取验证码
  sendCode(store, data) {
    return new Promise((resolve, reject) => {
      axios.post(str + '/getcode', data,{headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf8'
        }
      })
        .then(data => {
          let res = data.data;
          if (Number(res.code) == 10000) {
            resolve(res.data);
          }else if(Number(res.code) == 10015){
            resolve(res);
          }else {
            reject(res.message);
          }
        })
    })
  },
  //PC修改密码
  changePassword(store, data) {
    return new Promise((resolve, reject) => {
      axios.post(str + '/member/forget', data)
        .then(data => {
          let res = data.data;
          if (Number(res.code) == 10000) {
            resolve(res);
          }else if(Number(res.code) == 10010){
            resolve(res);
          }else if(Number(res.code) == 10104){
            resolve(res);
          }else {
            reject(res.message);
          }
        })
    })
  },
  //PC注册
  register(store, data) {
    return new Promise((resolve, reject) => {
      axios({
        url:str + '/User/add',
        method:'post',
        data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf8'
    }
      })
        .then(data => {
          let res = data.data;
          if (Number(res.code) == 10000) {
            resolve(res.data);
          }else if(Number(res.code) == 10015){
            resolve(res);
          }else if(Number(res.code) == 10004){
            resolve(res);
          }else if(Number(res.code) == 10104){
            resolve(res);
          }else {
            reject(res.message);
          }
        })
    })
  },
  //PC关注
  followPc(store, data) {
    return new Promise((resolve, reject) => {
      axios.post(str + '/find/fans', data)
        .then(data => {
          let res = data.data;
          if (Number(res.code) == 10000) {
            resolve(res.data);
          }else if(Number(res.code) == 10101){
            resolve(res);
          } else {
            reject(res.message);
          }
        })
    })
  },
  //PC点赞
  FabulousPc(store, data) {
    return new Promise((resolve, reject) => {
      axios.post(str + '/find/zan', data)
        .then(data => {
          let res = data.data;
          if (Number(res.code) == 10000) {
            resolve(res.data);
          } else if(Number(res.code) == 10101){
            resolve(res);
          } else {
            reject(res.message);
          }
        })
    })
  },
  //PC评论
  commentPc(store, data) {
    return new Promise((resolve, reject) => {
      axios.post(str + '/comment/comment', data)
        .then(data => {
          let res = data.data;
          if (Number(res.code) == 10000) {
            resolve(res.data);
          } else {
            reject(res.message);
          }
        })
    })
  },
  //PC我的关注
  PersonalGz(store, data) {
    return new Promise((resolve, reject) => {
      axios.post(str + '/member/getguanzhu', data)
        .then(data => {
          let res = data.data;
          if (Number(res.code) == 10000) {
            resolve(res.data);
          }else if(Number(res.code)==10001){
            resolve(res)
          }else if(Number(res.code)==10101){
            resolve(res)
          } else {
            reject(res.message);
          }
        })
    })
  },
  //PC我的收藏
  PersonalCollection(store, data) {
    return new Promise((resolve, reject) => {
      axios.post(str + '/member/getcollection', data)
        .then(data => {
          let res = data.data;
          if (Number(res.code) == 10000) {
            resolve(res.data);
          }else if(Number(res.code) == 10001){
            resolve(res);
          } else if(Number(res.code)==10101){
            resolve(res)
          } else {
            reject(res.message);
          }
        })
    })
  },
  //PC个人资料
  PersonalData(store, data) {
    return new Promise((resolve, reject) => {
      axios.post(str + '/member/index', data)
        .then(data => {
          let res = data.data;
          if (Number(res.code) == 10000) {
            resolve(res.data);
          } else if(Number(res.code) == 10001){
            resolve(res);
          } else if(Number(res.code)==10101){
            resolve(res)
          }else {
            reject(res.message);
          }
        })
    })
  },
  //PC点击收藏
  Collection(store, data) {
    return new Promise((resolve, reject) => {
      axios.post(str + '/find/collection', data)
        .then(data => {
          console.log(data)
          let res = data.data;
          if (Number(res.code) == 10000) {
            resolve(res.data);
          } else {
            reject(res.message);
          }
        })
    })
  },
  //PC点击取消收藏
  cancellCollection(store, data) {
    return new Promise((resolve, reject) => {
      axios.post(str + '/member/delcollect', data)
        .then(data => {
          let res = data.data;
          if (Number(res.code) == 10000) {
            resolve(res.data);
          } else {
            reject(res.message);
          }
        })
    })
  },
  //PC个人资料
  indexImg(store, data) {
    return new Promise((resolve, reject) => {
      axios.post(str + '/home/indexTopAdv', data)
        .then(data => {
          let res = data.data;
          if (Number(res.code) == 10000) {
            resolve(res);
          } else {
            reject(res);
          }
        })
    })
  },
  //PC修改资料
  modifyData(store, data) {
    return new Promise((resolve, reject) => {
      axios.post(str + '/member/edit', data)
        .then(data => {
          console.log(data,888)
          let res = data.data;
          if (Number(res.code) == 10000) {
            resolve(res);
          } else {
            reject(res);
          }
        })
    })
  },





}
