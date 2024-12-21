import Arm from '../weapons/Arm';

describe('Arm', () => {
    test('Arm has correct default properties', () => {
        const arm = new Arm();
        expect(arm.name).toBe('Рука');
        expect(arm.attack).toBe(1);
        expect(arm.durability).toBe(Infinity);
        expect(arm.range).toBe(1);
    });

    test('Arm inherited methods from Weapon (takeDamage, getDamage, etc.)', () => {
        const arm = new Arm();
        arm.takeDamage(100);
        expect(arm.durability).toBe(Infinity);

        expect(arm.getDamage()).toBe(1);
        expect(arm.isBroken()).toBe(false);
    });
});
