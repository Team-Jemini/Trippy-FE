<script setup>
import { defineModel, defineProps, ref } from 'vue';

const pin = defineModel();

const props = defineProps({
  title: String,
})

const hiddenInput = ref(null)

const onInput = (event) => {
  pin.value = event.target.value.replace(/[^0-9]/g, "").slice(0, 4)
};
const focusInput = () => {
  hiddenInput.value?.focus()
}
</script>

<template>
  <div @click="focusInput"
    class="flex items-center
 justify-between bg-white m-2 w-full h-15 p-4 rounded-xl shadow-custom body2 text-gray-600 focus-within:ring-1 ring-blue">
    <p>{{ props.title }}</p>
    <input type="text" inputmode="numeric" pattern="[0-9]*" class="sr-only" v-model="pin" @input="onInput"
      ref="hiddenInput" />
    <div class="flex gap-2">
      <div v-for="i in 4" :key="i" :class="[i <= pin.length ? 'bg-main-gradient' : 'bg-gray-300']"
        class="bg-gray-300 w-4 h-4 rounded-[50%]"></div>
    </div>
  </div>
</template>

<style scoped></style>
