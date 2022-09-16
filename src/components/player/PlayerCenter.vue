<template>
  <div class="main">
    <div class="disk-container" v-show="status.ready">
      <div class="disk">
        <div class="stylus" :class="status.isPlaying ? 'playing' : ''">
          <img :src="stylusImage" alt="stylus" />
        </div>
        <div
          class="disk-rotate"
          :style="`transform:rotate(${appearance.diskDegree}deg)`"
        >
          <img :src="diskEdgeImage" alt="disk" class="disk-edge" />
          <img alt="cover" class="cover" :src="source.coverSrc" />
        </div>
      </div>
    </div>
    <div class="user-ops">
      <button
        @click="
          initLikeAnimate = false;
          like = !like;
        "
        :class="[like ? 'like' : 'unlike', initLikeAnimate ? '' : 'animate']"
      >
        <font-awesome-icon :icon="[like ? 'fas' : 'far', 'heart']" />
      </button>
      <button><font-awesome-icon icon="download" /></button>
      <button><font-awesome-icon :icon="['far', 'comment-dots']" /></button>
      <button><font-awesome-icon icon="ellipsis-v" /></button>
    </div>
    <div class="lyric-container" v-show="status.openLyric">
      <div id="lyric" class="lyric overflow">
        {{ lyric.text }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from "@/stores/player";
import stylusImage from "@/assets/image/stylus.png";
import diskEdgeImage from "@/assets/image/disk-edge.png";
import { ref } from "vue";
const like = ref(false);
const initLikeAnimate = ref(true);
const { appearance, status, source, lyric } = usePlayerStore();
</script>

<style scoped>
.main {
  z-index: 2;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 5rem;
}

.disk-container {
  user-select: none;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
}

@media screen and (max-width: 480px) {
  .disk-container {
    width: 85%;
  }
  .lyric-container {
    font-size: 1rem;
    line-height: 2rem;
  }
}

@media screen and (max-width: 768px) and (min-width: 480px) {
  .disk-container {
    width: 60%;
  }
  .lyric-container {
    font-size: 1.25rem;
  }
}

@media screen and (min-width: 768px) and (max-width: 992px) {
  .disk-container {
    width: 40%;
  }
  .lyric-container {
    font-size: 1.5rem;
  }
}

@media screen and (min-width: 992px) and (max-width: 1200px) {
  .disk-container {
    width: 35%;
  }
  .lyric-container {
    font-size: 1.75rem;
  }
}

@media screen and (min-width: 1200px) {
  .disk-container {
    width: 30%;
  }
  .lyric-container {
    font-size: 2rem;
  }
}

.disk {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
}

.stylus {
  position: absolute;
  z-index: 20;
  width: 100%;
  transform: translate(50%, -75%);
}

.disk-rotate {
  position: relative;
  padding-top: 100%;
  width: 100%;
  z-index: 10;
}

.stylus > img {
  -webkit-user-drag: none;
  margin-left: -3.6529%;
  transform-origin: 7.30593% 7.30593%;
  transform: rotate(0deg);
  width: 45%;
  transition: transform 0.4s ease-in-out;
}
.stylus.playing > img {
  transform: rotate(22deg);
}

.disk-rotate > .disk-edge {
  -webkit-user-drag: none;
  left: 0;
  top: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 8;
}

.disk-rotate > .cover {
  -webkit-user-drag: none;
  z-index: 6;
  background-color: #ececec;
  position: absolute;
  width: 64%;
  height: 64%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 7;
}

.user-ops {
  padding: 0 1rem;
  position: absolute;
  left: 0;
  bottom: 5.375rem;
  width: 100%;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-ops > button {
  height: 2rem;
  width: 2rem;
  font-size: 1.5rem;
  margin: 0 1rem;
  cursor: pointer;
  background: none;
  color: #bbbbbb;
  border: none;
  outline: none;
}

@keyframes like {
  50% {
    transform: scale(1.5);
  }
}
@keyframes unlike {
  50% {
    transform: scale(1.5);
  }
}

.user-ops > button.animate.unlike {
  animation: unlike 0.4s linear;
}

.user-ops > button.animate.like {
  color: rgb(228, 43, 43);
  animation: like 0.4s linear;
}

.user-ops > button:hover {
  color: #ffffff;
}

.lyric-container {
  padding: 0 1rem;
  position: absolute;
  left: 0;
  bottom: 1.375rem;
  height: 3rem;
  cursor: default;
  user-select: none;
  text-align: center;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
  /* background-color: #700d0d; */
}

.lyric-container.hidden {
  display: none;
}

.lyric {
  text-align: center;
  color: #ffffff;
  width: 100%;
  line-height: 3rem;
}
</style>
