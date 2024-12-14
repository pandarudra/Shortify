<template>
  <div class="w-full h-screen flex items-center flex-col justify-center">
    <h1 class="font-bold text-green-900 mb-6 gfont text-4xl">Shortify</h1>
    <form
      @submit.prevent="onShort"
      class="bg-white p-6 rounded shadow-md w-full max-w-sm border border-green-900"
    >
      <div class="mb-4">
        <label for="url" class="block text-gray-700 text-sm font-bold mb-2"
          >URL:</label
        >
        <input
          type="text"
          id="url"
          v-model="url"
          class="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 border border-green-900 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div class="mb-4">
        <label for="alias" class="block text-gray-700 text-sm font-bold mb-2"
          >Alias:</label
        >
        <input
          type="text"
          id="alias"
          v-model="alias"
          class="shadow appearance-none border border-green-900 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          type="submit"
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Shorten URL
        </button>
      </div>
    </form>

    <div class="h-20 w-96 urltab hidden justify-center items-center"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      url: "",
      alias: "",
    };
  },
  methods: {
    async onShort() {
      try {
        const res = await axios.post("http://localhost:3000/get", {
          url: this.url,
          uset: this.alias,
        });
        const { data } = res;
        const urltab = document.querySelector(".urltab");
        urltab.classList.remove("hidden");
        urltab.classList.add("flex");
        console.log(data.shorted_url);
        urltab.innerHTML = `<a href="${data.shorted_url}" class="text-green-900 gfont text-lg">${data.shorted_url}</a>`;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
