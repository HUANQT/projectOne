<!-- eslint-disable import/no-cycle -->
<template>
  <div class="logn">
    <div class="from">
      <h3 class="title">西藏阜康肿瘤医院 管理系统</h3>

      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="10px"
        class="demo-ruleForm"
      >
        <!-- 账户 -->
        <div class="name">
          <el-form-item label="" prop="pass">
            <Icon icon="ic:baseline-person" class="my" />
            <el-input type="user" placeholder="账号" v-model="ruleForm.pass" autocomplete="off">
            </el-input>
          </el-form-item>
        </div>
        <!-- *密码 -->
        <div class="name">
          <el-form-item label="" prop="checkPass">
            <Icon icon="mdi:password" class="my" />
            <el-input
              placeholder="请输入密码"
              v-model="ruleForm.checkPass"
              show-password
            ></el-input>
          </el-form-item>
        </div>
        <!-- 验证码 -->
        <div class="name">
          <div label="" prop="age" class="yzm">
            <el-form-item label="" prop="age">
              <Icon icon="mdi:security-lock-outline" class="my" />
              <el-input
                placeholder="验证码"
                v-model="ruleForm.age"
                class="h-[45px] mr-1"
              ></el-input>
            </el-form-item>
            <div class="auth">
              <img :src="picUrl" alt="" @click="getYan" />
            </div>
          </div>
        </div>
        <!-- *记住密码 -->
        <el-form-item>
          <el-checkbox v-model="checked">记住密码</el-checkbox>
        </el-form-item>
        <!-- *按钮跳转 -->
        <el-form-item class="btn">
          <el-button type="primary" class="full-width" @click="submitForm('ruleForm')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <div class="el-login-footer">
      <span>Copyright ©2021 All Rights Reserved.</span>
    </div>
  </div>
</template>
<script>
import { loginApi, captchaImageAPi } from '@/service';

const { log } = console;
export default {
  async created() {
    // 自发 this指向当前自发进行的实例
    this.getYan();
  },
  data() {
    const validatePass3 = (rule, value, callback) => {
      if (value !== '') {
        callback();
      } else {
        callback(new Error('请输入验证码'));
      }
    };
    // 账户
    const validatePass = (rule, value, callback) => {
      if (value !== '') {
        callback();
      } else {
        callback(new Error('请输入正确的账户'));
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value !== '') {
        callback();
      } else {
        callback(new Error('请输入正确的密码'));
      }
    };
    return {
      checked: false,
      ruleForm: {
        pass: '',
        checkPass: '',
        age: '',
      },
      rules: {
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        age: [{ validator: validatePass3, trigger: 'blur' }],
      },
      picUrl: '',
      uuid: '',
      dluuid: '',
    };
  },
  methods: {
    async getFund() {
      const denglu = await loginApi({
        username: this.ruleForm.pass,
        password: this.ruleForm.checkPass,
        code: this.ruleForm.age,
        uuid: this.uuid,
        loginIP: '192.168.68.221',
      });
      log(denglu);
      // 保存登录凭证
      if (denglu.data.code === 200) {
        window.localStorage.setItem('token', denglu.data.data);

        this.$store.dispatch('getAdminMenns');
        this.$router.push('/system/user');
        // 本地存储
        this.$message({
          message: '登录成功',
          type: 'success',
        });
      } else {
        this.$message('登录失败', {
          type: '登录失败',
        });
      }
      // this.dluuid = denglu.data.data.uuid;
    },
    async getYan() {
      const yanzhangma = await captchaImageAPi();
      log(yanzhangma);
      const picUrls = yanzhangma.data.data.img;
      this.picUrl = `data:image/jpeg;base64,${picUrls}`;
      this.uuid = yanzhangma.data.data.uuid;
    },
    async submitForm(formName) {
      this.$refs[formName].validateField('checkPass', async (errorMessage) => {
        if (errorMessage) {
          this.$message.error('密码输入错误');
          return;
        }
        // 如果密码校验通过，再校验其他字段
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            // 所有验证通过，调用 getFund 方法
            this.getFund();
            // if (this.dluuid !== this.uuid) {
            //   this.$message.error('验证码错误');
            //   return;
            // }
          }
        });
      });
    },
  },
};
</script>

<style scoped lang="less">
/* 在全局样式表中 */
::v-deep .el-input__inner {
  padding: 0 22px;
  /* 您的样式 */
}
// 整体
.logn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-image: url(./img/bg.3d9a89e4.jpg);
  background-size: cover;
  position: relative;
  // 百块
  .from {
    width: 350px;
    height: 387px;
    margin: auto;
    background-color: #fff;
    padding: 25px;
    border-radius: 6px;
    transform: translateX(-10%);
    // 医院名
    .title {
      margin: 0 auto 30px auto;
      text-align: center;
      color: #707070;
      font-weight: 700;
    }
    // 账户
    .name {
      width: 100%;
      height: 38px;
      margin-bottom: 22px;
      position: relative;
      // 输入框前的图表
      .my {
        position: absolute;
        z-index: 1;
        width: 20px;
        height: 39px;
        margin-left: 2px;
        color: #ccc;
        top: 0;
      }
      // 密码
      .psa {
        margin-right: 10px;
      }
      // 验证码
      .yzm {
        display: flex;
      }
      .auth {
        width: 99px;
        height: 40px;
        cursor: pointer;
        // 验证码后的图片
        img {
          margin-left: 10px;
          width: 90px;
          height: 40px;
        }
      }
    }

    // 记住密码
    .lable {
      font-size: 14px;
      margin: 0px 0px 25px;
    }
  }
  .full-width {
    width: 100%;
  }
  .el-login-footer {
    height: 40px;
    line-height: 40px;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    color: #fff;
    font-family: Arial;
    font-size: 12px;
    letter-spacing: 1px;
  }
}
</style>
