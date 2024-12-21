import Sword from '../weapons/Sword';

describe('Sword', () => {
    test('Sword has correct default properties', () => {
        const sword = new Sword();
        expect(sword.name).toBe('Меч');
        expect(sword.attack).toBe(25);
        expect(sword.durability).toBe(500);
        expect(sword.range).toBe(1);
    });

    test('inherited methods (takeDamage, getDamage, isBroken)', () => {
        const sword = new Sword();
        sword.takeDamage(100);
        expect(sword.durability).toBe(400);

        expect(sword.getDamage()).toBe(25);

        sword.takeDamage(300);
        expect(sword.durability).toBe(100);
        expect(sword.getDamage()).toBe(12.5);

        sword.takeDamage(200);
        expect(sword.durability).toBe(0);
        expect(sword.getDamage()).toBe(0);
        expect(sword.isBroken()).toBe(true);
    });
});
