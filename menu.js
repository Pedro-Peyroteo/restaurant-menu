function menuData() {
  return {
    categories: [],
    loading: true,
    error: false,
    activeCategory: null,

    async init() {
      try {
        const res = await fetch("./menu.json");
        const data = await res.json();
        this.categories = data.categories;
        this.$nextTick(() => this.observeSections());
      } catch (e) {
        console.error(e);
        this.error = true;
      } finally {
        this.loading = false;
      }
    },

    observeSections() {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.activeCategory = entry.target.id;
            }
          });
        },
        {
          rootMargin: "-40% 0px -55% 0px",
          threshold: 0,
        }
      );

      this.categories.forEach((cat) => {
        const el = document.getElementById(cat.id);
        if (el) observer.observe(el);
      });
    },
  };
}
