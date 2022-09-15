<template>
  <div class="player">
    <PlayerBackground />
    <PlayerHeader />
    <PlayerCenter />
    <PlayerAside />
    <PlayerLoading />
    <PlayerFooter />
  </div>
</template>

<script lang="ts" setup>
import { usePlayerStore } from "@/stores/player";
import PlayerHeader from "../components/player/PlayerHeader.vue";
import PlayerBackground from "../components/player/PlayerBackground.vue";
import PlayerFooter from "../components/player/PlayerFooter.vue";
import PlayerAside from "../components/player/PlayerAside.vue";
import PlayerLoading from "../components/player/PlayerLoading.vue";
import PlayerCenter from "../components/player/PlayerCenter.vue";
import { onMounted } from "vue";

const store = usePlayerStore();
onMounted(() => {
  store.init();
});
</script>

<style scoped>
.player {
  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: black;
}
</style>
