import Arm from '../weapons/Arm.js';
import Knife from '../weapons/Knife.js';

export default class Player {
    constructor() {
        this.weapon = new Arm();
        this.extraWeapon = new Knife();
    }
}
