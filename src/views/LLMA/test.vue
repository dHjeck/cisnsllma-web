<template>
  <el-conteriner>
    <el-header><h1>结果</h1></el-header>
    <el-main class="main_conteriner">
      <el-row :gutter="20" justify="center">
        <el-col :span="10">
          <el-card style="width: auto; height: auto">
            <div class="score_container">
              <div class="score_text">
                <h1>您的得分为：</h1>
                <p>如果您看不到分数则为扫描未完成，请稍等。</p>
              </div>
              <div class="score_show">
                <el-progress type="circle" :percentage="100">
                  <span class="circle_text">{{ you_score }}/10</span>
                </el-progress>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="10">
          <el-card
            style="
              display: flex;
              justify-content: center;
              width: auto;
              height: auto;
            "
          >
            <div style="justify-content: center">
              <img src="../../img/智御logo.jpg" alt="智御logo" class="logo" />
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20" justify="center">
        <el-col :span="20">
          <el-card style="width: auto; max-height: auto; overflow: hidden">
            <el-scrollbar max-height="400px">
              <pre>{{ items }}</pre>
              <p v-if="error">{{ error }}</p>
            </el-scrollbar>
          </el-card>
        </el-col>
      </el-row>
      <div class="button_container">
        <el-button
          class="download_btn"
          type="primary"
          @click="downloadfile"
          size="small"
          >点我下载日志</el-button
        >
      </div>
    </el-main>
  </el-conteriner>
</template>

<script lang="ts">
import axios from "axios";

export default {
  data() {
    return {
      items: "",
      error: "",
      you_score: null
    };
  },
  created() {
    this.fetchFileContent();
    this.getScore();
  },
  props: {
    percentage: {
      type: Number,
      required: true
    }
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
    },
    format(percentage: Number): string {
      return percentage == 20 ? "Runing" : `${percentage}%`;
    },
    getScore() {
      axios
        .get("http://localhost:5000/llma/score") // 替换为你的后端地址和端口
        .then(response => {
          this.you_score = response.data.score;
        }).catch;
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

.main_conteriner {
  display: flex;
  flex-direction: column;
  align-items: left;
}

.list_cards {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button_container {
  display: flex;
  justify-content: center;
}

.download_btn {
  width: 100px;
  height: 40px;
  margin-top: 10px;
}

.circle_text {
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 28px;
}

.score_container {
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
}

.score_text {
  margin-left: 10px;
}

.score_show {
  display: flex;
  margin-left: auto;
}

.logo {
  width: 160px;
  height: auto;
}
</style>
