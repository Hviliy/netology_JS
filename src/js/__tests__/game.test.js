import { play } from '../game.js';
import Warrior from '../players/Warrior.js';
import Archer from '../players/Archer.js';

describe('Game play', () => {
    test('play returns the last alive player or null', () => {
        const w = new Warrior(0, 'Warrior');
        const a = new Archer(2, 'Archer');
        const arr = [w, a];

        jest.spyOn(console, 'log').mockImplementation(() => {});

        const winner = play(arr);
        expect(winner).toBeTruthy();
    });
});
