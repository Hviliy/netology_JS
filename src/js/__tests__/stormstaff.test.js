import StormStaff from '../weapons/StormStaff';

describe('StormStaff', () => {
    test('StormStaff has correct default properties', () => {
        const sstaff = new StormStaff();
        expect(sstaff.name).toBe('Посох Бури');
        expect(sstaff.attack).toBe(10);
        expect(sstaff.durability).toBe(300);
        expect(sstaff.range).toBe(3);
    });

    test('inherited methods from Staff', () => {
        const sstaff = new StormStaff();
        sstaff.takeDamage(100);
        expect(sstaff.durability).toBe(200);

        expect(sstaff.getDamage()).toBe(10);

        sstaff.takeDamage(150);
        expect(sstaff.durability).toBe(50);

        expect(sstaff.getDamage()).toBe(5);

        sstaff.takeDamage(100);
        expect(sstaff.durability).toBe(0);
        expect(sstaff.getDamage()).toBe(0);
        expect(sstaff.isBroken()).toBe(true);
    });
});
