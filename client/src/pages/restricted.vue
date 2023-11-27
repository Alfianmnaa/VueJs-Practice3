<template>
  <div class="flex flex-col items-center h-auto pb-24 bg-gray-900">
    <h1 class="text-center text-green-500 text-3xl my-8">Kalijaga <span class="text-yellow-400">Player</span></h1>
    <div v-if="currentSong" class="text-center w-[400px] mt-4">
      <button @click="goBack" class="bg-green-500 text-white px-4 py-2 rounded mb-4">&lt; Back</button>
      <img :src="currentSong.image" alt="Song Image" class="w-full max-h-64 object-cover rounded" />
      <h2 class="text-white text-lg mt-4">{{ currentSong.title }}</h2>
      <audio controls :src="currentSong.src" autoplay class="w-full mt-4"></audio>
    </div>

    <div v-else>
      <p class="text-center text-gray-500">No song selected.</p>
    </div>

    <ul class="list-none flex flex-wrap justify-center mt-4">
      <li v-for="(song, index) in songs" :key="index" @click="selectSong(index)" class="m-4 cursor-pointer transform transition-transform hover:scale-110 w-40">
        <img :src="song.image" alt="Song Image" class="w-40 h-auto object-cover rounded mb-2" />
        <span class="text-white">{{ song.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";

interface Song {
  title: string;
  src: string;
  image: string;
}

export default {
  setup(): {
    songs: Ref<Song[]>;
    currentSong: Ref<Song | null>;
    selectSong: (index: number) => void;
    goBack: () => void;
  } {
    const songs: Ref<Song[]> = ref([
      {
        title: "Penjaga Hati",
        src: "https://res.cloudinary.com/alfianmna/video/upload/v1700401943/y2mate.com_-_nadhif_basalamah_penjaga_hati_Lirik_Lagu_swovly.mp3",
        image: "https://res.cloudinary.com/alfianmna/image/upload/v1700402709/1_yuoszy.png",
      },
      {
        title: "Bersamamu",
        src: "https://res.cloudinary.com/alfianmna/video/upload/v1700404025/y2mate.com_-_Jaz_Bersamamu_Official_Lyric_Video_scwrbm.mp3",
        image: "https://res.cloudinary.com/alfianmna/image/upload/v1700402709/2_ljnyio.png",
      },
      {
        title: "siapkah kau tuk jatuh cinta lagi",
        src: "https://res.cloudinary.com/alfianmna/video/upload/v1700402445/Y2meta.app_-_HIVI_-_Siapkah_Kau_Tuk_Jatuh_Cinta_Lagi_Official_Lyric_Video_128_kbps_cinaaj.mp3",
        image: "https://res.cloudinary.com/alfianmna/image/upload/v1700402709/3_wuw2n8.png",
      },
    ]);

    const currentSong: Ref<Song | null> = ref(null);

    const selectSong = (index: number): void => {
      currentSong.value = songs.value[index];
    };

    const goBack = (): void => {
      currentSong.value = null;
    };

    return {
      songs,
      currentSong,
      selectSong,
      goBack,
    };
  },
};
</script>
