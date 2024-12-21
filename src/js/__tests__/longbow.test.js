import LongBow from '../weapons/LongBow';

describe('LongBow', () => {
    test('LongBow has correct default properties', () => {
        const lbow = new LongBow();
        expect(lbow.name).toBe('Длинный лук');
        expect(lbow.attack).toBe(15);
        expect(lbow.durability).toBe(200);
        expect(lbow.range).toBe(4);
    });

    test('inherited methods from Bow', () => {
        const lbow = new LongBow();
        lbow.takeDamage(100);
        expect(lbow.durability).toBe(100);

        expect(lbow.getDamage()).toBe(15);

        lbow.takeDamage(150);
        expect(lbow.durability).toBe(0);
        expect(lbow.getDamage()).toBe(0);
        expect(lbow.isBroken()).toBe(true);
    });
});
