import Mage from '../players/Mage.js';

describe('Mage', () => {
    test('constructor sets properties', () => {
        const m = new Mage(5, 'Гендальф');
        expect(m.position).toBe(5);
        expect(m.name).toBe('Гендальф');
        expect(m.life).toBe(70);
        expect(m.magic).toBe(100);
        expect(m.description).toBe('Маг');
    });

    test('takeDamage uses half damage if magic>50, then reduces magic by 12', () => {
        const m = new Mage(5, 'Test');
        m.magic = 80;
        m.takeDamage(50);
        expect(m.life).toBe(45);
        expect(m.magic).toBe(68);
        m.magic = 50;
        m.takeDamage(20);
        expect(m.life).toBe(25); // 45-20
        expect(m.magic).toBe(50);
    });
});
