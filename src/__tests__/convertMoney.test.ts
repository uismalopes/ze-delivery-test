import { convertMoney } from "../utils/convertMoney";

describe("testing convert money", () => {
  test("Return values correct", () => {
    expect(convertMoney(10.5)).toBe("R$\xa010,50");
    expect(convertMoney(10)).toBe("R$\xa010,00");
  });
  test("Wrong tests", () => {
    expect(convertMoney(10.5)).not.toBe("R$\xa011,5");
    // @ts-ignore
    expect(convertMoney("10")).toEqual(0);
  });
});
