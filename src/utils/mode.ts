interface PlayMode {
  icon: string;
  next(cur: number, len: number): number;
  previous(cur: number, len: number): number;
  onEnd(cur: number, len: number): number;
}

const loop: PlayMode = {
  icon: "recycle",
  next: function (cur, len): number {
    if (++cur === len) {
      cur = 0;
    }
    return cur;
  },
  previous: function (cur, len): number {
    if (--cur < 0) {
      cur = len - 1;
    }
    return cur;
  },
  onEnd: function (cur, len): number {
    return cur;
  },
};

const order: PlayMode = {
  icon: "list-ol",
  next: function (cur, len): number {
    if (++cur === len) {
      cur = 0;
    }
    return cur;
  },
  previous: function (cur, len): number {
    if (--cur < 0) {
      cur = len - 1;
    }
    return cur;
  },
  onEnd: function (cur, len): number {
    return this.next(cur, len);
  },
};

function __switch__(cur: number, len: number) {
  let res = -1;
  do {
    res = Math.floor(Math.random() * len);
  } while (cur === res);
  return res;
}

const random: PlayMode = {
  icon: "random",
  next: function (cur, len): number {
    return __switch__(cur, len);
  },
  previous: function (cur, len): number {
    return __switch__(cur, len);
  },
  onEnd: function (cur, len): number {
    return this.next(cur, len);
  },
};

export { loop, order, random };
