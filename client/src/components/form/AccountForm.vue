<template>
  <form @submit.prevent="$emit('handleSubmit')">
    <BaseInput
      label="Account"
      name="account"
      v-model:input="formData.account"
    />
    <BaseInput
      label="Username"
      name="username"
      v-model:input="formData.username"
    />
    <BaseInput
      label="Email"
      mode="email"
      name="email"
      v-model:input="formData.email"
    />
    <BaseInput
      label="Password"
      name="password"
      v-model:input="formData.password"
    />
    <BaseInput
      label="Confirm Password"
      name="confirmPassword"
      v-model:input="formData.confirmPassword"
    />
    <slot></slot>
  </form>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { IRegistData } from "../../types";
import BaseInput from "../UI/BaseInput.vue";

defineProps({
  formData: {
    type: Object as PropType<IRegistData>,
    required: true,
  },
});

defineEmits(["handleSubmit"]);
</script>

<style scoped lang="scss">
form {
  width: 540px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
}
</style>
