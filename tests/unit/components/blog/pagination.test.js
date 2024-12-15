import { mount } from '@vue/test-utils';
import Pagination from '@/components/blog/pagination.vue';

describe('Pagination Component', () => {
    const createWrapper = (propsData) => {
      return mount(Pagination, {
        propsData, // Vue 2 uses propsData
        stubs: {
          'nuxt-link': {
            props: ['to'],
            template: '<a :href="to"><slot /></a>',
          },
          'icons-chevron-down': {
            template: '<span class="icon-chevron-down"></span>'
          }
        }
      });
    };

    it('renders the correct number of pages', () => {
      const wrapper = createWrapper({
        currentPage: 2,
        totalPages: 5,
        baseUrl: '/base',
        pageUrl: '/page/'
      });

      const pageLinks = wrapper.findAll('.pagination-page');
      expect(pageLinks.length).toBe(5);
    });

    it('displays left ellipsis when currentPage is greater than 3', () => {
        const wrapper = createWrapper({
            currentPage: 4,
            totalPages: 6,
            baseUrl: '/base',
            pageUrl: '/page/'
        });

        expect(wrapper.find('.pagination-extra-left').exists()).toBe(true);
    });

    it('hides left ellipsis when currentPage is 3 or less', () => {
        const wrapper = createWrapper({
            currentPage: 3,
            totalPages: 6,
            baseUrl: '/base',
            pageUrl: '/page/'
        });

        expect(wrapper.find('.pagination-extra-left').exists()).toBe(false);
    });

    it('renders correct "prev" link URL', () => {
        const wrapper = createWrapper({
            currentPage: 3,
            totalPages: 5,
            baseUrl: '/base',
            pageUrl: '/page/'
        });

        const prevLink = wrapper.find('.pagination-icon');
        expect(prevLink.attributes('href')).toBe('/page/2/');
    });

    it('renders correct "next" link URL', () => {
        const wrapper = createWrapper({
            currentPage: 3,
            totalPages: 5,
            baseUrl: '/base',
            pageUrl: '/page/'
        });

        // The last-of-type icon is the next button
        const icons = wrapper.findAll('.pagination-icon');
        const nextLink = icons.at(icons.length - 1);
        expect(nextLink.attributes('href')).toBe('/page/4/');
    });

    it('adds "active" class to the current page', () => {
        const wrapper = createWrapper({
            currentPage: 3,
            totalPages: 5,
            baseUrl: '/base',
            pageUrl: '/page/'
        });

        const activePage = wrapper.find('.pagination-item.active');
        expect(activePage.exists()).toBe(true);
        expect(activePage.text()).toBe('3');
    });

    it('hides next chevron if on the last page', () => {
        const wrapper = createWrapper({
            currentPage: 5,
            totalPages: 5,
            baseUrl: '/base',
            pageUrl: '/page/'
        });

        const icons = wrapper.findAll('.pagination-icon');
        // There should be no next icon
        expect(icons.wrappers.some(icon => icon.attributes('href') === '/page/6/')).toBe(false);
    });

    it('hides prev chevron if on the first page', () => {
        const wrapper = createWrapper({
            currentPage: 1,
            totalPages: 5,
            baseUrl: '/base',
            pageUrl: '/page/'
        });

        const icons = wrapper.findAll('.pagination-icon');
        // There should be a next icon only, no prev icon
        expect(icons.length).toBe(1);
        // Check that the single icon must be the next icon, not prev
        expect(icons.at(0).attributes('href')).toBe('/page/2/');
    });

    it('renders correct last page link', () => {
        const wrapper = createWrapper({
            currentPage: 2,
            totalPages: 5,
            baseUrl: '/base',
            pageUrl: '/page/'
        });

        const links = wrapper.findAll('.pagination-item.pagination-page');
        expect(links.length).toBe(5);

        const lastPageLink = links.at(links.length - 1);
        expect(lastPageLink.exists()).toBe(true);
        expect(lastPageLink.text()).toBe('5');
        expect(lastPageLink.attributes('href')).toBe('/page/5/');
    });
});
