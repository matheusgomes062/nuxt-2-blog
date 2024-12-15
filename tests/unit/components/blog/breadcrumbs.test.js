import { mount } from '@vue/test-utils';
import Breadcrumb from '@/components/blog/breadcrumbs.vue';

describe('Breadcrumb.vue', () => {
    it('renders the headline prop correctly', () => {
        const headline = 'My Awesome Post';
        const wrapper = mount(Breadcrumb, {
            propsData: { headline },
        });

        const finalCrumb = wrapper.find('[data-testid="current-crumb"] span[itemprop="name"]');
        expect(finalCrumb.exists()).toBe(true);
        expect(finalCrumb.text()).toBe(headline);
    });

    it('renders all required schema.org attributes', () => {
        const wrapper = mount(Breadcrumb, {
            propsData: { headline: 'Another Post' },
        });

        const breadcrumbList = wrapper.find('ol[itemscope][itemtype="https://schema.org/BreadcrumbList"]');
        expect(breadcrumbList.exists()).toBe(true);

        const items = wrapper.findAll('li[itemprop="itemListElement"][itemscope][itemtype="https://schema.org/ListItem"]');
        expect(items.length).toBe(3);

        items.wrappers.forEach((item, index) => {
            const positionMeta = item.find('meta[itemprop="position"]');
            expect(positionMeta.exists()).toBe(true);
            expect(positionMeta.attributes('content')).toBe((index + 1).toString());
        });
    });

    it('renders Home and Blog links correctly', () => {
        const wrapper = mount(Breadcrumb, {
            propsData: { headline: 'My Blog Post' },
        });

        const links = wrapper.findAll('a[itemprop="item"]');
        expect(links.length).toBe(2);

        const homeLink = links.at(0);
        expect(homeLink.attributes('href')).toBe('/');
        const homeNameSpan = homeLink.find('span[itemprop="name"]');
        expect(homeNameSpan.exists()).toBe(true);
        expect(homeNameSpan.text()).toBe('Home');

        const blogLink = links.at(1);
        expect(blogLink.attributes('href')).toBe('/blog/');
        const blogNameSpan = blogLink.find('span[itemprop="name"]');
        expect(blogNameSpan.exists()).toBe(true);
        expect(blogNameSpan.text()).toBe('Blog');
    });

    it('renders separators correctly', () => {
        const wrapper = mount(Breadcrumb, {
            propsData: { headline: 'Post Title' },
        });

        const separators = wrapper.findAll('.mx-1');
        expect(separators.length).toBe(2);
        separators.wrappers.forEach((separator) => {
            expect(separator.text()).toBe('/');
        });
    });
});
