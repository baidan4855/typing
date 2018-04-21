const getDiffLeft = (before, after) => {
  for (let i = 0; i < after.length; i++) {
    if (after[i] !== before[i]) {
      return i;
    }
  }
  return after.length;
};

export const getDiff = (before, after) => {
  let start = 0,
    end = 0,
    to = "";
  start = getDiffLeft(before, after);
  const reverseBefore = before
    .substring(start)
    .split("")
    .reverse()
    .join("");
  const reverseAfter = after
    .substring(start)
    .split("")
    .reverse()
    .join("");
  const diffRight = getDiffLeft(reverseBefore, reverseAfter);
  end = before.length - diffRight;
  to = after.substring(start, after.length - diffRight);
  return {
    selection: {
      start,
      end
    },
    to
  };
};
