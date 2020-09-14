import { Component, Input } from '@angular/core';
import { SchemaService } from '../../schema.service';

@Component({
  selector: 'mt-label',
  templateUrl: './mt-label.component.html',
  styleUrls: ['./mt-label.component.scss']
})
export class MtLabelComponent {
  @Input() comp: any;

  constructor(public srv: SchemaService) {

  }


}
