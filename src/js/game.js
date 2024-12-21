import Dwart from './players/Dwart.js';
import Crossbowman from './players/Crossbowman.js';
import Demourge from './players/Demourge.js';
import Warrior from './players/Warrior.js';
import Archer from './players/Archer.js';
import Mage from './players/Mage.js';

export function play() {
    console.log('Game started');

    const warrior = new Warrior();
    const archer = new Archer();
    const mage = new Mage();
    const dwart = new Dwart();
    const crossbowman = new Crossbowman();
    const demourge = new Demourge();

    console.log('Warrior:', warrior);
    console.log('Archer:', archer);
    console.log('Mage:', mage);
    console.log('Dwart:', dwart);
    console.log('Crossbowman:', crossbowman);
    console.log('Demourge:', demourge);

    console.log('Game finished');
}
