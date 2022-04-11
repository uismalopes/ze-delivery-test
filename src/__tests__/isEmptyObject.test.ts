import { isEmptyObject } from "../utils/isEmptyObject";

describe("test function isEmptyObject", ()=>{
  test("Return the correct values", ()=>{
    expect(isEmptyObject([])).toEqual(true);
    expect(isEmptyObject({})).toEqual(true);
    expect(isEmptyObject({ name: 'ze delivery' })).toEqual(false);
  });
  test("Wrong types", ()=>{
    expect(isEmptyObject("")).toEqual(true);
  });
});