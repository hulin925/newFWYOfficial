export default {
  initDataList: [],
  isLoading: false,
  isZan: false,
  closeOutPc:false,
  arrImg:[],//图片存储
  WrapNavList: [//律师专题页导航
    {
      title: '主页',
      routerName: 'home',
      active:true
    },
    {
      title: '观点',
      routerName: 'viewpoint',
      active:false
    },
    {
      title: '视频',
      routerName: 'video',
      active:false
    },
    {
      title: '图文咨询',
      routerName: 'consultation',
      active:false
    },
    {
      title: '文书服务',
      routerName: 'service',
      active:false
    },
  ],
  WrapNavListPc: [//律师专题页导航pc
    {
      title: '主页',
      routerName: 'homePc',
      active:true
    },
    {
      title: '观点',
      routerName: 'viewpointPc',
      active:false
    },
    {
      title: '视频',
      routerName: 'videoPc',
      active:false
    },
    // {
    //   title: '图文咨询',
    //   routerName: 'consultationPc',
    //   active:false
    // },
    // {
    //   title: '文书服务',
    //   routerName: 'servicePc',
    //   active:false
    // },
  ],
  isPcNavList: [//律师专题页导航,pc端
    {
      title: '主页',
      routerName: 'home',
      active:true
    },
    {
      title: '观点',
      routerName: 'viewpoint',
      active:false
    },
    {
      title: '视频',
      routerName: 'video',
      active:false
    }
  ],
  isWrapNavList: [//律师专题页导航，援助
    {
      title: '主页',
      routerName: 'home',
      active:true
    },
    {
      title: '观点',
      routerName: 'viewpoint',
      active:false
    },
    {
      title: '视频',
      routerName: 'video',
      active:false
    },
    {
      title: '图文咨询',
      routerName: 'consultation',
      active:false
    },
  ],
	followObj:{},//关注数据
  personalDataPc: [//个人中心pc
    {
      name: '我的收藏',
      pushName: 'PersonalCollectionPc',
      active:true
    },
    {
      name: '我的关注',
      pushName: 'PersonalGzPc',
      active:false
    },
    {
      name: '账号信息',
      pushName: 'informationPc',
      active:false
    },
  ],
}
