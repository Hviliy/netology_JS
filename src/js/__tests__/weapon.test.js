import Weapon from '../weapons/Weapon';

describe('Weapon (base class)', () => {
    test('constructor sets properties correctly', () => {
        const weapon = new Weapon('Старый меч', 20, 10, 1);

        expect(weapon.name).toBe('Старый меч');
        expect(weapon.attack).toBe(20);
        expect(weapon.durability).toBe(10);
        expect(weapon.initDurability).toBe(10);
        expect(weapon.range).toBe(1);
    });

    test('takeDamage reduces durability, not below zero', () => {
        const weapon = new Weapon('test', 20, 10, 1);
        weapon.takeDamage(5);
        expect(weapon.durability).toBe(5);

        weapon.takeDamage(50);
        expect(weapon.durability).toBe(0);
    });

    test('getDamage returns correct values', () => {
        const weapon = new Weapon('test', 20, 10, 1);

        expect(weapon.getDamage()).toBe(20);

        weapon.takeDamage(8);
        expect(weapon.durability).toBe(2);

        expect(weapon.getDamage()).toBe(10);

        weapon.takeDamage(10);
        expect(weapon.durability).toBe(0);
        expect(weapon.getDamage()).toBe(0);
    });

    test('isBroken returns true if durability = 0, else false', () => {
        const weapon = new Weapon('test', 20, 10, 1);
        expect(weapon.isBroken()).toBe(false);

        weapon.takeDamage(10);
        expect(weapon.durability).toBe(0);
        expect(weapon.isBroken()).toBe(true);
    });
});
