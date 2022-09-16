import { getLyric } from "@/api/lyric";
import { ref, type Ref } from "vue";

type LyricLine = {
  time: number;
  lyric: string;
};

type LyricTimeline = Array<LyricLine>;

interface Lyric {
  timeline: LyricTimeline;
  text: Ref<string>;
  pointer: number;
  load(url: string): void;
  trigger(curr: number): void;
  progress(curr: number): void;
}

const lyric: Lyric = {
  timeline: [],
  text: ref(""),
  pointer: -1,
  async load(url: string) {
    this.timeline = [];
    this.pointer = -1;
    this.text.value = "";
    if (url === null) {
      this.timeline.push({ time: 0, lyric: "暂无歌词" });
      return;
    }
    if (url === "") {
      this.timeline.push({ time: 0, lyric: "纯音乐，请欣赏" });
      return;
    }
    const data = await getLyric(url);
    if (!data) {
      return;
    }
    let result;
    const regExp = /\[(\d{2}):(\d{2})\.(\d{2,3})](.*)/g;
    this.timeline.push();
    while ((result = regExp.exec(data))) {
      const seconds =
        parseInt(result[1]) * 60 +
        parseInt(result[2]) +
        parseInt(result[3]) * 0.001;
      this.timeline.push({ time: seconds, lyric: result[4] });
    }
  },
  trigger(curr: number) {
    let changed = false;
    while (
      this.pointer + 1 < this.timeline.length &&
      this.timeline[this.pointer + 1].time <= curr
    ) {
      this.pointer++;
      changed = true;
    }
    if (changed) {
      this.text.value = this.timeline[this.pointer].lyric;
    }
  },
  progress(curr: number) {
    this.pointer = 0;
    while (
      this.pointer + 1 < this.timeline.length &&
      this.timeline[this.pointer + 1].time <= curr
    ) {
      this.pointer++;
    }
    this.text.value = this.timeline[this.pointer].lyric;
  },
};

export { lyric };
