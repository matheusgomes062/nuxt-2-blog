<template>
  <div
    :class="[
      'fixed flex flex-col items-center w-12 sm:w-section_x z-20 bottom-[50px] right-0 text-typography_primary bg-brand_primary/90 transform duration-150 rounded-tl-md rounded-bl-md',
      isVisible ? '' : 'translate-x-full'
    ]"
  >
    <a href="#" aria-label="Scroll to Top" class="flex flex-col items-center py-1 text-center">
      <span class="text-xxs leading-xxs uppercase font-highlight sm:w-6/12">Scroll to Top</span>
      <IconsArrowUp class="w-4 h-4" width="16" height="16" />
    </a>
  </div>
</template>


<script>
export default {
  data() {
    return {
      isVisible: false,
    };
  },
  mounted() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.handleScroll);
      this.handleScroll(); // Ensure visibility is set on initial mount
    }
  },
  beforeDestroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.handleScroll);
    }
  },
  methods: {
    handleScroll() {
      if (typeof window !== 'undefined') {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        this.isVisible = st > window.innerHeight / 2;
      }
    },
  },
};
</script>
