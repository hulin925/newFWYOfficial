export default {
	initData(state, data) {
		state.initDataList = data;
	},
	showLoading(state) { //数据加载
		state.isLoading = true;
	},
	hidenLoading(state) { //数据加载
		state.isLoading = false;
	},
  showZan(state) { //赞
    state.isZan = true;
  },
  hidenZan(state) {
    state.isZan = false;
  },
  hidenCloseOutPc(state){//pc登录窗口
	  state.closeOutPc=false;
  },
  showCloseOutPc(state){
	  state.closeOutPc=true;
  },
  hidenCloseOutPcBox(state){//pc登录窗口
    state.closeOutPcBox=false;
  },
  showCloseOutPcBox(state){//pc登录窗口总
    state.closeOutPcBox=true;
    state.getCode=false;//点击登录框取消样式
    state.showErr1=false;
    state.showErr2=false;
    state.showErr3=false;
    state.forget=false;
  },
  showgetCode(state){
    state.getCode=true;
  },
  showshowErr1(state){
    state.showErr1=true;
  },
  showshowErr2(state){
    state.showErr2=true;
  },
  showshowErr3(state){
    state.showErr3=true;
  },
  showforget(state){
    state.forget=true;
  },
  hidengetCode(state){
    state.getCode=false;
  },
  hidenshowErr1(state){
    state.showErr1=false;
  },
  hidenshowErr2(state){
    state.showErr2=false;
  },
  hidenshowErr3(state){
    state.showErr3=false;
  },
  hidenforget(state){
    state.forget=false;
  },
	setLawyerNav(state, id) { //改变state数据
		state.WrapNavList = state.WrapNavList.map((item, index) => {
			if (index == id) {
				item.active = true;
				return item
			} else {
				item.active = false;
				return item
			}
		})
	},
  setLawyerNavPc(state, id) { //改变state数据
    state.WrapNavListPc = state.WrapNavListPc.map((item, index) => {
      if (index == id) {
        item.active = true;
        return item
      } else {
        item.active = false;
        return item
      }
    })
  },
  isSetLayerNav(state,id){//判断是否是援助
	  state.isWrapNavList=state.isWrapNavList.map((item,index)=>{
	    if(index==id){
	      item.active = true;
	      return item
      }else{
	      item.active = false;
	      return item
      }
    })
  },
  isPcNavList(state, id) { //改变state数据
    state.isPcNavList = state.isPcNavList.map((item, index) => {
      if (index == id) {
        item.active = true;
        return item
      } else {
        item.active = false;
        return item
      }
    })
  },
  personalDataPc(state,id){
	  state.personalDataPc=state.personalDataPc.map((item,index)=>{
	    if(index == id){
	      item.active = true;
	      return item;
      }else{
	      item.active = false;
	      return item;
      }
    })
  },
  NavBar(state,id){
	  state.navBar = state.navBar.map((item,index)=>{
	    if(index == id){
	      item.active=true;
	      return item;
      }else{
	      item.active = false;
	      return item;
      }
    })
  },
	initArrImg(state, data) { //查看图片
		state.arrImg = data;
	},
	followObj(state, obj) {//律师专题页数据存储
		state.followObj = obj;
	}
}
