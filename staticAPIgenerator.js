import * as fs from "fs";
import { join } from "path";

// const source = fs.readdirSync(join("source"));
if (fs.existsSync(join("public/api/list.json"))) {
  fs.writeFileSync(join(`public/api/list.json.${Date()}.backup`), 1);
}

// console.log(api);

// const exts = {
//   image: ["png", "jpg", "jfif"],
//   lyric: ["lrc"],
//   audio: ["m4a", "mp3"],
// };
