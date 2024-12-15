<template>
  <component
    :is="type"
    :id="id"
    :class="[
      'px-section_x_sm py-section_y_sm sm:px-section_x sm:py-section_y relative',
      fullHeight ? 'full-height' : '',
      forcedHeight ? 'full-height--forced' : ''
    ]"
  >
    <slot />
  </component>
</template>


<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'section',
    },
    fullHeight: {
      type: Boolean,
      default: false,
    },
    forcedHeight: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.full-height.full-height--forced {
  height: calc(100vh - theme('spacing.nav'));
}
@media (min-width: 768px) {
  .full-height:not(.full-height--forced) {
    height: calc(100vh - theme('spacing.nav'));
  }
}
</style>
