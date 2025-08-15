<script setup>
/* 사용법
  RegistrationView.vue 참고
*/

const props = defineProps({
  label: { type: String, required: true },
  modelValue: { type: String, required: true },
  readonly: { type: Boolean, default: true },
  formatter: { type: Function, default: null },
  placeholder: { type: String, default: "" },
  maxlength: { type: [Number, String], default: null },
});

const emit = defineEmits(["update:modelValue", "toggleEdit"]);
</script>

<template>
  <div class="mb-3">
    <div class="mb-1">
      <label class="body2">{{ label }}</label>
    </div>

    <div class="relative flex items-center border-[1px] border-gray-300 rounded-xl">
      <input
        type="text"
        class="w-full h-[3.25rem] rounded-xl pl-4 border-gray-300 text-gray-400 body1"
        :value="modelValue"
        :readonly="readonly"
        :placeholder="placeholder"
        :maxlength="maxlength"
        @input="
          (e) => emit('update:modelValue', formatter ? formatter(e.target.value) : e.target.value)
        "
      />

      <button
        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 body2"
        @click="emit('toggleEdit')"
      >
        {{ readonly ? "수정" : "완료" }}
      </button>
    </div>
  </div>
</template>
