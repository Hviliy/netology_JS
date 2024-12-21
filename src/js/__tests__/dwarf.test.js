import Dwarf from '../players/Dwarf.js';
import Axe from '../weapons/Axe.js';

describe('Dwarf', () => {
    test('constructor sets properties', () => {
        const d = new Dwarf(8, 'Гимли');
        expect(d.life).toBe(130);
        expect(d.attack).toBe(15);
        expect(d.agility).toBe(20);
        expect(d.weapon).toBeInstanceOf(Axe);
        expect(d.description).toBe('Гном');
    });

    test('takeDamage: every 6th hit deals half dmg if getLuck()>0.5', () => {
        const d = new Dwarf(0, 'Гимли');
        jest.spyOn(d, 'getLuck').mockReturnValue(0.6); // >0.5
        for (let i = 1; i <= 5; i += 1) {
            d.takeDamage(10);
        }
        expect(d.life).toBe(80);

        d.takeDamage(10);
        expect(d.life).toBe(75);
    });
});
