export const initialPlayer = {
  text: 'user server data',
  id: 0
};

export class PlayerService {
  addPlayer(text, players) {
    return [
      {
        id: (players.length === 0) ? 0 : players[0].id + 1,
        text
      }
    ].concat(players);
  }
}

