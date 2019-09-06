import { renderHook } from "@testing-library/react-hooks";
import { expect } from "chai";
import sinon, { assert } from "sinon";
import Hooks from "./Hooks";

it("provides initial state", done => {
  const fakeState = {
    snake: [[1, 1]],
    food: [2, 2]
  };
  const fakeEngine = () => fakeState;
  const hooks = Hooks(fakeEngine);
  const { result, waitForNextUpdate } = renderHook(() => hooks(1));
  const [state] = result.current;
  expect(state).to.deep.equal(fakeState);
  done();
});
