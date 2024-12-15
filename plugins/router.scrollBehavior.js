const navHeight = 64; // px

export default ({ app }) => {
  app.router.options.scrollBehavior = async (to, from, savedPosition) => {
    if (savedPosition && !to.hash) {
      return savedPosition;
    }

    const findEl = (hash, x = 0) => {
      const el = document.querySelector(hash);
      if (el) {
        return el;
      }

      // If not found after first attempt, wait and retry once.
      // The timeout needs to be enough to ensure the element is rendered.
      if (x > 0) {
        return document.querySelector("#app");
      }

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(findEl(hash, 1));
        }, 300);
      });
    };

    if (to.hash && to.hash !== '#') {
      const el = await findEl(to.hash);
      if (el) {
        const offset = el.getBoundingClientRect().top + window.scrollY - navHeight;
        if ("scrollBehavior" in document.documentElement.style) {
          window.scrollTo({ top: offset, behavior: "smooth" });
        } else {
          window.scrollTo(0, offset);
        }
        return;
      }
    }

    return { x: 0, y: 0 };
  };
};
