<template>
  <section>
    <div class="info">
      <img
        src="https://png.pngtree.com/png-vector/20221222/ourmid/pngtree-super-cute-cartoon-vector-bear-png-image_6504049.png"
      />
      <div class="account">
        <h3>username</h3>
        <h4>@account</h4>
      </div>
    </div>
    <button v-if="following" class="following">Following</button>
    <button v-else class="follow">Follow</button>
  </section>
</template>

<script setup lang="ts">
defineProps({
  following: {
    type: Boolean,
    required: true,
  },
});
</script>

<style scoped lang="scss">
section {
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #e6ecf0;

  display: flex;
  justify-content: space-between;
  align-items: center;
  .info {
    display: flex;
    align-items: center;
    margin-left: 8px;
    gap: 8px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
    }
    .account {
      h3 {
        font-size: 15px;
      }
      h4 {
        font-size: 14px;
        color: #657786;
      }
    }
  }
  button {
    appearance: none;
    padding: 0 12px;
    border-radius: 50px;
    height: 35px;
    margin-right: 8px;
    cursor: pointer;
  }
  button.follow {
    border: 1px solid #ff6600;
    color: #ff6600;
    background-color: transparent;
  }
  button.following {
    border: none;
    color: #fff;
    background-color: #ff6600;
  }
}
</style>
