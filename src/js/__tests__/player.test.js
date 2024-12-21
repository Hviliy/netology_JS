import Player from '../players/Player.js';
import Arm from '../weapons/Arm.js';

describe('Player (base class)', () => {
    test('constructor sets default properties', () => {
        const p = new Player(10, 'Hero');
        expect(p.position).toBe(10);
        expect(p.name).toBe('Hero');
        expect(p.life).toBe(100);
        expect(p.magic).toBe(20);
        expect(p.speed).toBe(1);
        expect(p.attack).toBe(10);
        expect(p.agility).toBe(5);
        expect(p.luck).toBe(10);
        expect(p.description).toBe('Игрок');
        expect(p.weapon).toBeInstanceOf(Arm);
    });

    test('getLuck should return number between 0.1..1.1 (примерно)', () => {
        const p = new Player(0, 'Test');
        for (let i = 0; i < 10; i += 1) {
            const luckVal = p.getLuck();
            expect(luckVal).toBeGreaterThanOrEqual(0);
            expect(luckVal).toBeLessThanOrEqual(1.1);
        }
    });

    test('getDamage returns 0 if distance > weapon.range', () => {
        const p = new Player(0, 'Test');
        p.weapon.range = 1;
        const dmg = p.getDamage(2);
        expect(dmg).toBe(0);
    });

    test('takeDamage should reduce life but not below 0', () => {
        const p = new Player(0, 'Test');
        p.takeDamage(50);
        expect(p.life).toBe(50);
        p.takeDamage(100);
        expect(p.life).toBe(0);
    });

    test('isDead returns true when life=0', () => {
        const p = new Player(0, 'Test');
        expect(p.isDead()).toBe(false);
        p.takeDamage(200);
        expect(p.isDead()).toBe(true);
    });

    test('moveLeft cannot exceed speed', () => {
        const p = new Player(10, 'Test');
        p.speed = 2;
        p.moveLeft(5);
        expect(p.position).toBe(8);
    });

    test('moveRight cannot exceed speed', () => {
        const p = new Player(10, 'Test');
        p.speed = 2;
        p.moveRight(3);
        expect(p.position).toBe(12);
    });

    test('move should call moveLeft if distance < 0, else moveRight', () => {
        const p = new Player(10, 'Test');
        p.speed = 2;
        p.move(-5);
        expect(p.position).toBe(8);
        p.move(3);
        expect(p.position).toBe(10);
    });

    test('isAttackBlocked returns true if getLuck() > (100 - luck)/100', () => {
        const p = new Player(0, 'Test');
        jest.spyOn(p, 'getLuck').mockReturnValue(0.95);
        expect(p.isAttackBlocked()).toBe(true);
        p.getLuck.mockReturnValue(0.2);
        expect(p.isAttackBlocked()).toBe(false);
    });

    test('dodged returns true if getLuck() > (100 - agility - speed*3)/100', () => {
        const p = new Player(0, 'Test');
        p.agility = 5; p.speed = 2;
        jest.spyOn(p, 'getLuck').mockReturnValue(0.95);
        expect(p.dodged()).toBe(true);
        p.getLuck.mockReturnValue(0.5);
        expect(p.dodged()).toBe(false);
    });

    test('takeAttack: if blocked, damage goes to weapon', () => {
        const p = new Player(0, 'Test');
        jest.spyOn(p, 'isAttackBlocked').mockReturnValue(true);
        jest.spyOn(p.weapon, 'takeDamage');
        p.takeAttack(30);
        expect(p.weapon.takeDamage).toHaveBeenCalledWith(30);
        expect(p.life).toBe(100);
    });

    test('takeAttack: if dodged, no damage to player', () => {
        const p = new Player(0, 'Test');
        jest.spyOn(p, 'isAttackBlocked').mockReturnValue(false);
        jest.spyOn(p, 'dodged').mockReturnValue(true);
        jest.spyOn(p, 'takeDamage');
        p.takeAttack(50);
        // takeDamage не вызывается
        expect(p.takeDamage).not.toHaveBeenCalled();
        expect(p.life).toBe(100);
    });

    test('takeAttack: normal case => player takes damage', () => {
        const p = new Player(0, 'Test');
        jest.spyOn(p, 'isAttackBlocked').mockReturnValue(false);
        jest.spyOn(p, 'dodged').mockReturnValue(false);
        p.takeAttack(20);
        expect(p.life).toBe(80);
    });

    test('checkWeapon: if weapon is broken, switch to backup', () => {
        const p = new Player(0, 'Test');
        jest.spyOn(p.weapon, 'isBroken').mockReturnValue(true);
        p.checkWeapon();
        expect(p.weapon.name).toBe('Нож');
    });

    test('tryAttack: if distance>weapon.range, do nothing', () => {
        const p1 = new Player(0, 'P1');
        const p2 = new Player(10, 'P2');
        jest.spyOn(p1, 'log').mockImplementation(() => {});
        p1.weapon.range = 1;
        p1.tryAttack(p2);
        expect(p1.log).toHaveBeenCalledWith('P1 не достаёт до P2');
    });

    test('chooseEnemy: returns living enemy with min life', () => {
        const p1 = new Player(0, 'P1'); p1.life = 50;
        const p2 = new Player(1, 'P2'); p2.life = 10;
        const p3 = new Player(2, 'P3'); p3.life = 80;
        const arr = [p1, p2, p3];
        expect(p1.chooseEnemy(arr)).toBe(p2);
        p2.life = 0;
        expect(p1.chooseEnemy(arr)).toBe(p3);
    });

    test('moveToEnemy: moves closer', () => {
        const p1 = new Player(0, 'P1'); p1.speed = 2;
        const p2 = new Player(5, 'P2');
        p1.moveToEnemy(p2);
        expect(p1.position).toBe(2);
    });

    test('turn: chooses enemy, moveToEnemy, tryAttack', () => {
        const p1 = new Player(0, 'P1'); p1.speed = 2;
        const p2 = new Player(5, 'P2'); p2.life = 10;
        const arr = [p1, p2];
        jest.spyOn(p1, 'chooseEnemy');
        jest.spyOn(p1, 'moveToEnemy');
        jest.spyOn(p1, 'tryAttack');
        p1.turn(arr);
        expect(p1.chooseEnemy).toHaveBeenCalledWith(arr);
        expect(p1.moveToEnemy).toHaveBeenCalledWith(p2);
        expect(p1.tryAttack).toHaveBeenCalledWith(p2);
    });
});
