const POKEAPI_BASE = 'https://pokeapi.co/api/v2';
const MAX_RED_BLUE_POKEMON = 151;

async function fetchPokemonData(id) {
  let res = await fetch(POKEAPI_BASE + '/pokemon/' + id);
  if (!res.ok) throw new Error('PokéAPI error: ' + res.status);
  return res.json();
}

async function getMovesForLevel25(pokemonData) {
  let entries = pokemonData.moves.filter(function(m) {
    return m.version_group_details.some(function(vgd) {
      return vgd.version_group.name === 'red-blue' && vgd.move_learn_method.name === 'level-up' && vgd.level_learned_at <= 25;
    });
  });
  let picks = entries.sort(function() { return 0.5 - Math.random(); }).slice(0, 4);
  let moves = await Promise.all(picks.map(function(obj) {
    return (async function() {
      let res = await fetch(obj.move.url);
      if (!res.ok) throw new Error('Move fetch error: ' + res.status);
      let data = await res.json();
      return {
        name: data.name,
        power: data.power || 0,
        accuracy: data.accuracy || 100,
        pp: data.pp || 1
      };
    })();
  }));
  return moves;
}

export async function fetchRandomPokemon() {
  let id = Math.floor(Math.random() * MAX_RED_BLUE_POKEMON) + 1;
  let data = await fetchPokemonData(id);
  console.log(data);
  let moves = await getMovesForLevel25(data);
  return {
    id: data.id,
    name: data.name,
    spriteUrl: data.sprites.front_default,
    cryUrl: data.cries.legacy,
    stats: {
      hp: data.stats.find(function(s) { return s.stat.name === 'hp'; }).base_stat,
      attack: data.stats.find(function(s) { return s.stat.name === 'attack'; }).base_stat,
      defense: data.stats.find(function(s) { return s.stat.name === 'defense'; }).base_stat
    },
    moves: moves
  };
}
