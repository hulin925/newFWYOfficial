
//3.0数据
//pc
import navPc from '@/components/navPc'//nav
import LawyerFindRecommendPc from '@/views/threeApp/stylePc/LawyerFindRecommendPc'//发现页下的推荐
import LawyerFindLawDetailsPc from '@/views/threeApp/stylePc/LawyerFindLawDetailsPc'//发现页下法条详情
import LawyerFindFatiaoPc from '@/views/threeApp/stylePc/LawyerFindFatiaoPc'//发现页下法条

//mobile
import LawyerFindRecommend from '@/views/threeApp/LawyerFind/LawyerFindRecommend'//发现页下的推荐
import LawyerFindArticleDetail from '@/views/threeApp/LawyerFind/LawyerFindArticleDetail'//发现页下的文章详情
import LawyerFindFatiao from '@/views/threeApp/LawyerFind/LawyerFindFatiao'//发现页下的法条
import LawyerFindLawDetails from '@/views/threeApp/LawyerFind/LawyerFindLawDetails'//发现页下的法条详情列表
import LawyerSpecial from '@/views/threeApp/LawyerSpecial'//律师专题页
import myFans from '@/views/threeApp/LawyerSpecialRoutes/myFans'//我的粉丝
//LawyerSpecial下的子路由
import LawyerSpecialNav from '@/views/threeApp/LawyerSpecialRoutes/LawyerSpecialNav'//律师专题页nav
import home from '@/views/threeApp/LawyerSpecialRoutes/home'
import viewpoint from '@/views/threeApp/LawyerSpecialRoutes/viewpoint'
import video from '@/views/threeApp/LawyerSpecialRoutes/video'
import service from '@/views/threeApp/LawyerSpecialRoutes/service'
import consultation from '@/views/threeApp/LawyerSpecialRoutes/consultation'

//案源库
import anYuanKu from '@/views/anYuan/anYuanKu'//发现页下的推荐
import anYuanDetail from '@/views/anYuan/anYuanDetail'//发现页下的推荐

//官网PC项目
import AboutPc from '@/views/threeApp/Pc/AboutPc'//首页
import DownloadPc from '@/views/threeApp/Pc/DownloadPc'//法条
import IndexPc from '@/views/threeApp/Pc/IndexPc'//快速咨询
import LawPc from '@/views/threeApp/Pc/LawPc'//关于我们
function get(){
  if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
    return true;
  }else{
    return false;
  }
}
let routeList = [
  //3.0案源库列表
  {
    path: '/anYuanKu',
    name:'anYuanKu',
    component: anYuanKu,
  },
  //3.0案源库详情
  {
    path: '/anYuanDetail',
    name:'anYuanDetail',
    component: anYuanDetail,
  },
  //3.0律师发现页下的推荐
  {
    path: '/',
    name:'navPc',
    component: navPc,
  },
  {
    path: '/',
    name:'LawyerFindRecommend',
    component: LawyerFindRecommend,
    // component(resolve){
    //   require(['@/views/threeApp/LawyerFind/LawyerFindRecommend'],resolve)
    // }
  },
  //3.0律师发现页下的推荐PC
  {
    path: '/LawyerFindRecommendPc',
    name:'LawyerFindRecommendPc',
    component: LawyerFindRecommendPc,
  },
  //3.0律师发现页下的法条PC
  {
    path: '/LawyerFindFatiaoPc',
    name:'LawyerFindFatiaoPc',
    component: LawyerFindFatiaoPc,
  },
  //3.0律师发现页下的法条详情PC
  {
    path: '/LawyerFindLawDetailsPc',
    name:'LawyerFindLawDetailsPc',
    component: LawyerFindLawDetailsPc,
  },
  //3.0律师发现页下的法条
  {
    path: '/LawyerFindFatiao',
    name:'LawyerFindFatiao',
    component: LawyerFindFatiao,
    // component(resolve){
    //   require(['@/views/threeApp/LawyerFind/LawyerFindFatiao'],resolve)
    // }
  },
  //3.0律师发现页下的法条详情列表
  {
    path: '/LawyerFindLawDetails',
    name:'LawyerFindLawDetails',
    component: LawyerFindLawDetails,
    // component(resolve){
    //   require(['@/views/threeApp/LawyerFind/LawyerFindLawDetails'],resolve)
    // }
  },
  //3.0律师发现页下的文章详情
  {
    path: '/LawyerFindArticleDetail',
    name:'LawyerFindArticleDetail',
    component: LawyerFindArticleDetail
  },
  //3.0律师专题页Nav
  {
    path: '/LawyerSpecialNav',
    name:'LawyerSpecialNav',
    component: LawyerSpecialNav
    // component(resolve){
    //   require(['@/views/threeApp/LawyerSpecialRoutes/LawyerSpecialNav'],resolve)
    // }
  },
  //3.0律师专题页
  {
    path:'/LawyerSpecial',
    name:'LawyerSpecial',
    component:LawyerSpecial,
    // component(resolve){
    //   require(['@/views/threeApp/LawyerSpecial'],resolve)
    // },
    redirect:'LawyerSpecial/home',
    children:[
      //主页
      {
        path: 'home',
        name:'home',
        component: home
      },
      //观点
      {
        path: 'viewpoint',
        name:'viewpoint',
        component: viewpoint
      },
      //视频
      {
        path: 'video',
        name:'video',
        component: video
      },
      //文书服务
      {
        path: 'service',
        name:'service',
        component: service
      },
      //图文咨询
      {
        path: 'consultation',
        name:'consultation',
        component: consultation
      }
    ]
  },
  //我的粉丝
  {
    path:'/myFans',
    name:'myFans',
    component:myFans
  },
  //首页pc
  {
    path:'/IndexPc',
    name:'IndexPc',
    component:IndexPc
  },
  //法条pc
  {
    path:'/LawPc',
    name:'LawPc',
    component:LawPc
  },
  //快速咨询pc
  {
    path:'/DownloadPc',
    name:'DownloadPc',
    component:DownloadPc
  },
  //关于我们pc
  {
    path:'/AboutPc',
    name:'AboutPc',
    component:AboutPc
  },

]
if(get()){
  routeList = routeList.filter(item=>{
    if(item.name=='navPc'){
      return false
    }
    return true
  })
}



export default routeList
