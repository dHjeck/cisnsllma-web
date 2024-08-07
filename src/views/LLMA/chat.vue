<template>
  <div>
    <el-header><h1>Chat with AI</h1></el-header>
    <el-main>
      <el-card class="chat_box">
        <div class="chat_box_1">
          <el-input
            v-model="chat_content"
            class="input_box"
            placecholder="你想问我什么？"
            clearable
          />
        </div>
      </el-card>
    </el-main>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const chat_content = ref("");
</script>

<style lang="scss" scoped>
.chat_box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.input_box {
  width: auto;
}
</style>
