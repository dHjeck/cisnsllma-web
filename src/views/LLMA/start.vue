<template>
  <el-conteriner>
    <el-header>
      <h1>协同智盾漏洞扫描工具</h1>
    </el-header>
    <el-main>
      <p>
        欢迎使用协同智盾漏洞扫描工具，请按照以下步骤开始使用：<br />
        1. 输入要扫描的目标地址<br />
        2. 点击“开始扫描”按钮<br />
        3. 等待扫描结果
      </p>
      <el-row :gutter="10">
        <el-col><el-text>请输入目标地址：</el-text></el-col>
        <el-col :span="3"
          ><el-input v-model="input" autosize placeholder="请输入目标地址"
        /></el-col>
        <el-col :span="3"
          ><el-button type="primary" @click="_submit" size="small"
            >提交</el-button
          ></el-col
        >
        <el-button type="primary" @click="run_scan" size="small"
          >开始扫描</el-button
        >
      </el-row>
    </el-main>
    <el-footer>2024协同智防</el-footer>
  </el-conteriner>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";

const input = ref(""); // 使用ref管理输入值
const _submit = async () => {
  try {
    const response = await axios.post("http://120.0.0.1:5000/api/submit", {
      traget: input.value
    });

    if (response.status === 200) {
      console.log("请求成功，响应状态码：", response.status);

      ElMessage({
        message: "提交成功",
        type: "success"
      });
    } else {
      console.error("请求失败，响应状态码：", response.status);

      ElMessage({
        message: "提交失败",
        type: "error"
      });
    }
  } catch (error) {
    console.error("请求出错：", error);

    ElMessage({
      message: "提交出错",
      type: "error"
    });
  }
};
const run_scan = () => {
  axios.get("http://120.0.0.1:5000/llma/scan");
  ElMessage({
    message: "开始扫描",
    type: "success"
  });
  return {
    run_scan
  };
};
</script>
