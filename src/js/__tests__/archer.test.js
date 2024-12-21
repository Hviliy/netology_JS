import Archer from '../players/Archer.js';
import Bow from '../weapons/Bow.js';

describe('Archer', () => {
    test('constructor sets properties', () => {
        const a = new Archer(2, 'Леголас');
        expect(a.position).toBe(2);
        expect(a.name).toBe('Леголас');
        expect(a.life).toBe(80);
        expect(a.magic).toBe(35);
        expect(a.attack).toBe(5);
        expect(a.agility).toBe(10);
        expect(a.description).toBe('Лучник');
        expect(a.weapon).toBeInstanceOf(Bow);
    });

    test('getDamage uses formula (a+weapon)*luck*distance/weaponRange', () => {
        const a = new Archer(0, 'test');
        a.weapon.range = 3;
        jest.spyOn(a, 'getLuck').mockReturnValue(1);
        const dmg = a.getDamage(2);
        expect(dmg).toBeCloseTo(10);
        expect(a.getDamage(4)).toBe(0);
    });
});
