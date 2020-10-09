<template>
  <div
    :class="
      ` flex flex-col h-screen w-screen bg-${$store.state.pokemon.color.name}-500`
    "
  >
    <div class="flex flex-col">
      <div class="relative px-6 pt-10 space-y-6">
        <div class="flex justify-between">
          <svg
            :class="`w-6 h-6 text-${$store.state.pokemon.color.name}-100`"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            @click="$router.go(-1)"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            ></path>
          </svg>
          <template>
            <svg
              v-if="$store.state.favorites.includes($store.state.pokemon.id)"
              :class="`w-6 h-6 text-${$store.state.pokemon.color.name}-100`"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              @click="switchFavorite()"
            >
              <path
                fill-rule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <svg
              v-else
              :class="`w-6 h-6 text-${$store.state.pokemon.color.name}-100`"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              @click="switchFavorite()"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </template>
        </div>
        <div class="flex flex-col space-y-2">
          <div
            :class="
              `flex justify-between items-end leading-none text-${$store.state.pokemon.color.name}-100`
            "
          >
            <span class="text-2xl font-medium">{{
              $store.state.pokemon.name
            }}</span>
            <span># {{ $store.state.pokemon.id }}</span>
          </div>
          <div
            :class="
              `flex space-x-2 text-${$store.state.pokemon.color.name}-700`
            "
            style="font-size: 10px"
          >
            <div
              v-for="(type, k) of $store.state.pokemon.types"
              :key="k"
              :class="
                `px-4 py-1 bg-${$store.state.pokemon.color.name}-300 rounded-full`
              "
            >
              {{ type.type.name }}
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-end">
        <img
          class="opacity-20 w-40"
          src="../assets/images/pkeball.png"
          alt=""
          srcset=""
        />
      </div>
    </div>
    <div class="flex flex-col flex-1 bg-white rounded-t-6xl p-6 z-10 text-xs">
      <div class="flex justify-center -mt-45">
        <img
          :src="
            `https://pokeres.bastionbot.org/images/pokemon/${$store.state.pokemon.id}.png`
          "
          class="w-45 text-center"
        />
      </div>
      <ul class="flex font-medium text-gray-500">
        <li class="w-1/2 text-center text-blue-800 border-b-2 border-blue-800 pb-1">
          About
        </li>
      </ul>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "Details",
  methods: {
    switchFavorite() {
      this.$store.commit("handleFavorite");
    },
  },
};
</script>
