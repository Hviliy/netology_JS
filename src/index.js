import './css/style.css';
import { play } from './js/game';
import log from './js/log';
import Archer from './js/players/Archer';
import Crossbowman from './js/players/Crossbowman';
import Demourge from './js/players/Demourge';
import Dwarf from './js/players/Dwarf';
import Mage from './js/players/Mage';
import Warrior from './js/players/Warrior';
import { clearLog } from "./js/log";

const userPlayers = [];

document.getElementById('addPlayer').addEventListener('click', () => {
    const classValue = document.getElementById('playerClass').value;
    const nameValue = document.getElementById('playerName').value.trim();

    if (!nameValue) {
        /* eslint-disable no-alert */
        alert('Введите имя персонажа!');
        /* eslint-enable no-alert */
        return;
    }

    let newPlayer;
    switch (classValue) {
        case 'archer':
            newPlayer = new Archer(1, nameValue, log);
            break;
        case 'warrior':
            newPlayer = new Warrior(3, nameValue, log);
            break;
        case 'mage':
            newPlayer = new Mage(5, nameValue, log);
            break;
        case 'dwarf':
            newPlayer = new Dwarf(7, nameValue, log);
            break;
        case 'demourge':
            newPlayer = new Demourge(9, nameValue, log);
            break;
        case 'crossbowman':
            newPlayer = new Crossbowman(11, nameValue, log);
            break;
        default:
            /* eslint-disable no-alert */
            alert('Неизвестный класс!');z
            /* eslint-enable no-alert */
            return;
    }
    userPlayers.push(newPlayer);
    log(`Добавлен персонаж: ${newPlayer.description} ${newPlayer.name}`, 'green');
});

document.getElementById('clearLog').addEventListener('click', () => {
    clearLog();
});

document.getElementById('startBattle').addEventListener('click', () => {
    clearLog();
    log('Запуск боя...');
    if (userPlayers.length < 2) {
        log('Недостаточно игроков для боя!', 'red');
        return;
    }
    const winner = play(userPlayers, log);
    log(`Победил: ${winner.shortInfo}`, 'red');
});


