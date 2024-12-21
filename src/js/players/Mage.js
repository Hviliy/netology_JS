import Player from './Player.js';
import Staff from '../weapons/Staff.js';
import Knife from '../weapons/Knife.js';
import Arm from '../weapons/Arm.js';

export default class Mage extends Player {
    constructor(position, name, logger) {
        super(position, name, logger);
        this.life = 70;
        this.magic = 100;
        this.attack = 5;
        this.agility = 8;
        this.description = 'Маг';
        this.weapon = new Staff();
        this.backupWeapons = [new Knife(), new Arm()];
    }

    takeDamage(damage) {
        if (this.magic > 50) {
            const realDamage = damage / 2;
            this.magic -= 12;
            console.log(`${this.name} теряет часть маны (12), magic=${this.magic}`);
            super.takeDamage(realDamage);
        } else {
            super.takeDamage(damage);
        }
    }
}
