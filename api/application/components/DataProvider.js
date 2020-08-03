const _config = {
  filters: {},
  pagination: {
    offset: 0,
    page: 1,
    limit: 10
  }
};

class DataProvider {
  model = null;
  config = null;

  constructor(model, config = {}) {
    this.model = model;
    this.config = {
      ..._config,
      ...config
    };
  }

  async getData() {
    const { filters, pagination } = this.config;
    console.log(filters, pagination);
    const page = parseInt(pagination.page, 10);
    const limit = parseInt(pagination.limit, 10);
    const _filters = this.model.filter(filters);

    return this.model.paginate(_filters, {
      page,
      limit
    });
  }
}

export default DataProvider;
