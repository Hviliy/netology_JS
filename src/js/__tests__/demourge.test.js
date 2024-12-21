import Demiurge from '../players/Demourge.js';
import StormStaff from '../weapons/StormStaff.js';

describe('Demiurge', () => {
    test('constructor sets properties', () => {
        const dem = new Demiurge(12, 'Мерлин');
        expect(dem.life).toBe(80);
        expect(dem.magic).toBe(120);
        expect(dem.attack).toBe(6);
        expect(dem.luck).toBe(12);
        expect(dem.description).toBe('Демиург');
        expect(dem.weapon).toBeInstanceOf(StormStaff);
    });

    test('getDamage: if magic>0 && getLuck()>0.6 => x1.5 dmg', () => {
        const dem = new Demiurge(0, 'Test');
        jest.spyOn(Object.getPrototypeOf(Demiurge.prototype), 'getDamage')
            .mockReturnValue(10);
        jest.spyOn(dem, 'getLuck').mockReturnValue(0.7);
        dem.magic = 10;
        const dmg = dem.getDamage(1);
        expect(dmg).toBe(15);
        dem.getLuck.mockReturnValue(0.5);
        expect(dem.getDamage(1)).toBe(10);
    });
});
