export interface FavoritesDAO {

  getItems() : string[];
  addItem(id: string):void;
  removeItem(id:string):void;

}
