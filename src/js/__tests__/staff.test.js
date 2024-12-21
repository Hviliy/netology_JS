import Staff from '../weapons/Staff';

describe('Staff', () => {
    test('Staff has correct default properties', () => {
        const staff = new Staff();
        expect(staff.name).toBe('Посох');
        expect(staff.attack).toBe(8);
        expect(staff.durability).toBe(300);
        expect(staff.range).toBe(2);
    });

    test('Staff inherited methods', () => {
        const staff = new Staff();
        staff.takeDamage(100);
        expect(staff.durability).toBe(200);

        expect(staff.getDamage()).toBe(8);

        staff.takeDamage(150);
        expect(staff.durability).toBe(50);

        expect(staff.getDamage()).toBe(4);

        staff.takeDamage(100);
        expect(staff.durability).toBe(0);
        expect(staff.getDamage()).toBe(0);
        expect(staff.isBroken()).toBe(true);
    });
});
