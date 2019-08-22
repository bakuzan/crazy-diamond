class Store {
  private state: any = null;

  constructor(init?: any) {
    this.state = init || null;
  }

  public get() {
    return this.state;
  }

  public set(value: any) {
    this.state = value;
  }
}

export default new Store();
