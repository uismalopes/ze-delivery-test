import { isEmptyArray } from "../utils/isEmptyArray";

describe("test function isEmptyArray", ()=>{
  test("Return the correct values", ()=>{
    expect(isEmptyArray([])).toEqual(true);
    expect(isEmptyArray({})).toEqual(true);
    expect(isEmptyArray([1])).toEqual(false);
  });
  test("Wrong types", ()=>{
    expect(isEmptyArray("")).toEqual(true);
  });
});