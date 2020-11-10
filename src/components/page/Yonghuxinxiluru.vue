<template>
  <div>
    <div id="app">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="账号" prop="loginname">
          <el-col :span="24">
          <el-input v-model="ruleForm.loginname"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="密码" prop="loginpw">
          <el-input v-model="ruleForm.loginpw"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="xingming">
          <el-input v-model="ruleForm.xingming"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="xingbie">
          <el-select v-model="ruleForm.xingbie" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" prop="nianling">
          <el-input v-model="ruleForm.nianling"></el-input>
        </el-form-item>
        <el-form-item label="住址" prop="address">
          <el-input v-model="ruleForm.address"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="dianhua">
          <el-input v-model="ruleForm.dianhua"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="ruleForm.type" placeholder="请选择类型">
            <el-option label="员工" value="员工"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
          <el-button type="danger" @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import VueCropper  from 'vue-cropperjs';
  export default {
    name: 'upload',
    data: function(){
      return {
        ruleForm: {
          loginname:'',
          loginpw:'',
          xingming:'',
          xingbie:'',
          nianling:'',
          address:'',
          dianhua:'',
          type:'',
        },

        rules: {
          loginname: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          loginpw: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
          xingming: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          xingbie: [
            { required: true, message: '请输入性别', trigger: 'blur' },
          ],
          nianling: [
            { required: true, message: '请输入年龄', trigger: 'blur' },
          ],
          address: [
            { required: true, message: '请输入地址', trigger: 'blur' },
          ],
          dianhua: [
            { required: true, message: '请输入电话', trigger: 'blur' },
          ],
          type: [
            { required: true, message: '请输入类型', trigger: 'blur' },
          ],
        },
      }
    },
    components: {
      VueCropper
    },
    methods:{
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var that = this
            let data = {
              loginname:that.ruleForm.loginname,
              loginpw:that.ruleForm.loginpw,
              xingming: that.ruleForm.xingming,
              nianling:that.ruleForm.nianling,
              xingbie: that.ruleForm.xingbie,
              address: that.ruleForm.address,
              dianhua: that.ruleForm.dianhua,
              type: that.ruleForm.type,
            };
            that.$axios({
              url: 'http://127.0.0.1:9202/user/addUser',
              method: 'post',
              data: data
            }).then(res => {
                if (res.data == 1) {
                  that.$message({
                    message: '添加成功',
                    type: 'success'
                  });
                  this.$refs[formName].resetFields();
                }
              }
            ).catch()
          }else {
            this.$message.error('请正确添加信息');
            return false;
          }
        });
      },
      resetForm(formName)
      {
        this.$refs[formName].resetFields();
      },

    },
  }
</script>

<style scoped>
  .content-title{
    font-weight: 400;
    line-height: 50px;
    margin: 10px 0;
    font-size: 22px;
    color: #1f2f3d;
  }
  .pre-img{
    width: 100px;
    height: 100px;
    background: #f8f8f8;
    border: 1px solid #eee;
    border-radius: 5px;
  }
  .crop-demo{
    display: flex;
    align-items: flex-end;
  }
  .crop-demo-btn{
    position: relative;
    width: 100px;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    margin-left: 30px;
    background-color: #409eff;
    color: #fff;
    font-size: 14px;
    border-radius: 4px;
    box-sizing: border-box;
  }
  .crop-input{
    position: absolute;
    width: 100px;
    height: 40px;
    left: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
  }
</style>
