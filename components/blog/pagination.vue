<template>
    <div class="pagination-list text-typography_primary">
        <!-- Chevron for Previous Page -->
        <nuxt-link
            v-if="currentPage > 1"
            class="pagination-item pagination-icon"
            :to="prevLink"
        >
            <IconsChevronDown class="transform rotate-90 h-6 w-6" width="24" height="24" />
        </nuxt-link>

        <!-- First Page -->
        <nuxt-link
            :class="['pagination-item', 'pagination-page', currentPage === 1 ? 'active' : '']"
            :to="baseUrl"
        >
            1
        </nuxt-link>

        <!-- Left Ellipsis -->
        <span v-if="showLeftEllipsis" class="pagination-extra-left">...</span>

        <!-- Middle Pages -->
        <template v-for="page in pageRange">
            <nuxt-link
                v-if="page !== 1 && page !== totalPages"
                :key="page"
                :class="['pagination-item', 'pagination-page', currentPage === page ? 'active' : '']"
                :to="generatePageUrl(page)"
            >
                {{ page }}
            </nuxt-link>
        </template>

        <!-- Right Ellipsis -->
        <span v-if="showRightEllipsis" class="pagination-extra-right">...</span>

        <!-- Last Page -->
        <nuxt-link
            v-if="totalPages > 1"
            :class="['pagination-item', 'pagination-page', currentPage === totalPages ? 'active' : '']"
            :to="generatePageUrl(totalPages)"
        >
            {{ totalPages }}
        </nuxt-link>

        <!-- Chevron for Next Page -->
        <nuxt-link
            v-if="currentPage < totalPages"
            class="pagination-item pagination-icon"
            :to="generatePageUrl(currentPage + 1)"
        >
            <IconsChevronDown class="transform -rotate-90 h-6 w-6" width="24" height="24" />
        </nuxt-link>
    </div>
</template>

<script>
export default {
    props: {
        currentPage: {
            type: Number,
            required: true,
        },
        totalPages: {
            type: Number,
            required: true,
        },
        baseUrl: {
            type: String,
            required: true,
        },
        pageUrl: {
            type: String,
            required: true,
        },
    },
    computed: {
        prevLink() {
            return this.currentPage === 2 ? this.baseUrl : this.generatePageUrl(this.currentPage - 1);
        },
        pageRange() {
            if (this.totalPages <= 5) {
                // Just show all pages in a small range
                return Array.from({ length: this.totalPages - 2 }, (_, i) => i + 2);
            }
            // Otherwise use the existing logic
            const start = Math.max(2, this.currentPage - 1);
            const end = Math.min(this.totalPages - 1, this.currentPage + 1);
            return Array.from({ length: end - start + 1 }, (_, i) => start + i);
        },
        showRightEllipsis() {
            return this.totalPages > 5 && this.currentPage < this.totalPages - 2;
        },
        showLeftEllipsis() {
            return this.currentPage > 3;
        },
    },
    methods: {
        generatePageUrl(pageNo) {
            return `${this.pageUrl}${pageNo}/`;
        },
    },
};
</script>

<style scoped>
.pagination-list {
    @apply flex flex-row w-full items-center justify-center;
}
.pagination-item.active {
    @apply bg-brand_primary text-background;
}
.pagination-item {
    @apply rounded-md border border-typography_primary px-2 py-1 mx-1 w-8 text-center h-full;
}
.pagination-item:not(.active):hover {
    @apply bg-brand_primary/25;
}
.pagination-extra {
    @apply w-8 text-lg leading-lg text-center;
}
.pagination-icon {
    @apply w-10 text-center;
}
</style>
