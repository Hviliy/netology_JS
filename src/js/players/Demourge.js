import Mage from './Mage.js';
import StormStaff from '../weapons/StormStaff.js';

export default class Demourge extends Mage {
    constructor() {
        super();
        this.weapon = new StormStaff();
    }
}
