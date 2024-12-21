import Player from './Player.js';
import Bow from '../weapons/Bow.js';

export default class Archer extends Player {
    constructor() {
        super();
        this.weapon = new Bow();
    }
}
