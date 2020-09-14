// https://medium.com/javascript-in-plain-english/create-a-responsive-card-grid-in-angular-using-flex-layout-3d1b58411e7a
import { Component, OnInit, Input } from '@angular/core';
import { SchemaService } from '../../schema.service';

@Component({
  selector: 'mt-cardgrid',
  templateUrl: './mt-cardgrid.component.html',
  styleUrls: ['./mt-cardgrid.component.scss']
})
export class MtCardgridComponent implements OnInit {
  @Input() comp: any;
  data: any[] = [];

  constructor(public srv: SchemaService) { 

     
  }

  ngOnInit(): void {
    this.data = this.srv.getValueArray(this.comp.field);
    this.srv.initGridData(this.data);
  }

  Insert(): void {
    this.srv.addGridRecord(this.data);
  }


  editRow(num: number) {
    alert('edit Row' + num);
  }


}
