import type { Color } from "csstype";

export type Music = {
  title: string;
  description: string;
  album: string;
  artist: string;
  audioSrc: string;
  lyricSrc: string;
  coverSrc: string;
  themeColor: Color | undefined;
};
