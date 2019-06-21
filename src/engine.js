
import directions from './directions';
const width = 96;
const height = 68;
//snake::Array Array Number
//food::Array Number
//state:: {snake, food, isAlive, previousDirection, direction}
const init = state=>({
    snake: [[width/2, height/2]]
});

const nextMoveMapper = (direction, previousDirection)=>{
    return {
        [directions.up]: point=>[point[0], point[1] - 1],
        [directions.down]: point=>[point[0], point[1] + 1],
        [directions.left]: point=>[point[0]  - 1, point[1]],
        [directions.right]: point=>[point[0] + 1, point[1]],
    };
}

const move = state=>{
    const isOppositeDirection = Math.abs(state.direction - state.previousDirection) === 2;
    const mapper = nextMoveMapper(state.direction, state.previousDirection)[isOppositeDirection ? state.previousDirection : state.direction];
        return {
            snake : state.snake.map(mapper)
        };
}

const next = (state)=>state.snake.length === 0 ? init(state): move(state);


export default next;