import Warrior from '../players/Warrior.js';

describe('Warrior (class)', () => {
    test('constructor overrides default properties', () => {
        const w = new Warrior(6, 'Алёша Попович');
        expect(w.position).toBe(6);
        expect(w.name).toBe('Алёша Попович');
        expect(w.life).toBe(120);
        expect(w.speed).toBe(2);
        expect(w.description).toBe('Воин');
        expect(w.weapon.name).toBe('Меч');
    });

    test('takeDamage uses magic if life<50% and getLuck()>0.8', () => {
        const w = new Warrior(0, 'Test');
        w.life = 50;
        w.magic = 20;

        jest.spyOn(w, 'getLuck').mockReturnValue(0.9);
        w.takeDamage(5);
        expect(w.magic).toBe(15);
        expect(w.life).toBe(50);

        w.takeDamage(30);
        expect(w.magic).toBe(0);
        expect(w.life).toBe(35);
    });
});
