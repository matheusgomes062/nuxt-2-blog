<template>
  <div>
    <span class="blog-aside-title mb-2 block">Continue Reading</span>
    <ul class="list-none">
      <li
        v-for="(other, index) in surround"
        v-if="other"
        :key="index"
        class="first:mt-0 mt-4 md:mt-1"
      >
        <NuxtLink
          :to="`${other._path}/`"
          class="hover:underline hover:text-brand_primary"
          :aria-label="other.headline"
        >
          {{ other.headline }}
        </NuxtLink>
        <p
          class="!no-underline md:hidden text-sm leading-sm md:text-xs md:leading-xs mt-1"
        >
          {{ other.excerpt }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    surround: {
      type: Array,
      required: true,
    },
  },
};
</script>
