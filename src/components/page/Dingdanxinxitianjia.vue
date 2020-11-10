<template>
  <div>
    <div id="app">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="单据号" prop="danjuhao">
          <el-input v-model="ruleForm.danjuhao"></el-input>
        </el-form-item>
        <el-form-item label="时间" required>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期"
                            v-model="ruleForm.shijian" value-format="yyyy-MM-dd" style="width: 100%;">
            </el-date-picker>
          </el-col>
        </el-form-item>
        <!--<el-form-item label="时间">-->
        <!--<el-col :span="11">-->
        <!--<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.shijian" style="width: 100%;"></el-date-picker>-->
        <!--</el-col>-->
        <!--</el-form-item>-->
        <el-form-item label="总金额" prop="zongjiage">
          <el-input v-model="ruleForm.zongjiage"></el-input>
        </el-form-item>
        <el-form-item label="客户" prop="mingcheng">
          <el-select v-model="ruleForm.jingshouren" filterable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.jingshouren"
              :label="item.mingcheng"
              :value="item.mingcheng">
              <!--jingshouren对应数据库接受字段，mingcheng是获取到的内容，value是发送的内容-->
            </el-option>
          </el-select>
          <!--<el-input v-model="ruleForm.jingshouren"></el-input>-->
        </el-form-item>
        <el-form-item label="备注信息" prop="beizhu">
          <el-input v-model="ruleForm.beizhu"></el-input>
        </el-form-item>
        <!--<el-form-item label="入库明细" prop="nianling">-->
        <!--<el-button type="primary" @click="open">添加入库明细</el-button>-->
        <!--</el-form-item>-->

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
        options:[],
        value: '',
        ruleForm: {
          danjuhao:'',
          shijian:'',
          zongjiage:'',
          jingshouren:'',
          beizhu:'',
        },
        rules: {
          jingshouren: [
            { required: true, message: '请输入供应商', trigger: 'blur' },
          ],
          danjuhao: [
            { required: true, message: '请输入单据号', trigger: 'blur' },
          ],
          shijian: [
            { required: true, message: '请输入时间', trigger: 'blur' },
          ],
          zongjiage: [
            { required: true, message: '请输入总金额', trigger: 'blur' },
          ],
          beizhu: [
            { required: true, message: '请输入备注', trigger: 'blur' },
          ],
        },
      }
    },
    components: {
      VueCropper
    },
    mounted() {
      this.getOptions();
    },
    methods:{
      getOptions(){
        var that=this;
        that.$axios({
          type: "get",
          url:'http://127.0.0.1:9202/kehu/findAll',
          dataType: 'json',
        }).then(res=>{
          that.options=res.data
        }).catch()
      },
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
              danjuhao:that.ruleForm.danjuhao,
              shijian:that.ruleForm.shijian,
              zongjiage: that.ruleForm.zongjiage,
              jingshouren:that.ruleForm.jingshouren,
              beizhu: that.ruleForm.beizhu,
            };
            that.$axios({
              url: 'http://127.0.0.1:9202/chuku/addChuku',
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
