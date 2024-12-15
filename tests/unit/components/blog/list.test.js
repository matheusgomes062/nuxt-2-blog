import { mount } from '@vue/test-utils';
import List from '@/components/blog/list.vue';

describe('List.vue', () => {
    const mockFormatDate = (date) =>
        date
            ? new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(new Date(date))
            : undefined;

    let wrapperOptions;

    beforeEach(() => {
        // Ensure mocks and stubs are consistently applied
        wrapperOptions = {
            mocks: {
                $formatDate: mockFormatDate,
            },
            stubs: {
                NuxtLink: {
                    props: ['to'],
                    template: '<a :href="to"><slot /></a>',
                },
            },
        };
    });

    it('renders a list of articles when `data` is provided', () => {
        const mockData = [
            {
                _path: '/article-1',
                headline: 'Article 1',
                date: '2024-12-01',
                excerpt: 'Excerpt of article 1.',
            },
            {
                _path: '/article-2',
                headline: 'Article 2',
                date: '2024-12-02',
                excerpt: 'Excerpt of article 2.',
            },
        ];

        const wrapper = mount(List, {
            ...wrapperOptions,
            propsData: { data: mockData },
        });

        const articles = wrapper.findAll('li');
        expect(articles.length).toBe(mockData.length);

        articles.wrappers.forEach((article, index) => {
            const headline = article.find('h2');
            expect(headline.exists()).toBe(true);
            expect(headline.text()).toBe(mockData[index].headline);

            const date = article.find('p:nth-of-type(1)');
            expect(date.exists()).toBe(true);
            expect(date.text()).toBe(mockFormatDate(mockData[index].date));

            const excerpt = article.find('p:nth-of-type(2)');
            expect(excerpt.exists()).toBe(true);
            expect(excerpt.text()).toBe(mockData[index].excerpt);
        });
    });

    it('renders the default message when `data` is empty', () => {
        const wrapper = mount(List, {
            ...wrapperOptions,
            propsData: { data: [] },
        });

        const message = wrapper.find('p');
        expect(message.exists()).toBe(true);
        expect(message.text()).toBe(
            'There are no posts right now, but stay tuned for newer releases in the future.'
        );
    });

    it('renders a custom message when `message` prop is provided and `data` is empty', () => {
        const customMessage = 'Custom message for no posts';
        const wrapper = mount(List, {
            ...wrapperOptions,
            propsData: {
                data: [],
                message: customMessage,
            },
        });

        const message = wrapper.find('p');
        expect(message.exists()).toBe(true);
        expect(message.text()).toBe(customMessage);
    });

    it('does not render the message when `data` is not empty', () => {
        const mockData = [
            {
                _path: '/article-1',
                headline: 'Article 1',
                date: '2024-12-01',
                excerpt: 'Excerpt of article 1.',
            },
        ];

        const wrapper = mount(List, {
            ...wrapperOptions,
            propsData: { data: mockData },
        });


        // Encontre a mensagem específica
        const message = wrapper.find('p.w-full'); // Use uma classe ou seletor único

        // Verifique se o elemento não existe
        expect(message.exists()).toBe(false);
    });

    it('renders NuxtLink Lists with correct `to` attributes', () => {
        const mockData = [
            {
                _path: '/article-1',
                headline: 'Article 1',
                date: '2024-12-01',
                excerpt: 'Excerpt of article 1.',
            },
        ];

        const wrapper = mount(List, {
            ...wrapperOptions,
            propsData: { data: mockData },
        });

        // Encontre o stub do NuxtLink como <a>
        const link = wrapper.find('a');

        // Verifique se o link existe
        expect(link.exists()).toBe(true);

        // Verifique se o atributo `href` está correto
        expect(link.attributes('href')).toBe('/article-1/');
    });
});
