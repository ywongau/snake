import Hooks from './Hooks';
import directions from './engine/directions';
import { expect } from 'chai';
import { renderHook } from '@testing-library/react-hooks';
import sinon from 'sinon';
const deafaultFakeSetInterval = () => 1;
const deafaultFakeClearInterval = () => undefined;

describe('hooks', () => {
  it('provides initial state', () => {
    const fakeGameState = {
      snake: [[1, 1]],
      food: [2, 2]
    };
    const fakeEngine = { init: () => fakeGameState };
    const hooks = Hooks(
      () => fakeEngine,
      deafaultFakeSetInterval,
      deafaultFakeClearInterval
    );
    const { result } = renderHook(() => hooks());
    const [state] = result.current;
    expect(state.game).to.deep.equal(undefined);
    expect(state.direction).to.equal(directions.up);
    expect(state.timer).to.equal(undefined);
  });
  it('updates state', () => {
    const fakeGameState = {
      snake: [[1, 1]],
      food: [2, 2]
    };
    const fakeEngine = { init: sinon.stub().returns(fakeGameState) };
    const fakeTimerId = 1;
    const fakeSetInterval = (g) => {
      g();
      return fakeTimerId;
    };
    const hooks = Hooks(fakeEngine, fakeSetInterval, deafaultFakeClearInterval);
    const { result } = renderHook(hooks);
    const [_, start] = result.current;
    start();
    expect(result.current[0].game).to.deep.equal(fakeGameState);
    expect(result.current[0].timer).to.deep.equal(fakeTimerId);
  });
  it('calls clearInverval if dead', () => {
    const fakeGameState = {
      snake: [[1, 1]],
      food: [2, 2],
      isAlive: true
    };
    const fakeEndGameState = {
      snake: [[0, 1]],
      food: [2, 2],
      isAlive: false
    };
    const fakeEngine = {
      next: sinon.stub().returns(fakeEndGameState),
      init: sinon.stub().returns(fakeGameState)
    };

    const fakeTimerId = 1;
    const fakeSetInterval = sinon.stub().returns(fakeTimerId);
    const fakeClearInterval = sinon.spy();
    const hooks = Hooks(fakeEngine, fakeSetInterval, fakeClearInterval);
    const { result } = renderHook(hooks);
    const [_, start] = result.current;
    start();
    fakeSetInterval.args[0][0]();
    fakeSetInterval.args[0][0]();
    sinon.assert.calledWith(fakeClearInterval, fakeTimerId);
  });
  it('changes direction', () => {
    const fakeGameState = {
      snake: [[1, 1]],
      food: [2, 2]
    };
    const fakeEngine = {
      next: sinon.stub().returns(fakeGameState)
    };
    const hooks = Hooks(
      fakeEngine,
      deafaultFakeSetInterval,
      deafaultFakeClearInterval
    );
    const { result } = renderHook(hooks);

    const [state, start] = result.current;
    start();
    document.body.dispatchEvent(
      new KeyboardEvent('keydown', {
        keyCode: directions.left
      })
    );
    expect(result.current[0].direction).to.equal(directions.left);
  });
  it('ignores non-arrow keys', () => {
    const fakeGameState = {
      snake: [[1, 1]],
      food: [2, 2]
    };
    const fakeEngine = {
      next: sinon.stub().returns(fakeGameState),
      init: sinon.spy()
    };
    const fakeSetInterval = (g) => g();
    const hooks = Hooks(fakeEngine, fakeSetInterval, deafaultFakeClearInterval);
    const { result } = renderHook(hooks);
    const [state, start] = result.current;
    start();
    document.body.dispatchEvent(
      new KeyboardEvent('keydown', {
        keyCode: 99
      })
    );
    expect(result.current[0].direction).to.equal(directions.up);
  });
});
