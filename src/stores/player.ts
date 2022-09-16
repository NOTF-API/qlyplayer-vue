import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import type { Music } from "./types";
import { format } from "@/utils/time";
import { getList } from "@/api/music";
import * as storage from "@/utils/localStorage";
import {
  loop as loopMode,
  order as orderMode,
  random as randomMode,
} from "@/utils/mode";
import { lyric as Lyric } from "@/utils/lyric";

export const usePlayerStore = defineStore("player", () => {
  const animateCallback = () => {
    if (audio.currentTime == audio.duration && audio.ended) {
      actions.switch(
        mode.list[mode.currentIndex].onEnd(status.index, list.length)
      );
      return;
    }
    const curr = audio.currentTime;
    const duration = audio.duration;
    status.currentText = format(curr);
    status.durationText = format(duration);
    status.progress = (audio.currentTime / audio.duration) * 100;
    if (audio.paused) {
      return;
    }
    appearance.diskDegree += 0.1;
    lyric.trigger(curr);
  };
  const beginAnimate = () => {
    function animationLoop() {
      animate = requestAnimationFrame(animationLoop);
      animateCallback();
    }
    animationLoop();
  };
  const cancleAnimate = () => {
    cancelAnimationFrame(animate);
  };
  const url = ref("/api/list.json");
  const message = reactive({
    hidden: true,
    type: "warning",
    text: "警告",
    begin(text: string) {
      text && (this.text = text);
      this.type = "spinner";
      this.hidden = false;
    },
    end() {
      this.hidden = true;
      this.text = "";
    },
    change(text: string) {
      this.text = text;
    },
    warning(text: string) {
      this.type = "warning";
      this.text = text;
      this.hidden = false;
    },
  });
  const actions = {
    play() {
      audio.play();
      status.isPlaying = true;
      beginAnimate();
    },
    pause() {
      audio.pause();
      cancleAnimate();
      status.isPlaying = false;
    },
    async next() {
      await this.switch(
        mode.list[mode.currentIndex].next(status.index, list.length)
      );
    },
    async previous() {
      await this.switch(
        mode.list[mode.currentIndex].previous(status.index, list.length)
      );
    },
    // toggle from play/pause
    toggle() {
      if (!audio.paused) {
        this.pause();
      } else {
        this.play();
      }
    },
    async switch(index: number) {
      status.isPlaying = false;
      cancleAnimate();
      Object.assign(playing, list[index]);
      status.index = index;
      message.begin("加载音乐中");
      await load();
      message.end();
      if (status.ready) {
        this.play();
      }
    },
    progress(progress: number) {
      audio.currentTime = progress * audio.duration;
      lyric.progress(audio.currentTime);
      animateCallback();
    },
  };

  const status = reactive({
    ready: false,
    index: 0,
    isPlaying: false,
    progress: 0,
    currentText: "00:00.00",
    durationText: "00:00.00",
    openLyric: storage.getBoolean("openLyric"),
    openSpectrum: false,
  });

  const list: Array<Music> = reactive([]);

  const mode = {
    list: [orderMode, loopMode, randomMode],
    currentIndex: (() => {
      return storage.getInteger("mode.currentIndex");
    })(),
    changeMode() {
      if (this.currentIndex + 1 === this.list.length) {
        this.currentIndex = 0;
      } else {
        this.currentIndex++;
      }
      storage.set("mode.currentIndex", this.currentIndex);
    },
  };

  const playing = <Music>reactive({});

  const source = reactive({
    coverSrc: "",
  });

  const appearance = reactive({
    diskDegree: 0,
    themeColor: "#66ccff",
  });

  const audio = new Audio();

  const lyric = Lyric;

  let animate = -1;

  async function init() {
    let data: Array<Music>;
    message.begin("请求歌单中");
    try {
      data = await getList(url.value);
      data.forEach((el) => {
        list.push(el);
      });
      message.end();
    } catch {
      message.warning("抱歉，请求歌单错误");
      return;
    }
    await actions.switch(0);
    status.ready = true;
  }

  async function load() {
    source.coverSrc = "";
    appearance.diskDegree = 0;
    const coverPromise = new Promise((resolve, reject) => {
      const cover = new Image();
      cover.src = playing.coverSrc || "";
      cover.onload = () => {
        source.coverSrc = cover.src;
        resolve(cover.src);
      };
      cover.onerror = reject;
    });
    const lyricPromise = new Promise((resolve) => {
      resolve(lyric.load(playing.lyricSrc));
    });
    const musicPromise = new Promise((resolve, reject) => {
      audio.src = playing.audioSrc;
      audio.oncanplay = () => {
        resolve(audio.src);
      };
      audio.onerror = reject;
    });
    await Promise.all([musicPromise, lyricPromise, coverPromise]);
  }

  return {
    url,
    message,
    actions,
    status,
    list,
    mode,
    playing,
    source,
    appearance,
    audio,
    animate,
    lyric,
    init,
  };
});
