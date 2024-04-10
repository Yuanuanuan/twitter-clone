<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle opacity="0.12" cx="28" cy="28.0001" r="28" fill="#FC5A5A" />
    <g clip-path="url(#clip0_25100_3200)">
      <path
        d="M28 18C22.48 18 18 22.48 18 28C18 33.52 22.48 38 28 38C33.52 38 38 33.52 38 28C38 22.48 33.52 18 28 18ZM29 33H27V31H29V33ZM29 29H27V23H29V29Z"
        fill="#FC5A5A"
      />
    </g>
    <defs>
      <clipPath id="clip0_25100_3200">
        <rect
          width="24"
          height="24"
          fill="white"
          transform="translate(16 16)"
        />
      </clipPath>
    </defs>
  </svg>
</template>

<script setup lang="ts">
defineProps({
  size: {
    type: Number,
    default: 84,
  },
});
</script>
