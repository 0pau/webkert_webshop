import { Component } from '@angular/core';
import {MatTree, MatTreeNode, MatTreeNodeDef, MatTreeNodePadding, MatTreeNodeToggle} from '@angular/material/tree';
import {MenuItem} from '../../common/MenuItem';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatRipple} from '@angular/material/core';

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
        {title: "Laptopok"},
        {title: "Monitorok"},
        {title: "Teljes számítógépek"},
        {title: "Számítógép perifériák", children: [
            {title: "Egerek"},
            {title: "Billentyűzetek"}
        ]},
    ]},
    {
      title: "Hátköznapi elektronika",
      children:[
        {title: "Telefonok"},
        {title: "Tabletek"},
        {title: "Televíziók"},
    ]},
    {
      title: "Műszaki eszközök",
      children:[
        {title: "Integrált áramkörök"},
        {title: "Kábelek"},
        {title: "Műszerek"},
    ]},
    {
      title: "Egyéb termékek",
      children:[
        {title: "Kuponok"}
      ]},
  ];

  childrenAccessor = (node: MenuItem) => node.children ?? [];

  hasChild = (_: number, node: MenuItem) => !!node.children && node.children.length > 0;

}
