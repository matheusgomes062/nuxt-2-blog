<template>
  <nav class="toc">
    <header
      :class="['flex flex-row justify-between items-center cursor-pointer', isVisible ? 'mb-2' : '']"
      aria-label="Expand the table of contents."
      @click="toggleToc"
    >
      <span class="blog-aside-title mb-0">Table of Contents</span>
      <IconsChevronDown
        :class="['w-6 h-6 transform', isVisible ? '' : 'rotate-180']"
        width="24"
        height="24"
      />
    </header>
    <ul v-if="links" :class="[isVisible ? 'block' : 'hidden']">
      <!-- render each link with depth class -->
      <li
        v-for="link in flattenLinks(links)"
        :key="link.id"
        :class="`toc-link_${link.depth} first:mt-0 mt-2 md:mt-1`"
      >
        <a :href="`#${link.id}`" class="hover:underline hover:text-brand_primary">
          {{ link.text }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    links: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isVisible: true,
    };
  },
  methods: {
    toggleToc() {
      this.isVisible = !this.isVisible;
    },
    flattenLinks(links) {
      return links
        .map((link) => {
          let _link = [link];
          if (link.children) {
            // recursively flatten children links
            const flattened = this.flattenLinks(link.children);
            _link = [link, ...flattened];
          }
          return _link;
        })
        .flat(1);
    },
  },
};
</script>

<style scoped>
.toc-link_3 {
  padding-left: 1rem;
}
.toc-link_3::before {
  padding-right: 0.5rem;
  content: "-";
}
</style>
