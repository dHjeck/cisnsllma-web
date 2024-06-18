<template>
  <el-conteriner>
    <el-header><h1>结果</h1></el-header>
    <el-main>
      <el-row :gutter="20">
        <el-button type="primary" @click="downloadfile" size="small"
          >点我下载日志</el-button
        ></el-row
      >
      <el-row :gutter="20">
        <el-card style="max-width: 480px; max-height: 300px; overflow: hidden">
          <pre>{{ items }}</pre>
          <p v-if="error">{{ error }}</p>
        </el-card>
      </el-row>
    </el-main>
  </el-conteriner>
</template>

<script lang="ts">
import axios from "axios";

export default {
  data() {
    return {
      items: "",
      error: ""
    };
  },
  created() {
    this.fetchFileContent();
  },
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
    },
    fetchFileContent() {
      axios
        .get("http://localhost:5000/llma/textresult") // 替换为你的后端地址和端口
        .then(response => {
          this.items = response.data.content;
        })
        .catch(error => {
          this.error = "无法获取文件内容。";
          console.error("Error fetching file content:", error);
        });
    }
  }
};
</script>

<style>
.text.item {
  margin: 5px 0;
}

.el-row {
  margin-bottom: 20px;
}
</style>
