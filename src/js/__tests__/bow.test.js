import Bow from '../weapons/Bow';

describe('Bow', () => {
    test('Bow has correct default properties', () => {
        const bow = new Bow();
        expect(bow.name).toBe('Лук');
        expect(bow.attack).toBe(10);
        expect(bow.durability).toBe(200);
        expect(bow.range).toBe(3);
    });

    test('inherited methods work as expected', () => {
        const bow = new Bow();
        bow.takeDamage(50);
        expect(bow.durability).toBe(150);

        expect(bow.getDamage()).toBe(10);

        bow.takeDamage(130);
        expect(bow.durability).toBe(20);

        expect(bow.getDamage()).toBe(5);

        bow.takeDamage(50);
        expect(bow.durability).toBe(0);
        expect(bow.getDamage()).toBe(0);
        expect(bow.isBroken()).toBe(true);
    });
});
