import { getDiff } from "./utils";
const cases = [
  {
    before: "12345",
    after: "012345",
    expectResult: {
      start: 0,
      end: 0,
      to: "0"
    }
  },
  {
    before: "12345",
    after: "123456",
    expectResult: {
      start: 5,
      end: 5,
      to: "6"
    }
  },
  {
    before: "12345",
    after: "12-345",
    expectResult: {
      start: 2,
      end: 2,
      to: "-"
    }
  },
  {
    before: "12345",
    after: "145",
    expectResult: {
      start: 1,
      end: 3,
      to: ""
    }
  },
  {
    before: "12345",
    after: "1-45",
    expectResult: {
      start: 1,
      end: 3,
      to: ""
    }
  },
  {
    before: "12345",
    after: "1-45-",
    expectResult: {
      start: 1,
      end: 5,
      to: ""
    }
  },
  {
    before: "12345",
    after: "1",
    expectResult: {
      start: 1,
      end: 5,
      to: ""
    }
  },
  {
    before: "12345",
    after: "12342345",
    expectResult: {
      start: 4,
      end: 4,
      to: ""
    }
  }
];

describe("utils", () => {
  test("返回差异信息", () => {
    for (let i = 0; i < cases.length; i++) {
      const { before, after, expectResult } = cases[i];
      const result = getDiff(before, after);
      expect(result.selection.start).toBe(expectResult.start);
      expect(result.selection.end).toBe(expectResult.end);
    }
  });
});
