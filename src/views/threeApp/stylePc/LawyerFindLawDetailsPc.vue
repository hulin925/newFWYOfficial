<template>
  <div class="Details isPc">
    <div class="content">
      <h1>{{data.title}}</h1>
			<ul class="release">
        <li>发布机关：{{data.section}}</li>
				<li>发布日期：{{data.release_time}}</li>
				<li>发文字号：{{data.code}}</li>
				<li>生效日期：{{data.release_time}}</li>
				<li>效力等级：{{data.effect?'':'无'}}</li>
				<li>时效性：现行有效</li>
				<li v-if="data.classify">类别：{{data.fatiaotype}}</li>
				<li v-else>类别：无</li>
			</ul>
			<div v-html="data.content" style="font-size:1rem; margin-top:20px; text-align: left !important;">
			</div>
      <div class="bottom"  @click.stop="Collection(data)" :class="{color:data.iscollection == 1}">
        <span><i class="iconfont  icon-shoucang"></i></span>
        <span>收藏</span>
      </div>
		</div>
  </div>
</template>

<script>
  import {Collection} from '@/assets/public.js'//收藏
export default {
  name: 'LawDetails',
  data () {
    return {
      id:'',
      lid:'',
      collection:{},//收藏数据
			data:{},
      userInfo:{},
    }
  },
	created(){
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.id=this.$route.query.id;
		this.initData();
	},
	methods:{
    Collection(item) {//收藏接口
      console.log(item,666)
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
      options.append('type', item.classify);
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
		initData(){
			let options=new FormData();
			options.append('id',this.id);//510
			options.append('uid',this.userInfo.uid);//510
      options.append('classify','5');//5
			// options.append('tag','fatiao');//fatiao
			this.$store.dispatch('LawyerFindFatiaoDetails',options)
        .then(data=>{
				  this.data=data;
			})
		},
    GetQueryString(name) { //截取?后想要的数据 lawyerId
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
	}
}
</script>

<style scoped lang="less">
	@r:30rem;

  .isPc{
    margin-left:300px;
  }
	h1{
		font-size:38/@r;
	}
	.Details{
		font-weight:bold;
	}
	.content{
		padding:20/@r;
		font-size:36/@r;
		line-height:64/@r;
    margin-bottom:50px;
	}
	.release{
		font-size:34/@r;
		margin-top:40/@r;
	}
	.release li{
		padding:10/@r 0;
		line-height:44/@r;
		color:#9d9d9d;
		font-weight:normal;
	}
	.footer a{
		color:red !important;
	}
  .bottom{
    padding-right:20px;
    text-align:right;
    color: #666666;
    cursor: pointer;
    font-size:16px;
  }
  .icon-shoucang {
    font-size: 36/@r;
    vertical-align: bottom;
    margin-right:10px;
  }
  .color {
    color: #FF8200;
  }
</style>
