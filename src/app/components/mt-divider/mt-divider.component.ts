import { Component, OnInit, Input } from '@angular/core';
import { SchemaManager } from '../../base-components/schemaManager';
import { IComponent } from 'src/app/base-components/types';

@Component({
  selector: 'mt-divider',
  templateUrl: './mt-divider.component.html',
  styleUrls: ['./mt-divider.component.scss']
})
export class MtDividerComponent implements OnInit {
  @Input() sm: SchemaManager;
  @Input() comp: IComponent;

  constructor() { }
  
  ngOnInit(): void {
  }


}
