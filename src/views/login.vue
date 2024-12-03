<template>
<div class="login-box">
  <h2>Login</h2>
  <form>
    <div class="user-box">
      <input v-model="phone" type="text" name="" required="">
      <label>手机号码</label>
    </div>
    <div class="user-box">
      <input v-model="password" type="password" name="" required="">
      <label>登录密码</label>
    </div>
  </form>
  <el-button type="primary" @click="login" round style="width: 200px;height: 40px;">登录</el-button>
</div>
</template>

<script setup>
import { ref } from 'vue'
import { useMemberStore } from '@/stores/member';
import { useRouter } from 'vue-router';
import { instance } from '@/instance';


const memberStore = useMemberStore()
const router = useRouter()
const phone = ref('')
const password = ref('')


const login = () => { 
  if (phone.value && password.value) {
    instance.post('/adminLogin', {
      phone: phone.value,
      password: password.value
    }).then(res => {
      console.log(res)
      if (res.data.code === 200) {
        memberStore.setProfile({id: res.data.data.id, phone: phone.value, token: res.data.data.token})
        router.push({name:'DataShow'}) 
      } else {
        alert("登录失败，请检查手机号码或密码")
      }
    }).catch(err => {
      alert("登录失败，请联系管理员")
    })
 
  } else {
    alert('手机号码或密码不能为空')
  }
}

</script>

<style scoped lang="scss">
html {
  height: 100%;
}

.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.237);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0,0,0,.6);
  border-radius: 10px;
}

.login-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}
.login-box .user-box label {
  position: absolute;
  top:0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: .5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}

.login-box form a {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #03e9f4;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: .5s;
  margin-top: 40px;
  letter-spacing: 4px
}


</style>