import { CZDState } from '@/interfaces/CZDState';

export class Storage<T> {
  private storeName: string = '';
  private defaultValue: any = null;

  constructor(storeName: string, defaultValue: T) {
    this.storeName = storeName;
    this.defaultValue = defaultValue;
  }

  public get(): T {
    const item = localStorage.getItem(this.storeName) || '';
    const values = item ? JSON.parse(item) : this.defaultValue;
    const result =
      this.defaultValue instanceof Array
        ? [...this.defaultValue, ...values]
        : { ...this.defaultValue, ...values };

    return result;
  }

  public set(mergeValues: object | T): T {
    const values = this.get();
    let updated: any;

    if (values instanceof Array) {
      const v = mergeValues instanceof Array ? mergeValues : [mergeValues];
      updated = [...values, ...v] as T[];
    } else {
      updated = { ...values, ...mergeValues } as T;
    }

    localStorage.setItem(this.storeName, JSON.stringify(updated));
    return updated;
  }

  public replace(newValue: T): T {
    const data = JSON.stringify(newValue);
    localStorage.setItem(this.storeName, data);
    return this.get();
  }

  public upgrade(...upgradeFns: Array<(data: any) => any>) {
    const data = this.get();
    const upgradedData = upgradeFns.reduce((upD, fn) => fn(upD), data);
    this.replace(upgradedData);
  }
}

export const store = new Storage<CZDState>('czdState', {});
