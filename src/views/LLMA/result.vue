<template>
  <el-conteriner>
    <el-header>结果</el-header>
    <el-main
      ><el-button type="primary" @click="downloadfile" size="small"
        >点我下载日志</el-button
      >
    </el-main>
  </el-conteriner>
</template>

<script lang="ts">
import axios from "axios";

export default {
  methods: {
    downloadfile() {
      axios
        .get("http://127.0.0.1:5000/llma/download", { responseType: "blob" })
        .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "result.txt");
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(url); // 释放URL对象
          document.body.removeChild(link); // 移除临时创建的a元素
        })
        .catch(error => {
          console.log("下载文件失败", error);
        });
    }
  }
};
</script>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>
