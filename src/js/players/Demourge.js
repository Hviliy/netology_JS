import Mage from './Mage.js';
import StormStaff from '../weapons/StormStaff.js';

export default class Demourge extends Mage {
    constructor(position, name, logger) {
        super(position, name, logger);
        this.life = 80;
        this.magic = 120;
        this.attack = 6;
        this.luck = 12;
        this.description = 'Демиург';
        this.weapon = new StormStaff();
    }

    getDamage(distance) {
        let dmg = super.getDamage(distance);
        if (this.magic > 0 && this.getLuck() > 0.6) {
            dmg *= 1.5;
        }
        return dmg;
    }
}
