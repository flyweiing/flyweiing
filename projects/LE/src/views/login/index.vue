<template>
  <div class="login-container">
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <el-form-item prop="username">
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="用户名" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
          placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click.native.prevent="handleLogin">
          登   录
        </el-button>
      </el-form-item>
    </el-form>
    <div class="footer">{{ copyright }}</div>
  </div>
</template>

<script>

export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    const fullYear = (new Date()).getFullYear()
    return {
      loginForm: {
        username: '13138150282',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      copyright: '© 2004-' + fullYear + '深圳市洲明科技有限公司版权所有 V1.1.0',
      loading: false
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    input {
      background: transparent;
      border: 0;
      -webkit-appearance: none;
      border-radius: 0;
      color: $light_gray;
      height: 100%;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item__content {
    height: 100%;
  }
  .el-form-item {
    position: relative;
    top: 42%;
    left: 21%;
    width: 45%;
    height: 36px;
    margin-bottom: 20px;
    color: #454545;
  }
  .el-button {
    margin-left:1.5%;
    margin-top: 4px;
    width: 84%;
    height: 120%;
  }
  .el-form-item__error{
    top: 33px;
    left: 15px;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-image: url('../../assets/login/bg_login.png');
  background-size: 100% 100%;
  .login-form {
    position: absolute;
    top: 28%;
    right: 14%;
    width: 610px;
    height: 390px;
    background-image: url('../../assets/login/login_form.png');
    background-size: 100% 100%;
    @media screen and (max-width: 1600px) {
      top: 17%;
      right: 12%;
    }
    &:after{
      content:'';
      position: absolute;
      top: 100%;
      left: 6.6%;
      width: 76.8%;
      height: 150px;
      background-image: url('../../assets/login/login_form_reflect.png');
      background-size: 100% auto;
    }
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .footer {
    position: absolute;
    right: 0;
    bottom: 10px;
    left: 0;
    font-size: 12px;
    color: #fff;
    text-align: center;
    letter-spacing: 1.5px;
  }
}
</style>
