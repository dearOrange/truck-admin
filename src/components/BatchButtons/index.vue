<template>
  <div class="batch-buttons">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BatchButtons'
}
</script>

<style lang="scss" scoped>
.batch-buttons {
  display: flex;
}
</style>
