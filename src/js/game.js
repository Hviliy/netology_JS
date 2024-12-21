export function play(players) {
    console.log('--- Start the battle! ---');

    while (players.filter((p) => !p.isDead()).length > 1) {
        for (const p of players) {
            if (!p.isDead()) {
                p.turn(players);
            }
        }
        console.log('--- End of round ---');
    }

    const alive = players.filter((p) => !p.isDead());
    if (alive.length === 1) {
        console.log(`Победил игрок: ${alive[0].name} (${alive[0].description})`);
        return alive[0];
    }
    console.log('Все умерли! Ничья)');
    return null;
}
