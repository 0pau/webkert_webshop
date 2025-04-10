import {HistoryDAO} from './HistoryDAO';

export class HistoryDAOInMemory implements HistoryDAO {

  private items : string[] = [];

  addItem(id: string): void {

    if (this.items.includes(id)) {
      this.items.splice(this.items.indexOf(id), 1);
    }
    this.items.unshift(id);

  }

  clear(): void {
    this.items.splice(0, this.items.length);
  }

  getItems(): string[] {
    return this.items;
  }

  size():number {
    return this.items.length;
  }
}
