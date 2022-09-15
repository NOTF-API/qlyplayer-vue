<template>
  <div class="background">
    <img :src="source.coverSrc" v-show="status.ready" />
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from "@/stores/player";
const { source, status } = usePlayerStore();
</script>

<style scoped>
.background {
  z-index: 1;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.background > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(100px) brightness(50%);
}
</style>
