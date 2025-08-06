<script setup>
const props = defineProps({
  type: {
    type: String,
    required: false,
    default: "password",
  }
});

const emit = defineEmits(["press-key", "delete"]);

const handlePress = (num) => {
  emit("press-key", num);
};

const handleDelete = () => {
  emit("delete");
};
</script>

<template>
  <div class="grid grid-cols-3 w-full gap-2">
    <button
      v-for="n in 9"
      :key="n"
      class="h-12 title2 font-normal rounded-lg active:bg-blue-100"
      @click="() => handlePress(n)"
    >
      {{ n }}
    </button>
    <button
      v-if="props.type==='amount'"
      class="h-12 title2 font-normal rounded-lg active:bg-blue-100"
      @click="() => handlePress('00')"
    >
      00
    </button>
    <div v-else></div>
    <button
      class="h-12 title2 font-normal rounded-lg active:bg-blue-100"
      @click="() => handlePress(0)"
    >
      0
    </button>
    <button
      class="h-12 title2 font-normal rounded-lg active:bg-blue-100"
      @click="handleDelete"
    >
      ←
    </button>
  </div>
</template>
