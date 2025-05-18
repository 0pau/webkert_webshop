import {Component, EventEmitter, Output} from '@angular/core';
import {MatTree, MatTreeNode, MatTreeNodeDef, MatTreeNodePadding, MatTreeNodeToggle} from '@angular/material/tree';
import {MenuItem} from '../../common/MenuItem';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatRipple} from '@angular/material/core';
import {Router} from '@angular/router';
import {routes} from '../../app.routes';

@Component({
  selector: 'app-side-menu',
  imports: [
    MatTree,
    MatTreeNode,
    MatTreeNodeDef,
    MatTreeNodeToggle,
    MatTreeNodePadding,
    MatIconButton,
    MatIcon,
    MatRipple
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})

export class SideMenuComponent {

  dataSource : MenuItem[] = [
    {
      title: "Számítástechnika",
      children:[
        {title: "Laptopok", url:"category:laptops"},
        {title: "Monitorok", url:"category:monitors"},
        {title: "Teljes számítógépek", url:"category:pcs"},
        {title: "Számítógép perifériák", children: [
            {title: "Egerek", url:"category:mice"},
            {title: "Billentyűzetek", url:"category:keyboards"}
        ]},
        {title: "Számítógép alkatrészek", children: [
            {title: "Processzorok", url:"category:cpus"},
            {title: "RAM", url:"category:ram"},
            {title: "Tárhely", url:"category:storage"},
          ]},
    ]},
    {
      title: "Hétköznapi elektronika",
      children:[
        {title: "Telefonok", url:"category:phones"},
        {title: "Tabletek", url:"category:tablets"},
        {title: "Televíziók", url:"category:tvs"},
    ]},
    {
      title: "Műszaki eszközök",
      children:[
        {title: "Integrált áramkörök", url:"category:ics"},
        {title: "Kábelek", url:"category:cables"},
        {title: "Műszerek", url:"category:instruments"},
    ]},
    {
      title: "Egyéb termékek",
      children:[
        {title: "Kuponok", url:"category:coupons"}
      ]},
  ];

  @Output() onItemSelected : EventEmitter<void> = new EventEmitter();

  constructor(private router: Router) {
  }

  childrenAccessor = (node: MenuItem) => node.children ?? [];

  hasChild = (_: number, node: MenuItem) => !!node.children && node.children.length > 0;

  goToItem(str:any) {
    this.router.navigateByUrl("search/"+str.url);
    this.onItemSelected.emit();
  }
}
