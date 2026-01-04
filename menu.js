function menuData() {
  return {
    categories: [],
    loading: true,
    error: false,

    async init() {
      try {
        const res = await fetch("./menu.json");
        const data = await res.json();
        this.categories = data.categories;
      } catch (e) {
        console.error(e);
        this.error = true;
      } finally {
        this.loading = false;
      }
    },
  };
}
