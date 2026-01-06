function menuData() {
  return {
    categories: [],
    loading: true,
    error: false,

    activeCategoryId: null, // NEW
    observer: null, // NEW

    async init() {
      try {
        const res = await fetch("./menu.json");
        const data = await res.json();
        this.categories = data.categories;

        // Wait for DOM to render sections
        this.$nextTick(() => {
          this.setupObserver();
        });
      } catch (e) {
        console.error(e);
        this.error = true;
      } finally {
        this.loading = false;
      }
    },

    setupObserver() {
      const options = {
        root: null,
        rootMargin: "-40% 0px -50% 0px", // tunes when section becomes active
        threshold: 0,
      };

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activeCategoryId = entry.target.id;
            this.scrollPillIntoView(entry.target.id);
          }
        });
      }, options);

      this.categories.forEach((category) => {
        const section = document.getElementById(category.id);
        if (section) {
          this.observer.observe(section);
        }
      });
    },

    scrollPillIntoView(categoryId) {
      const pill = document.querySelector(`[data-pill="${categoryId}"]`);
      if (pill) {
        pill.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    },
  };
}
