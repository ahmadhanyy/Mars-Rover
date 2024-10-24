import Directions from "./directions.js";
import Rover from "./rover.js";

// Move the rover forward
function moveForward(rover, obstacles) {
    const movement = {
        [Directions.NORTH]: () => {
            // Check if there is an obstacle in the next position
            const isObstacle = obstacles.some(obstacle => obstacle[0] === rover.x && obstacle[1] === rover.y + 1);
            rover.y += isObstacle ? 0 : 1;
        },
        [Directions.SOUTH]: () => {
            const isObstacle = obstacles.some(obstacle => obstacle[0] === rover.x && obstacle[1] === rover.y-+ 1);
            rover.y -= isObstacle ? 0 : 1;
        },
        [Directions.EAST]: () => {
            const isObstacle = obstacles.some(obstacle => obstacle[0] === rover.x + 1 && obstacle[1] === rover.y);
            rover.x += isObstacle ? 0 : 1;
        },
        [Directions.WEST]: () => {
            const isObstacle = obstacles.some(obstacle => obstacle[0] === rover.x - 1 && obstacle[1] === rover.y);
            rover.x -= isObstacle ? 0 : 1;
        },
    };
    movement[rover.direction]();
};

// Move the rover backward
function moveBackward(rover, obstacles) {
    const movement = {
        [Directions.NORTH]: () => {
            // Check if there is an obstacle in the next position
            const isObstacle = obstacles.some(obstacle => obstacle[0] === rover.x && obstacle[1] === rover.y - 1);
            rover.y -= isObstacle ? 0 : 1;
        },
        [Directions.SOUTH]: () => {
            const isObstacle = obstacles.some(obstacle => obstacle[0] === rover.x && obstacle[1] === rover.y + 1);
            rover.y += isObstacle ? 0 : 1;
        },
        [Directions.EAST]: () => {
            const isObstacle = obstacles.some(obstacle => obstacle[0] === rover.x - 1 && obstacle[1] === rover.y);
            rover.x -= isObstacle ? 0 : 1;
        },
        [Directions.WEST]: () => {
            const isObstacle = obstacles.some(obstacle => obstacle[0] === rover.x + 1 && obstacle[1] === rover.y);
            rover.x += isObstacle ? 0 : 1;
        },
    };
    movement[rover.direction]();
};

// Rotate the rover to the left
function moveLeft(rover) {
    const newDirection = {
        [Directions.NORTH]: Directions.WEST,
        [Directions.SOUTH]: Directions.EAST,
        [Directions.EAST]: Directions.NORTH,
        [Directions.WEST]: Directions.SOUTH,
    };
    rover.direction = newDirection[rover.direction];
};

// Rotate the rover to the right
function moveRight(rover) {
    const newDirection = {
        [Directions.NORTH]: Directions.EAST,
        [Directions.SOUTH]: Directions.WEST,
        [Directions.EAST]: Directions.SOUTH,
        [Directions.WEST]: Directions.NORTH,
    };
    rover.direction = newDirection[rover.direction];
};

// Map each command to a movement function
const move = {
    'F': moveForward,
    'B': moveBackward,
    'L': moveLeft,
    'R': moveRight,
};

function getPosition(rover) {
    return `(${rover.x}, ${rover.y}) ${rover.direction}`;
};

// Take a string of commands and a rover object and move the rover according to the commands
function translateCommand(commands, rover, obstacles = [[1,4], [3,5], [7,4], [6,4]]) {
    // Last position of the rover
    let [lastX, lastY] = [rover.x, rover.y];
    // Loop through the commands string
    for (let command of commands) {
        // Check if the command exists in the mapping
        if (move[command]) {
            // Call the corresponding function
            move[command](rover, obstacles);
            if (lastX == rover.x && lastY == rover.y && (command == 'F' || command == 'B')) {
                console.log(`${getPosition(rover)} STOPPED`);
                return;
            }
            [lastX, lastY] = [rover.x, rover.y];
        }
    }
    console.log(getPosition(rover));
};

// Example usage
const rover = new Rover(4, 2, Directions.EAST);
translateCommand("FLFFFRFLB", rover);

// Expected output: (6, 5) NORTH STOPPED
