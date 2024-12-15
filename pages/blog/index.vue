<template>
  <main>
    <BlogHero />
    <SectionComponent id="main" class="!pt-0">
      <ContentQuery
        v-slot="{ data }"
        path="/blog"
        :only="['headline', 'excerpt', 'date', 'tags', '_path', 'image']"
        :sort="{ date: -1 }"
        :limit="blogCountLimit"
      >
        <BlogList :data="data" />
      </ContentQuery>
      <BlogPagination
        v-if="totalPages > 1"
        class="mt-8"
        :current-page="1"
        :total-pages="totalPages"
        :next-page="totalPages > 1"
        base-url="/blog/"
        page-url="/blog/page/"
      />
    </SectionComponent>
  </main>
</template>


<script>
import BlogHero from '@/components/blog/hero.vue';
import SectionComponent from '@/components/section.vue';

export default {
  components: {
    BlogHero,
    SectionComponent,
  },
  data() {
    return {
      blogCountLimit: 6,
      totalPages: 0,
    };
  },
  async fetch() {
    try {
      const posts = await this.$content('/blog').only('headline').fetch();
      this.totalPages = Math.ceil(posts.length / this.blogCountLimit);
    } catch (err) {
      console.error('Error fetching blog data:', err);
    }
  },
};
</script>
