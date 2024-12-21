import Player from './Player.js';
import Staff from '../weapons/Staff.js';

export default class Mage extends Player {
    constructor() {
        super();
        this.weapon = new Staff();
    }
}
