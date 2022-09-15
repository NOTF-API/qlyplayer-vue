<template>
  <div class="header">
    <div class="information">
      <div id="inf-title" class="title overflow">{{ playing.title }}</div>
      <div id="inf-desc" class="description overflow">
        {{ playing.description }}
      </div>
      <div id="inf-art" class="artist-album overflow">
        {{ playing.artist }}
        {{ playing.artist && playing.album ? "-" : "" }}
        {{ playing.album }}
      </div>
    </div>
    <div class="controls">
      <button @click="handleFullScreenToggle">
        <font-awesome-icon :icon="!isFullscreen ? 'expand' : 'compress'" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from "@/stores/player";
import { ref } from "vue";
import screenfull from "screenfull";

const { playing } = usePlayerStore();

const isFullscreen = ref(false);

screenfull.on("change", () => {
  isFullscreen.value = screenfull.isFullscreen;
});

const handleFullScreenToggle = async () => {
  async function requestFullScreen() {
    if (screenfull.isEnabled) {
      await screenfull.request();
    }
  }
  async function requestCancelFullScreen() {
    if (screenfull.isEnabled) {
      await screenfull.exit();
    }
  }
  if (isFullscreen.value === false) {
    await requestFullScreen();
  } else {
    await requestCancelFullScreen();
  }
};
</script>

<style scoped>
.header {
  z-index: 3;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 7.5rem;
}

.header .information {
  padding: 1.25rem;
  color: var(--basic-font-color);
}

.header .controls {
  position: absolute;
  right: 0;
  top: 1.25rem;
  height: 2rem;
  padding: 0 1rem;
}

@media screen and (max-width: 480px) {
  .header .controls {
    display: none;
  }
}

.controls > button {
  float: right;
  cursor: pointer;
  margin: 0 0.5rem;
  font-size: 1.5rem;
  height: 2rem;
  width: 2rem;
  background: none;
  border: none;
  color: var(--btn-font-color);
}

.controls > button:hover {
  color: var(--theme-color);
}

.title {
  width: 100%;
  line-height: 3.125rem;
  height: 3.125rem;
  font-size: 2rem;
}

.description {
  width: 100%;
  line-height: 0.875rem;
  font-size: 0.875rem;
  margin-bottom: 0.375rem;
  font-style: italic;
  color: var(--dark-font-color);
}

.artist-album {
  width: 100%;
  color: var(--dark-font-color);
  line-height: 1.5rem;
  line-height: 1rem;
  font-size: 1rem;
}
</style>
