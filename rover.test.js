import { Directions } from "./directions.js";
import { Rover } from "./rover.js";
import { moveForward, moveBackward, moveLeft, moveRight, translateCommand } from "./index.js";

describe('Rover Movement', () => {

    test('Rover moves forward without obstacles', () => {
        const rover = new Rover(2, 2, Directions.NORTH);
        moveForward(rover, []);
        expect(rover.y).toBe(3);  // Rover should move north from (2, 2) to (2, 3)
    });

    test('Rover stops when encountering an obstacle while moving forward', () => {
        const rover = new Rover(2, 2, Directions.NORTH);
        moveForward(rover, [[2, 3]]);  // Obstacle at (2, 3)
        expect(rover.y).toBe(2);  // Rover should not move
    });

    test('Rover moves backward without obstacles', () => {
        const rover = new Rover(2, 2, Directions.SOUTH);
        moveBackward(rover, []);
        expect(rover.y).toBe(3);  // Rover should move south from (2, 2) to (2, 3)
    });

    test('Rover stops when encountering an obstacle while moving backward', () => {
        const rover = new Rover(2, 2, Directions.SOUTH);
        moveBackward(rover, [[2, 3]]);  // Obstacle at (2, 3)
        expect(rover.y).toBe(2);  // Rover should not move
    });

    test('Rover rotates left from north to west', () => {
        const rover = new Rover(2, 2, Directions.NORTH);
        moveLeft(rover);
        expect(rover.direction).toBe(Directions.WEST);
    });

    test('Rover rotates right from north to east', () => {
        const rover = new Rover(2, 2, Directions.NORTH);
        moveRight(rover);
        expect(rover.direction).toBe(Directions.EAST);
    });

    test('Translate commands without obstacles', () => {
        const rover = new Rover(4, 2, Directions.EAST);
        translateCommand('FLFFFRFLB', rover, []);
        expect(rover.x).toBe(6);  // Final position x after executing commands
        expect(rover.y).toBe(4);  // Final position y
        expect(rover.direction).toBe(Directions.NORTH);  // Final direction
    });

    test('Translate commands with obstacles', () => {
        const rover = new Rover(4, 2, Directions.EAST);
        translateCommand('FLFFFRFLB', rover, [[1,4], [3,5], [7,4], [6,4]]);
        expect(rover.x).toBe(6);  // Rover should stop due to obstacle at (6, 4)
        expect(rover.y).toBe(5);
        expect(rover.direction).toBe(Directions.NORTH);
    });
});
