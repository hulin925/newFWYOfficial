export default {
	initDataList: state => state.initDataList, //页面加载显示
	isLoading: state => state.isLoading, //页面加载显示
  isZan: state => state.isZan, //页面加载显示
  closeOutPc:state=>state.closeOutPc,//pc登录窗口
  closeOutPcBox:state=>state.closeOutPcBox,//pc登录窗口总
  getCode:state=>state.getCode,//pc登录窗口总
  showErr1:state=>state.showErr1,//pc登录窗口总
  showErr2:state=>state.showErr2,//pc登录窗口总
  showErr3:state=>state.showErr3,//pc登录窗口总
  forget:state=>state.forget,//pc登录窗口总
	WrapNavList: state => state.WrapNavList, //专题页导航
  WrapNavListPc: state => state.WrapNavListPc, //专题页导航Pc
	arrImg: state => state.arrImg, //查看图片
	followObj: state => state.followObj,//律师专题页数据
  isWrapNavList:state=>state.isWrapNavList,//专题页判断是否是援助
  isPcNavList:state=>state.isPcNavList,//专题页判断是否是pc端
  personalDataPc:state=>state.personalDataPc,//个人中心pc
  navBar:state=>state.NavBar,//导航条PC
}
