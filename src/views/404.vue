<template>
  <div>
    <div>404</div>
    <div>还有自动返回首页</div>
    <!--  -->
    <el-button @click="$router.replace('/system/user')"> 立即返回首页 </el-button>
  </div>
</template>
<script>
export default {
  dara() {
    return {
      seconds: 10,
    };
  },
  // mounted() {
  //   const timer = setInterval(() => {
  //     this.seconds -= 1;
  //   }, 1000);
  //   if (this.seconds <= 0) {
  //     clearInterval(timer);
  //     this.$router.replace('/login');
  //   }
  // },
};
</script>
