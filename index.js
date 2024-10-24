import { Directions } from "./directions.js";
import { Rover } from "./rover.js";

// Move the rover forward
function moveForward(rover, obstacles) {
    // Object carries the movement functions for each direction
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
    // Object carries the movement functions for each direction
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
    // Object carries the new direction for each direction
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
    // Object carries the new direction for each direction
    const newDirection = {
        [Directions.NORTH]: Directions.EAST,
        [Directions.SOUTH]: Directions.WEST,
        [Directions.EAST]: Directions.SOUTH,
        [Directions.WEST]: Directions.NORTH,
    };
    rover.direction = newDirection[rover.direction];
};

// Object carries the movement functions for each command
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
function translateCommand(commands, rover, obstacles) {
    // Rover's position before movement
    let [lastX, lastY] = [rover.x, rover.y];
    // Loop through the commands string
    for (let command of commands) {
        // Check if the command exists in the move object
        if (move[command]) {
            // Call the corresponding function
            move[command](rover, obstacles);
            // Check if the rover's position does not change
            if (lastX == rover.x && lastY == rover.y && (command == 'F' || command == 'B')) {
                // Stop the rover due to an obstacle
                console.log(`${getPosition(rover)} STOPPED`);
                return;
            }
            // Update the last position
            [lastX, lastY] = [rover.x, rover.y];
        }
    }
    console.log(getPosition(rover));
};

export { moveForward, moveBackward, moveLeft, moveRight, translateCommand };

// Example usage
const rover = new Rover(4, 2, Directions.EAST);
translateCommand("FLFFFRFLB", rover, [[1,4], [3,5], [7,4], [6,4]]);

// Expected output: (6, 5) NORTH STOPPED