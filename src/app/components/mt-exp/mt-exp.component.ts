import { Component, OnInit, Input } from '@angular/core';
import { SchemaService } from '../../schema.service';

@Component({
  selector: 'mt-exp',
  templateUrl: './mt-exp.component.html',
  styleUrls: ['./mt-exp.component.scss']
})
export class MtExpComponent implements OnInit {
  @Input() comp: any;

  constructor(public srv: SchemaService) { }

  ngOnInit(): void {
  }



}
