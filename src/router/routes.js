
//3.0数据
//pc
import navPc from '@/components/navPc'//nav
import LawyerFindRecommendPc from '@/views/threeApp/stylePc/LawyerFindRecommendPc'//发现页下的推荐
import LawyerFindArticleDetailPc from '@/views/threeApp/stylePc/LawyerFindArticleDetailPc'//发现页下的文章详情
import LawyerFindLawDetailsPc from '@/views/threeApp/stylePc/LawyerFindLawDetailsPc'//发现页下法条详情
import LawyerFindFatiaoPc from '@/views/threeApp/stylePc/LawyerFindFatiaoPc'//发现页下法条
import LawyerSpecialPc from '@/views/threeApp/LawyerSpecialPc'//律师专题页
import myFansPc from '@/views/threeApp/LawyerSpecialRoutesPc/myFans'//我的粉丝
import personalData from '@/views/threeApp/stylePc/personalData'//个人资料
import informationPc from '@/views/threeApp/stylePc/personalData/information'//我的资料
import PersonalCollectionPc from '@/views/threeApp/stylePc/personalData/PersonalCollection'//我的收藏
import PersonalGzPc from '@/views/threeApp/stylePc/personalData/PersonalGz'//我的关注
import changePassword from '@/views/threeApp/stylePc/personalData/changePassword'//修改密码
//LawyerSpecialPc下的子路由
import LawyerSpecialNavPc from '@/views/threeApp/LawyerSpecialRoutesPc/LawyerSpecialNav'//律师专题页nav
import homePc from '@/views/threeApp/LawyerSpecialRoutesPc/home'
import viewpointPc from '@/views/threeApp/LawyerSpecialRoutesPc/viewpoint'
import videoPc from '@/views/threeApp/LawyerSpecialRoutesPc/video'
import servicePc from '@/views/threeApp/LawyerSpecialRoutesPc/service'
import consultationPc from '@/views/threeApp/LawyerSpecialRoutesPc/consultation'

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
  },
  //3.0律师发现页下的文章详情PC
  {
    path: '/LawyerFindArticleDetailPc',
    name:'LawyerFindArticleDetailPc',
    component: LawyerFindArticleDetailPc,
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
  //3.0律师发现页下的法条详情PC
  {
    path: '/personalData',
    name:'personalData',
    component: personalData,
    redirect:'personalData/PersonalCollectionPc',
    children:[
      //我的收藏
      {
        path:'PersonalCollectionPc',
        name:'PersonalCollectionPc',
        component:PersonalCollectionPc
      },
      //我的关注
      {
        path:'PersonalGzPc',
        name:'PersonalGzPc',
        component:PersonalGzPc
      },
      //我的资料
      {
        path:'informationPc',
        name:'informationPc',
        component:informationPc
      },
      //修改密码
      {
        path:'changePassword',
        name:'changePassword',
        component:changePassword
      },
    ]
  },
  //3.0律师专题页NavPc
  {
    path: '/LawyerSpecialNavPc',
    name:'LawyerSpecialNavPc',
    component: LawyerSpecialNavPc
  },
  //3.0律师专题页PC
  {
    path:'/LawyerSpecialPc',
    name:'LawyerSpecialPc',
    component:LawyerSpecialPc,
    redirect:'LawyerSpecialPc/homePc',
    children:[
      //主页
      {
        path: 'homePc',
        name:'homePc',
        component: homePc
      },
      //观点
      {
        path: 'viewpointPc',
        name:'viewpointPc',
        component: viewpointPc
      },
      //视频
      {
        path: 'videoPc',
        name:'videoPc',
        component: videoPc
      },
      //文书服务
      {
        path: 'servicePc',
        name:'servicePc',
        component: servicePc
      },
      //图文咨询
      {
        path: 'consultationPc',
        name:'consultationPc',
        component: consultationPc
      }
    ]
  },
  //我的粉丝
  {
    path:'/myFansPc',
    name:'myFansPc',
    component:myFansPc
  },
  //3.0律师发现页下的法条
  {
    path: '/LawyerFindFatiao',
    name:'LawyerFindFatiao',
    component: LawyerFindFatiao,
  },
  //3.0律师发现页下的法条详情列表
  {
    path: '/LawyerFindLawDetails',
    name:'LawyerFindLawDetails',
    component: LawyerFindLawDetails,
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
  },
  //3.0律师专题页
  {
    path:'/LawyerSpecial',
    name:'LawyerSpecial',
    component:LawyerSpecial,
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
