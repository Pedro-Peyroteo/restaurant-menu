function menuData() {
  return {
    // Runtime state
    categories: [],
    loading: true,
    error: false,

    // Tracks which section is currently "active" on screen.
    activeCategoryId: null,

    // IntersectionObserver instance (kept so we could clean it up if needed).
    observer: null,

    async init() {
      try {
        // Fetch menu data (single source of truth)
        const res = await fetch("./menu.json");
        const data = await res.json();
        this.categories = data.categories;

        // Wait until Alpine has rendered the sections,
        // otherwise there's nothing to observe yet.
        this.$nextTick(() => {
          this.setupObserver();
        });
      } catch (e) {
        console.error(e);
        this.error = true;
      } finally {
        // UI can render regardless of success or failure.
        this.loading = false;
      }
    },

    setupObserver() {
      const options = {
        root: null,
        // Activates sections when they are roughly centered in the viewport.
        rootMargin: "-40% 0px -50% 0px",
        threshold: 0,
      };

      // Observe each section to keep scroll position and UI state in sync.
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activeCategoryId = entry.target.id;
            this.scrollPillIntoView(entry.target.id);
          }
        });
      }, options);

      // Attach observer to every category section.
      this.categories.forEach((category) => {
        const section = document.getElementById(category.id);
        if (section) {
          this.observer.observe(section);
        }
      });
    },

    scrollPillIntoView(categoryId) {
      // Keep the active category pill visible and centered,
      // so the user always has context while scrolling.
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
