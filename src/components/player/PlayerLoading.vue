<template>
  <div class="loading-mask" v-show="!message.hidden">
    <div class="loading-box">
      <span class="loading-text">{{ message.text }}</span>
      <font-awesome-icon
        :icon="message.type"
        :class="message.type === 'spinner' ? 'spinner' : ''"
        class="smart-icon"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from "@/stores/player";

const { message } = usePlayerStore();
</script>

<style scoped>
.loading-mask {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 9999999;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-mask > .loading-box {
  padding: 1rem;
  width: 20rem;
  height: 4rem;
  border-radius: 0.5rem;
  color: #000;
  overflow: hidden;
  background-color: #fff;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-box > span {
  overflow: hidden;
  height: 2rem;
  line-height: 2rem;
  white-space: nowrap;
}

.loading-box > .smart-icon {
  float: right;
  font-size: 2rem;
  width: 2rem;
  height: 2rem;
  line-height: 2rem;
  animation: none;
}

.loading-box > .spinner {
  animation: spin 1s linear infinite;
}
</style>
