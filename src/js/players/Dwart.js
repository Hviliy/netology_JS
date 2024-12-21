import Warrior from './Warrior.js';
import Axe from '../weapons/Axe.js';

export default class Dwart extends Warrior {
    constructor() {
        super();
        this.weapon = new Axe();
    }
}
