<template>
  <div class="aside" :class="showAside ? '' : 'hidden'">
    <button class="aside-toggle-btn" @click="showAside = !showAside">
      <font-awesome-icon icon="list" />
    </button>
    <div class="list-container">
      <div class="header">当前播放</div>
      <ul class="list">
        <li
          v-for="(item, index) in list"
          :key="index"
          :class="index === store.status.index ? 'playing' : ''"
          @click="
            store.actions.switch(index);
            showAside = false;
          "
        >
          {{ item.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { usePlayerStore } from "@/stores/player";
const store = usePlayerStore();
const list = store.list;
const showAside = ref(false);
</script>

<style scoped>
.aside {
  position: absolute;
  right: 0;
  height: calc(100% - 5.375rem);
  width: 17.5rem;
  z-index: 999;
  transition: right 0.3s ease-in;
  user-select: none;
}

button.aside-toggle-btn {
  outline: none;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: -1.5rem;
  width: 1.5rem;
  height: 4rem;
  color: #fff;
  border: none;
  background-color: var(--aside-bar-bg-color);
  text-align: center;
  border-radius: 0.5rem 0 0 0.5rem;
}

.aside.hidden {
  right: -17.5rem;
}

.aside .list-container {
  width: 100%;
  height: 100%;
  background-color: var(--aside-bar-bg-color);
  position: relative;
}

.list-container .header {
  position: absolute;
  padding: 0 1rem;
  font-size: 1.5rem;
  color: #fff;
  width: 100%;
  height: 4rem;
  line-height: 4rem;
  background-color: var(--theme-color);
}

.list-container .list {
  color: #fff;
  position: absolute;
  width: 100%;
  height: calc(100% - 4.5rem);
  top: 4.25rem;
  overflow-y: scroll;
  padding-left: 0;
  padding-right: calc(0.5rem - 7px);
}

.list-container .list::-webkit-scrollbar {
  width: 8px;
  /* background: none; */
}

.list-container .list::-webkit-scrollbar-button {
  display: none;
}

.list-container .list::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: rgb(255, 255, 255);
}

.list-container .list > li {
  padding: 0 1.25rem;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.list-container ul > li {
  cursor: pointer;
  line-height: 2rem;
  width: 100%;
}

.list-container ul > li:nth-child(2n) {
  background-color: rgb(40, 40, 40);
}

@keyframes playing {
  to {
    background-position: 0% center;
  }
}

.list-container ul > li.playing {
  position: relative;
  animation: playing 5s linear infinite;
  background-image: linear-gradient(
    90deg,
    var(--list-playing-bg-dark-color) 5%,
    var(--list-playing-bg-color),
    var(--list-playing-bg-dark-color) 95%
  );
  background-size: 400% 100%;
  background-position: 400% center;
}

.list-container ul > li.playing::before {
  content: "▶";
  position: absolute;
  left: 0.25rem;
}

.list-container ul > li:hover {
  background-color: rgb(54, 54, 54);
}
</style>
