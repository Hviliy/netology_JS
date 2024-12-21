import Archer from './Archer.js';
import LongBow from '../weapons/LongBow.js';

export default class Crossbowman extends Archer {
    constructor(position, name, logger) {
        super(position, name, logger);
        this.life = 85;
        this.magic = 0;
        this.attack = 8;
        this.luck = 20;
        this.description = 'Арбалетчик';
        this.weapon = new LongBow();
    }
}
