import Arm from '../weapons/Arm.js';
import Knife from '../weapons/Knife.js';

export default class Player {
    constructor(position, name, logger = () => {}) {
        this.life = 100;
        this.magic = 20;
        this.speed = 1;
        this.attack = 10;
        this.agility = 5;
        this.luck = 10;

        this.description = 'Игрок';
        this.weapon = new Arm();
        this.backupWeapons = [new Knife(), new Arm()];

        this.position = position;
        this.name = name;
        this.log = logger;
    }

    getLuck() {
        const randomNumber = Math.random() * 100;
        return (randomNumber + this.luck) / 100;
    }

    getDamage(distance) {
        if (distance > this.weapon.range) {
            return 0;
        }
        const realDistance = distance < 1 ? 1 : distance;

        const wpnDamage = this.weapon.getDamage();
        return (this.attack + wpnDamage) * this.getLuck() / realDistance;
    }

    takeDamage(damage) {
        this.life -= damage;
        if (this.life < 0) {
            this.life = 0;
        }
        this.log(`${this.name} получает урон ${damage.toFixed(2)}, life=${this.life.toFixed(2)}`);
    }

    isDead() {
        return this.life === 0;
    }

    moveLeft(distance) {
        const realDistance = Math.min(distance, this.speed);
        this.position -= realDistance;
    }

    moveRight(distance) {
        const realDistance = Math.min(distance, this.speed);
        this.position += realDistance;
    }

    move(distance) {
        if (distance < 0) {
            this.moveLeft(Math.abs(distance));
        } else {
            this.moveRight(distance);
        }
    }

    isAttackBlocked() {
        const threshold = (100 - this.luck) / 100;
        return this.getLuck() > threshold;
    }

    dodged() {
        const threshold = (100 - this.agility - this.speed * 3) / 100;
        return this.getLuck() > threshold;
    }

    takeAttack(damage) {
        if (this.isAttackBlocked()) {
            this.log(`${this.name} блокирует удар! (урон по оружию)`);
            this.weapon.takeDamage(damage);
            return;
        }
        if (this.dodged()) {
            this.log(`${this.name} уклонился от удара!`);
            return;
        }
        this.takeDamage(damage);
    }

    checkWeapon() {
        if (this.weapon.isBroken()) {
            this.log(`${this.name} сломал(а) свое оружие ${this.weapon.name}!`);
            if (this.backupWeapons.length > 0) {
                this.weapon = this.backupWeapons.shift();
                this.log(`${this.name} берёт новое оружие: ${this.weapon.name}`);
            } else {
                this.log(`${this.name} больше нет оружия!`);
                this.weapon = new Arm();
            }
        }
    }

    tryAttack(enemy) {
        const distance = Math.abs(this.position - enemy.position);

        if (distance > this.weapon.range) {
            this.log(`${this.name} не достаёт до ${enemy.name}`);
            return;
        }
        const degrade = 10 * this.getLuck();
        this.weapon.takeDamage(degrade);

        let dmg = this.getDamage(distance);
        if (this.position === enemy.position) {
            this.log(`${enemy.name} отлетает на 1 позицию вправо! (урон x2)`);
            /* eslint-disable no-param-reassign */
            enemy.position += 1;
            /* eslint-enable no-param-reassign */
            dmg *= 2;
        }
        enemy.takeAttack(dmg);
        this.checkWeapon();
    }

    chooseEnemy(players) {
        const others = players.filter((p) => p !== this && !p.isDead());
        if (others.length === 0) {
            return null;
        }
        let enemy = others[0];
        for (const p of others) {
            if (p.life < enemy.life) {
                enemy = p;
            }
        }
        return enemy;
    }

    moveToEnemy(enemy) {
        if (!enemy) return;
        if (enemy.position > this.position) {
            this.moveRight(enemy.position - this.position);
        } else if (enemy.position < this.position) {
            this.moveLeft(this.position - enemy.position);
        }
        this.log(`${this.name} передвинулся к ${enemy.name}, pos=${this.position}`);
    }

    turn(players) {
        if (this.isDead()) return;
        const enemy = this.chooseEnemy(players);
        if (!enemy) {
            return;
        }
        this.moveToEnemy(enemy);
        this.tryAttack(enemy);
    }

    get shortInfo() {
        return `${this.name}, P: ${this.position}, L: ${this.life.toFixed(2)}`;
    }
}
