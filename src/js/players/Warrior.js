import Player from './Player.js';
import Sword from '../weapons/Sword.js';

export default class Warrior extends Player {
    constructor() {
        super();
        this.weapon = new Sword();
    }
}
