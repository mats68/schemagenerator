import { Component, OnInit, Input } from '@angular/core';
import { SchemaService } from '../../schema.service';

@Component({
  selector: 'mt-divider',
  templateUrl: './mt-divider.component.html',
  styleUrls: ['./mt-divider.component.scss']
})
export class MtDividerComponent implements OnInit {
  @Input() comp: any;

  constructor(public srv: SchemaService) { }
  
  ngOnInit(): void {
  }


}
