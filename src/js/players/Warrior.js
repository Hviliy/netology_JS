import Player from './Player.js';
import Sword from '../weapons/Sword.js';
import Knife from '../weapons/Knife.js';
import Arm from '../weapons/Arm.js';

export default class Warrior extends Player {
    constructor(position, name, logger) {
        super(position, name, logger);
        this.life = 120;
        this.speed = 2;
        this.description = 'Воин';
        this.weapon = new Sword();
        this.backupWeapons = [new Knife(), new Arm()];
    }

    takeDamage(damage) {
        if (this.life < 60 && this.getLuck() > 0.8) {
            if (this.magic > 0) {
                const magicBefore = this.magic;
                if (damage > this.magic) {
                    this.magic = 0;
                    super.takeDamage(damage - magicBefore);
                } else {
                    this.magic -= damage;
                    console.log(`${this.name} принимает урон ${damage} в ману. magic=${this.magic}`);
                }
            } else {
                super.takeDamage(damage);
            }
        } else {
            super.takeDamage(damage);
        }
    }
}
