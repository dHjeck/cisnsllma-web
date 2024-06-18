<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>端口扫描结果</span>
        <el-button type="primary" @click="download">点我下载</el-button>
      </div>
    </template>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="ip" label="IP地址" width="180" />
      <el-table-column prop="ports" label="端口" widith="180" />
      <el-table-column prop="status" label="状态" width="180" />
    </el-table>
    <template #footer>Footer content</template>
  </el-card>
</template>

<script lang="ts">
import axios from "axios";
import { ElMessage } from "element-plus";

export default {
  setup() {
    const download = async () => {
      try {
        const response = await axios.get("http://localhost:5000/download");
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
      ElMessage("下载成功");
    };
    return {
      download
    };
  }
};
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}
</style>
