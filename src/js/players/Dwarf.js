import Warrior from './Warrior.js';
import Axe from '../weapons/Axe.js';

export default class Dwarf extends Warrior {
    constructor(position, name, logger) {
        super(position, name, logger);
        this.life = 130;
        this.attack = 15;
        this.agility = 20;
        this.description = 'Гном';
        this.weapon = new Axe();
    }
    #hitsCount = 0;

    takeDamage(damage) {
        let finalDamage = damage;
        this.#hitsCount += 1;
        if (this.#hitsCount % 6 === 0 && this.getLuck() > 0.5) {
            console.log(`${this.name} каждые 6 ударов получает меньше урона!`);
            finalDamage /= 2;
        }
        super.takeDamage(finalDamage);
    }
}
