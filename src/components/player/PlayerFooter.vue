<template>
  <div class="footer">
    <div class="time">
      <span class="current">{{ status.currentText }}</span>
      <span class="total">{{ status.durationText }}</span>
    </div>
    <div
      class="progress"
      :style="computeProgressStyle"
      @click="handleProgressChange"
    ></div>
    <div class="main-buttons">
      <button class="lite" @click="mode.changeMode">
        <font-awesome-icon :icon="mode.current.icon" />
      </button>
      <button @click="actions.previous">
        <font-awesome-icon icon="step-backward" />
      </button>
      <button @click="actions.toggle()">
        <font-awesome-icon :icon="!status.isPlaying ? 'play' : 'pause'" />
      </button>
      <button @click="actions.next">
        <font-awesome-icon icon="step-forward" />
      </button>
      <button class="lite" @click="status.openLyric = !status.openLyric">
        词
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { usePlayerStore } from "@/stores/player";
import { computed } from "vue";
const { status, actions, mode } = usePlayerStore();
const computeProgressStyle = computed(() => {
  return {
    backgroundImage: `linear-gradient(90deg, #0075ff 0%, #0075ff ${status.progress}%, #132336 0%, #132336 100%)`,
  };
});

const handleProgressChange = (e: MouseEvent) => {
  actions.progress(e.clientX / window.innerWidth);
};
</script>

<style scoped>
.footer {
  z-index: 100;
  width: 100%;
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 5rem;
  width: 100%;
  background-color: var(--footer-bg-color);
}

.time {
  user-select: none;
  color: #a1a1a1;
  position: absolute;
  bottom: 5.375rem;
  height: 1rem;
  left: 0;
  right: 0;
  font-size: 0.8rem;
  text-align: center;
  line-height: 1rem;
  padding: 0 0.25rem;
}

.time > .current {
  float: left;
}

.time > .total {
  float: right;
}

.progress {
  cursor: pointer;
  position: absolute;
  top: -0.375rem;
  left: 0;
  width: 100%;
  bottom: 5rem;
  height: 0.375rem;
  background-color: var(--progress-inactive-color);
}

.main-buttons {
  width: 100%;
  text-align: center;
}

.main-buttons button {
  margin: 0 0.25rem;
  width: 5rem;
  height: 3rem;
  background-color: #2d2d2d;
  border: none;
  border-radius: 0.3125rem;
  color: var(--btn-font-color);
  font-size: 1rem;
  text-align: center;
  cursor: pointer;
}

.main-buttons button.lite {
  width: 2rem;
  height: 3rem;
  background: none;
}

.main-buttons button:hover {
  filter: brightness(1.2);
}

.main-buttons button.lite:hover {
  color: var(--theme-color);
}
</style>
