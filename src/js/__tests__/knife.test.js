import Knife from '../weapons/Knife';

describe('Knife', () => {
    test('Knife has correct default properties', () => {
        const knife = new Knife();
        expect(knife.name).toBe('Нож');
        expect(knife.attack).toBe(5);
        expect(knife.durability).toBe(300);
        expect(knife.range).toBe(1);
    });

    test('Knife inherited methods from Weapon', () => {
        const knife = new Knife();
        knife.takeDamage(50);
        expect(knife.durability).toBe(250);

        expect(knife.getDamage()).toBe(5);

        knife.takeDamage(250);
        expect(knife.durability).toBe(0);
        expect(knife.getDamage()).toBe(0);
        expect(knife.isBroken()).toBe(true);
    });
});
