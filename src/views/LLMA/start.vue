<template>
  <el-conteriner>
    <el-header>
      <h1>协同智盾漏洞扫描工具</h1>
    </el-header>
    <el-main
      style="display: flex; align-items: center; justify-content: center"
    >
      <el-card
        style="
          width: 450px;
          height: auto;
          margin-top: auto;
          margin-bottom: auto;
        "
      >
        <div class="main_text">
          <p>
            欢迎使用协同智盾漏洞扫描工具，请按照以下步骤开始使用：<br />
            1. 输入要扫描的目标地址并提交<br />
            2. 点击“开始扫描”按钮<br />
            3. 等待扫描结果
          </p>
        </div>
        <div class="main_input">
          <el-row :gutter="10">
            <el-col
              ><el-text style="margin-left: 20px"
                >请输入目标地址：{{ input }}</el-text
              ></el-col
            >
            <el-col :span="3"
              ><el-input
                v-model="input"
                style="width: 300px; margin-top: 10px; margin-left: 40px"
                placeholder="请输入目标地址"
            /></el-col>
          </el-row>
          <el-row :gutter="20" style="justify-content: center">
            <el-col :span="10">
              <el-button
                class="clikbuttom"
                type="primary"
                @click="_submit"
                size="small"
                >提交</el-button
              >
            </el-col>
            <el-col :span="10">
              <el-button
                class="clikbuttom"
                type="primary"
                @click="run_scan"
                size="small"
                >开始扫描</el-button
              >
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-main>
    <div class="bottom_text">
      <p>2024智御</p>
    </div>
  </el-conteriner>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";

const input = ref(""); // 使用ref管理输入值
const _submit = async () => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/api/submit",
      {
        target: input.value
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

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
const run_scan = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:5000/llma/scan");

    if (response.status === 200) {
      console.log("请求成功，响应状态码：", response.status);

      ElMessage({
        message: "开始扫描",
        type: "success"
      });
    } else {
      console.error("请求失败，响应状态码：", response.status);

      ElMessage({
        message: "开始扫描失败",
        type: "error"
      });
    }
  } catch (error) {
    console.error("请求失败，响应状态码：", error);

    ElMessage({
      message: "开始扫描失败",
      type: "error"
    });
  }
};
</script>

<style>
.bottom_text {
  display: flex;
  align-items: center;
  justify-content: center;
}

.main_text {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
}

.main_input {
  align-items: center;
  justify-content: center;
}

.clikbuttom {
  width: 100px;
  height: 30px;
  margin-top: 15px;
  margin-bottom: 20px;
  margin-left: 20px;
}
</style>
