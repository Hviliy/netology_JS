import Crossbowman from '../players/Crossbowman.js';
import LongBow from '../weapons/LongBow.js';

describe('Crossbowman', () => {
    test('constructor sets properties', () => {
        const c = new Crossbowman(10, 'Робин Гуд');
        expect(c.life).toBe(85);
        expect(c.attack).toBe(8);
        expect(c.luck).toBe(20);
        expect(c.description).toBe('Арбалетчик');
        expect(c.weapon).toBeInstanceOf(LongBow);
    });
});
