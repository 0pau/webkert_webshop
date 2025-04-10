export interface HistoryDAO {

  addItem(id: string):void;
  getItems():string[];
  clear():void;
  size():number;

}
