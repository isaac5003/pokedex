import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        pokemon_list: [],
        pokemon: null,
        favorites: [],
    },
    mutations: {
        setPokemon(state, pokemon) {
            state.pokemon = pokemon;
        },
        setPokemonList(state, list) {
            state.pokemon_list = list;
        },
        handleFavorite(state) {
            const index = state.favorites.indexOf(state.pokemon.id);
            if (index > -1) {
                state.favorites.splice(index, 1);
            } else {
                state.favorites.push(state.pokemon.id);
            }
        },
    },
});