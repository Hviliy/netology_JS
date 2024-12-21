import Axe from '../weapons/Axe';

describe('Axe', () => {
    test('Axe has correct default properties', () => {
        const axe = new Axe();
        expect(axe.name).toBe('Секира');
        expect(axe.attack).toBe(27);
        expect(axe.durability).toBe(800);
        expect(axe.range).toBe(1);
    });

    test('inherited methods from Sword', () => {
        const axe = new Axe();
        axe.takeDamage(500);
        expect(axe.durability).toBe(300);

        expect(axe.getDamage()).toBe(27);

        axe.takeDamage(300);
        expect(axe.durability).toBe(0);
        expect(axe.getDamage()).toBe(0);
        expect(axe.isBroken()).toBe(true);
    });
});
