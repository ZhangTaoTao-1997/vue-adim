<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">药店后台管理系统</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
        <el-form-item prop="loginname">
          <el-input v-model="ruleForm.loginname" placeholder="用户名">
            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="loginpw">
          <el-input type="password" placeholder="密码" v-model="ruleForm.loginpw" @keyup.enter.native="submitForm('ruleForm')">
            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="success" @click="submitForm()">管理员登录</el-button>

        </div>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm1()">员工登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        ruleForm: {
          loginname: '',
          loginpw: ''
        },
        rules: {
          loginname: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          loginpw: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm() {
        var that = this;
        let loginParams = {
          loginname: this.ruleForm.loginname,
          loginpw: this.ruleForm.loginpw
        };
        that.$axios({
          url: 'http://127.0.0.1:9202/user/login0',
          method: 'post',
          data: loginParams
        }).then(res => {
          if (res.data == 1) {
            that.logining = false;
            localStorage.setItem('ms_username', this.ruleForm.loginname);
            that.$router.push({path: '/guanliyuan'});
          }
          else {
            that.logining = false;
            that.$alert('请选择正确的登陆方式！', '提示信息', {
              confirmButtonText: '确定'
            });
          }
        });
      },
      submitForm1() {
        var that = this;
        let loginParams = {
          loginname: this.ruleForm.loginname,
          loginpw: this.ruleForm.loginpw
        };
        that.$axios({
          url: 'http://127.0.0.1:9202/user/login1',
          method: 'post',
          data: loginParams
        }).then(res => {
          if (res.data == 1) {
            that.logining = false;
            localStorage.setItem('ms_username', this.ruleForm.loginname);
            that.$router.push({path: '/yuangong'});
          }
          else {
            that.logining = false;
            that.$alert('请选择正确的登陆方式！', '提示信息', {
              confirmButtonText: '确定'
            });
          }
        });
      }
    }
  }
  //                        if (loginParams.username == "admin" && loginParams.password == "123456") {
  //                            _this.logining = false;
  //                            localStorage.setItem('ms_username',this.ruleForm.username);
  //                            _this.$router.push({ path: '/' });
  //                        } else {
  //                            _this.logining = false;
  //                            _this.$alert('用户名或密码错误！', '提示信息', {
  //                                confirmButtonText: '确定'
  //                            });
  //                        }
  //                    } else {
  //                        console.log('error submit!!');
  //                        return false;
  //                    }
  //                });
  //            }
  //        }
  //    }
</script>

<style scoped>
  .login-wrap{
    position: relative;
    width:100%;
    height:100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
    /*margin-left: 50px;*/
  }
  .ms-title{
    width:100%;
    line-height: 50px;
    text-align: center;
    font-size:20px;
    color: rgba(0, 0, 0, 0.6);
    border-bottom: 1px solid #ddd;
  }
  .ms-login{
    position: absolute;
    left:50%;
    top:50%;
    width:350px;
    margin:-190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255,255,255, 0.3);
    overflow: hidden;
  }
  .ms-content{
    padding: 30px 30px;
  }
  .login-btn{
    text-align: center;
  }
  .login-btn button{
    width:100%;
    height:36px;
    margin-bottom: 10px;
  }
  .login-tips{
    font-size:12px;
    line-height:30px;
    color:#fff;
  }
</style>
