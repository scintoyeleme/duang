def((Scheme, ListControl, Table, TableTip, Pager) => class extends Scheme {
  load() {
    let params = {};
    let { scheme } = this;
    if (scheme.pageSize) {
      params.limit = scheme.pageSize;
      params.offset = scheme.pageSize * (new UParams().page - 1 || 0);
    }
    return api(scheme.api + '?' + new UParams(params));
  }
  error(error) {
    alert(error.message || 'Unknown Error');
  }
  init() {
    let scheme = this.scheme;
    this.$data = this.load();
    let tip = new TableTip().renderTo(this);
    this.$data.then(list => {
      new ListControl({ scheme }).renderTo(this);
      let table = new Table({ scheme }).renderTo(this);
      table.render(list);
      tip.render(list);
      new Pager({ scheme, list }).renderTo(this);
    }, error => {
      tip.render(error);
    });
  }
});