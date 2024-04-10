<template>
  <div>
    <label :for="name">{{ label }}</label>
    <input
      :type="mode"
      :id="name"
      :name="name"
      :class="isValid ? undefined : 'error'"
      v-model="input"
      @blur="checkInputValid"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    default: "text",
  },
  name: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["check"]);

const input = defineModel("input");

const isValid = ref(true);

function checkInputValid() {
  emit("check", props.name);
  if (!input.value) {
    isValid.value = false;
    return;
  }
  isValid.value = true;
}
</script>

<style scoped lang="scss">
div {
  width: 100%;
  height: auto;
  background: #f5f8fa;
  border-radius: 4px;
  label {
    display: block;
    height: 16px;
    padding: 4px 8px;
    margin-bottom: 8px;
    color: #657786;
  }
  input {
    font-size: 18px;
    appearance: none;
    width: 100%;
    height: 32px;
    padding: 0 8px;
    border: none;
    border-bottom: 2px solid #222;
    outline: none;
    background-color: transparent;
    &:focus,
    &:hover {
      border-bottom: 2px solid #50b5ff;
    }
  }
  .error {
    border-bottom: 2px solid #fc5a5a;
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px #f5f8fa inset;
  }
}
</style>
