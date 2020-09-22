import { Component, OnInit, Input } from '@angular/core';
import { SchemaManager } from '../../base/schemaManager';
import { IComponent } from 'src/app/base/types';

@Component({
  selector: 'mt-toolbar',
  templateUrl: './mt-toolbar.component.html',
  styleUrls: ['./mt-toolbar.component.scss']
})

export class MtToolbarComponent implements OnInit {
  @Input() sm: SchemaManager;
  @Input() comp: IComponent;
  smallScreen: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
