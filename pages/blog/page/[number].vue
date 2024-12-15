<template>
  <main>
    <!-- Query for the given blog page number -->
    <ContentQuery
      path="/blog"
      :only="['headline', 'excerpt', 'date', 'tags', '_path', 'image']"
      :sort="{ date: -1 }"
      :skip="blogCountLimit * (getPageNumber() - 1)"
      :limit="blogCountLimit"
    >
      <!-- In case it is found -->
      <template #default="{ data }">
        <BlogHero />
        <Section id="main" class="!pt-0">
          <BlogList :data="data" />
          <ContentQuery path="/blog" :only="['headline']">
            <template #default="{ data }">
              <BlogPagination
                v-if="getPageLimit(data.length) > 1"
                class="mt-8"
                :current-page="getPageNumber()"
                :total-pages="getPageLimit(data.length)"
                :next-page="getPageNumber() < getPageLimit(data.length)"
                base-url="/blog/"
                page-url="/blog/page/"
              />
            </template>
            <template #not-found>
              <!-- Nothing -->
            </template>
          </ContentQuery>
        </Section>
      </template>
      <!-- In case not found -->
      <template #not-found>
        <!-- Show hero and message -->
        <BlogHero />
        <Section id="main" class="!pt-0">
          <BlogList :data="[]" message="There are no posts in this page, maybe try searching on another one." />
        </Section>
      </template>
    </ContentQuery>
  </main>
</template>


<script>
export default {
  data() {
    return {
      blogCountLimit: 6,
    };
  },
  computed: {
    getPageNumber() {
      // Attempt to parse page number from route params
      const pageNo = Number(this.$route.params.number);
      return isNaN(pageNo) || pageNo <= 0 ? 1 : pageNo;
    },
  },
  watch: {
    // Watch for invalid page numbers and redirect
    '$route.params.number': {
      immediate: true,
      handler() {
        const pageNo = this.getPageNumber;
        if (pageNo <= 0 || isNaN(pageNo)) {
          this.$router.replace('/blog/');
        }
      },
    },
  },
  methods: {
    getPageLimit(totalPosts) {
      return Math.ceil(totalPosts / this.blogCountLimit);
    },
  },
};
</script>
