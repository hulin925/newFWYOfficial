<template>
  <div>
    <ul class="list">
      <li class="clearfix">
        <div class="left">
          <span>头像</span>
        </div>
        <div class="right">
          <img :src="data.faces" alt="">
        </div>
      </li>
      <li class="clearfix">
        <div class="left">
          <span>昵称</span>
        </div>
        <div class="right">
          <span>{{data.nickname}}</span>
        </div>
      </li>
      <li class="clearfix">
        <div class="left">
          <span>性别</span>
        </div>
        <div class="right selectCityInfo lastArea">
          <el-select v-model="value" :placeholder="sex">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <!--<span v-if="data.sex==1">男</span>-->
          <!--<span v-else>女</span>-->
        </div>
      </li>
      <li class="clearfix">
        <div class="left">
          <span>邮箱</span>
        </div>
        <div class="right">
          <input type="text" class="email" :placeholder="email" ref="email">
          <span class="paddingLeft">填写邮箱</span>
          <!--<span v-if="data.sex==1">男</span>-->
          <!--<span v-else>女</span>-->
        </div>
      </li>
      <li class="clearfix">
        <div class="left">
          <span>我的地址</span>
        </div>
        <div class="right lastArea">
          <div class="selectCityInfo">
            <el-cascader
              :options="options"
              :placeholder="region"
              @change="handleChange"></el-cascader>
          </div>
          <!--<span v-if="data.province_cn">{{region}}</span>-->
          <!--<span>{{data.detail}}</span>-->
        </div>
      </li>
    </ul>

    <div class="Preservation">
      <!--<el-button type="warning">取消</el-button>-->
      <el-button type="success" @click="submit">保存</el-button>
    </div>

  </div>
</template>

<script>
    import pcProvinceData from '@/assets/pcProvinceData.js'
    export default {
      inject:['reload'],
      name: "information",
      data(){
          return{
            userInfo:{},
            data:{},
            region:'',//地区
            options: pcProvinceData,
            cityData:[],//选中的数据
            email:'',
            sex:'',//性别
            options2: [{
              value: '1',
              label: '男'
            }, {
              value: '0',
              label: '女'
            }],
            value: ''
          }
      },
      created(){
          this.userInfo=JSON.parse(localStorage.getItem('userInfo'));
          this.initData();
      },
      methods:{
        submit(){
          let detail=this.cityData[0]+'-'+this.cityData[1]+'-'+this.cityData[2];
          let email=this.$refs.email.value;
          if(!this.value&&!email&&!this.cityData[0]){
            this.$message({
              message:'请至少要修改一条数据',
              type:'warning',
              center:true
            })
            return;
          }
          let options=new FormData();
          options.append('uid',this.userInfo.uid);
          options.append('token',this.userInfo.token);
          if(this.value){
            options.append('sex',this.value);
          }
          if(email){
            options.append('email',email);
          }
          if(this.cityData[0]){
            options.append('province_cn',this.cityData[0]);
            options.append('city_cn',this.cityData[1]);
            options.append('area_cn',this.cityData[2]);
            options.append('detail',detail);
          }
          this.$store.dispatch('modifyData',options)
            .then(data=>{
              this.$message({
                message:data.message,
                type:'success',
                center:true
              })
              this.reload();
              console.log(data)
            })
        },
          initData(){
            if (!this.userInfo) {
              this.noData=true;
              this.$store.commit('showCloseOutPcBox');
              this.noData=true;
              this.$message({
                message:'请重新登录，登录过期',
                type:'warning',
                center:true
              })
              return;
            }
            let options=new FormData();
            options.append('uid',this.userInfo.uid);
            options.append('token',this.userInfo.token);
            this.$store.dispatch('PersonalData',options)
              .then(data=>{
                if(data.code==10101){
                  this.$store.commit('showCloseOutPcBox');
                  this.noData=true;
                  this.$message({
                    message:'请重新登录，登录过期',
                    type:'warning',
                    center:true
                  })
                  return;
                }

                this.data=data;
                data.faces=data.weburl+data.face;
                if(data.province_cn){
                  this.region=data.province_cn+'-'+data.city_cn+'-'+data.area_cn;
                }else{
                  this.region=data.detail
                }
                if(data.sex==1){
                  this.sex="男"
                }else{
                  this.sex="女"
                }
                if(data.email){
                  this.email=data.email
                }else{
                  this.email='请填写邮箱'
                }

              })
          },
        handleChange(value) {//选中的地址
          this.cityData = value;
        },
      }

    }
</script>

<style scoped>

  .list li{
    line-height:40px;
    font-size:18px;
    border-bottom:1px solid #ddd;
    padding:15px 0;
  }
  .list .left{
    width:20%;
    float:left;
    overflow: hidden;
  }
  .list .right{
    width:80%;
    float:left;
    color:#606266;
  }
  .list .right img{
    width:40px;
    vertical-align:middle;
  }
  .Preservation{
    margin-top:20px;
    text-align:right;
  }


  .selectCityInfo div{
    width:320px;
  }
  .lastArea{
    margin-left:-15px;
  }
  .email{
    border:none;
    color:#606266;
    font-size:18px;
    border-bottom:1px solid #ccc;
    height:34px;
  }
  .paddingLeft{
    margin-left:20px;
  }

  input::-webkit-input-placeholder{
    font-size: 18px;
    color:#606266;
  }
  input:-moz-placeholder{
    font-size: 18px;
    color:#606266;
  }
  input::-moz-placeholder{
    font-size: 18px;
    color:#606266;
  }
  input:-ms-input-placeholder{
    font-size: 18px;
    color:#606266;
  }

  .list input:focus{
    border-bottom: 1px solid #0F996B;
  }
</style>
