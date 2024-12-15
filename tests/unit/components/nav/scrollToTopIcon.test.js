import { mount } from '@vue/test-utils';
import scrollTopIcon from '@/components/nav/scrollTopIcon.vue';

describe('scrollTopIcon.vue', () => {
  let addEventListenerSpy;
  let removeEventListenerSpy;

  beforeEach(() => {
    // Spy on window event listeners
    addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
  });

  afterEach(() => {
    // Restore mocks
    jest.restoreAllMocks();
  });

  it('renders the component correctly', () => {
    const wrapper = mount(scrollTopIcon);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('a[aria-label="Scroll to Top"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('Scroll to Top');
  });

  it('shows the button only after scrolling down past half the viewport', async () => {
    const wrapper = mount(scrollTopIcon);

    // Initial state: the button is hidden
    expect(wrapper.classes()).toContain('translate-x-full');

    // Simulate scroll event
    Object.defineProperty(window, 'pageYOffset', { value: window.innerHeight, writable: true });
    window.dispatchEvent(new Event('scroll'));

    await wrapper.vm.$nextTick();

    // After scroll: the button should become visible
    expect(wrapper.vm.isVisible).toBe(true);
    expect(wrapper.classes()).not.toContain('translate-x-full');
  });

  it('removes the scroll event listener on unmount', () => {
    const wrapper = mount(scrollTopIcon);
    wrapper.destroy(); // `destroy` is used in Vue 2 Test Utils instead of `unmount`

    // Ensure the scroll event listener was removed
    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  it('adds the scroll event listener on mount', () => {
    mount(scrollTopIcon);

    // Ensure the scroll event listener was added
    expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });
});
