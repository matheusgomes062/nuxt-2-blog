import { mount } from '@vue/test-utils';
import TableOfContents from '@/components/blog/tableOfContents.vue';

describe('tableOfContents.vue', () => {
  const links = [
    {
      id: 'introduction',
      text: 'Introduction',
      depth: 2,
      children: [
        {
          id: 'background',
          text: 'Background',
          depth: 3,
        },
      ],
    },
    {
      id: 'usage',
      text: 'Usage',
      depth: 2,
    },
  ];

  it('renders the table of contents title', () => {
    const wrapper = mount(TableOfContents, {
      propsData: { links },
    });
    expect(wrapper.find('span.blog-aside-title').text()).toBe('Table of Contents');
  });

  it('displays all flattened links', () => {
    const wrapper = mount(TableOfContents, {
      propsData: { links },
    });

    // Flattened, we should have Introduction, Background, and Usage
    const renderedLinks = wrapper.findAll('li');
    expect(renderedLinks.length).toBe(3);

    const textContents = renderedLinks.wrappers.map((li) => li.text());
    expect(textContents).toContain('Introduction');
    expect(textContents).toContain('Background');
    expect(textContents).toContain('Usage');

    // Check href attributes
    const anchors = wrapper.findAll('li a');
    expect(anchors.at(0).attributes('href')).toBe('#introduction');
    expect(anchors.at(1).attributes('href')).toBe('#background');
    expect(anchors.at(2).attributes('href')).toBe('#usage');
  });

  it('toggles visibility on header click', async () => {
    const wrapper = mount(TableOfContents, {
      propsData: { links },
    });

    // Initially visible
    let ul = wrapper.find('ul');
    expect(ul.exists()).toBe(true);
    expect(ul.attributes('class')).toContain('block');

    // Click header to toggle
    const header = wrapper.find('header');
    await header.trigger('click');

    // After click, should be hidden
    ul = wrapper.find('ul');
    expect(ul.attributes('class')).toContain('hidden');

    // Click again to show
    await header.trigger('click');
    ul = wrapper.find('ul');
    expect(ul.attributes('class')).toContain('block');
  });

  it('applies correct classes based on link depth', () => {
    const wrapper = mount(TableOfContents, {
      propsData: { links },
    });
    const liItems = wrapper.findAll('li');
    // Expect Introduction (depth 2) no extra indent
    // Expect Background (depth 3) to have 'toc-link_3' and indentation
    // Expect Usage (depth 2) again no extra indent
    expect(liItems.at(0).attributes('class')).toContain('toc-link_2');
    expect(liItems.at(1).attributes('class')).toContain('toc-link_3');
    expect(liItems.at(2).attributes('class')).toContain('toc-link_2');
  });
});
