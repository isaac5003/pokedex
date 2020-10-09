<template>
  <div class="w-screen h-screen px-6 py-10 ">
    <!-- header -->
    <img
      class="absolute z-0 right-0 opacity-10 -mt-10 w-50"
      src="../assets/images/corner.png"
    />
    <div class="relative z-10 space-y-10 mb-10" v-if="!loading">
      <header class="flex">
        <span class="font-semibold text-4xl">Pokedex</span>
      </header>
      <div class="grid grid-cols-12 gap-3">
        <div
          v-for="(pokemon, k) of pokemon_list"
          :key="k"
          :class="
            `bg-${
              pokemon.color.name == 'brown' ? 'teal' : pokemon.color.name
            }-500 col-span-6 rounded-lg p-2 border shadow`
          "
          @click="goToPokemon(pokemon)"
        >
          <div class="flex justify-end">
            <span
              :class="
                `px-3 font-semibold text-${
                  pokemon.color.name == 'brown' ? 'teal' : pokemon.color.name
                }-700 text-xs rounded-sm`
              "
              >#{{ k + 1 }}</span
            >
          </div>
          <span
            :class="
              `text-sm text-${
                pokemon.color.name == 'brown' ? 'teal' : pokemon.color.name
              }-100`
            "
            >{{ pokemon.name }}</span
          >
          
          <div class="flex justify-end">
            
            <img class="absolute w-20 opacity-20 -mr-2" src="" />
            <img
              class="relative w-18"
              :src="
                `https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`
              "
            />
          </div>
          
        </div>
      </div>
    </div>
    <div class=" h-full flex justify-center items-center" v-else>
      <span>Cargando listado...</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Main",
  async created() {
    this.loading = true;

    if (this.$store.state.pokemon_list.length == 0) {
      // Obtiene el listado de colores
      const colores = await axios.get(
        "https://pokeapi.co/api/v2/pokemon-color"
      );
      // Obtiene los detalles de cada pokemon
      for (const color of colores.data.results) {
        const details = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-color/${color.name}`
        );
        this.pokemon_colors.push(details.data);
      }

      // Obtiene el listado de pokemons
      const pokemons = await axios.get(
        "https://pokeapi.co/api/v2/pokemon/?limit=150"
      );

      // Obtiene los detalles de cada pokemon
      let id = 1;
      for (const pokemon of pokemons.data.results) {
        const details = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const color = this.pokemon_colors.find((pk) =>
          pk.pokemon_species
            .map((s) => s.name)
            .includes(details.data.species.name)
        );
        this.pokemon_list.push({ ...details.data, color, id });
        id++;
      }
      this.$store.commit("setPokemonList", this.pokemon_list);
    } else {
      this.pokemon_list = this.$store.state.pokemon_list;
    }

    this.loading = false;
  },
  data() {
    return {
      loading: true,
      pokemon_list: [],
      pokemon_colors: [],
    };
  },
  methods: {
    goToPokemon(pokemon) {
      this.$store.commit("setPokemon", pokemon);
      this.$router.push(`pokemon/${pokemon.name}`);
    },
  },
};
</script>
