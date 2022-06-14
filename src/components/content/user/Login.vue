<template>
  <div class="login">
    <div class="back">
      <div class="x" @click="hiddenLogin">
        <i class="el-icon-close"></i>
      </div>
      <div class="son">
        <i class="iconfont icon-Phone phone"></i>
      </div>
    </div>
    <div class="main">
      <div>
        <div class="from-item">
          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="请输入手机号"
            required
            clearable
            class="input"
            v-model="phone"
          />
          <!-- <p>message</p> -->
        </div>
        <div class="from-item">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="请输入密码"
            show-password
            class="input"
            v-model="password"
          />
          <!-- <p>pwdMessage</p> -->
        </div>
        <div class="from-item">
          <button color="#fff" class="log" @click="login">
            登陆
          </button>
        </div>
        <!-- <div class="from-item">
          <div class="register">注册</div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { _login,_getLoginstatus } from "network/user";
export default {
  data(){
    return{
      phone:"",
      password:"",
      status:""
    }
  },
  methods: {
    hiddenLogin() {
      this.$parent.hideLogin();
    },
    login(){
      _login(this.phone,this.password).then((res)=>{
        if(res.data.code!=200){
          this.pwdMessage = '密码错误'
        }
        else{
          this.$store.commit("addUser",res.data)
          this.$parent.hideLogin();
          localStorage.setItem('cookie',res.data.cookie);
          localStorage.setItem('avatar',res.data.profile.avatarUrl);
          localStorage.setItem('uid',res.data.profile.userId)
          localStorage.setItem('status',res.data.code)
          this.getLoginstatus()
        }
      })
      
    },
    getLoginstatus(){
      _getLoginstatus().then((res)=>{
        this.status=res.data
        console.log(JSON.stringify(res.data));
      })
    }
  },
  // watch:{
  //   login(){
  //     this.getLoginstatus()
  //   }
  // }
};
</script>

<style scoped>
.login {
  width: 400px;
  height: 560px;
  position: fixed;
  z-index: 999;
  top: 10%;
  left: 40%;
  background: #fafafa;
  /* border: 1px solid red; */
}
.back {
  width: 100%;
  height: 30%;
  position: relative;
}
.x {
  width: 26px;
  height: 26px;
  float: right;
  margin-right: 5px;
  margin-top: 5px;
  text-align: center;
  line-height: 26px;
  cursor: pointer;
}
.x .icon-close {
  font-size: 24px;
}
.back .son {
  width: 6rem;
  height: 6rem;
  position: absolute;
  left: 0;
  right: 0;
  top: 80px;
  bottom: 0;
  margin: auto;
}
.from-item {
  width: 60%;
  margin: 0px auto;
  padding: 10px 0px 10px 10px;
}
.from-item p {
  color: red;
}
input {
  width: 200px;
  height: 2em;
}
p {
  font-size: 13px;
}
.log {
  outline-style: none;
  background: red;
  color: #fff;
  border: 0;
  height: 40px;
  width: 200px;
  border-radius: 10px;
  cursor: pointer;
}
.register {
  color: #333;
  text-align: center;
  margin-right: 35px;
}

.phone {
  color: #e83c3c;
  font-size: 64px;
  text-align: center;
}
.input{
  height: 2rem;
}
</style>