import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mt-item',
  templateUrl: './mt-item.component.html',
  styleUrls: ['./mt-item.component.scss']
})
export class MtItemComponent implements OnInit {
  @Input() comp: any;

  constructor() { }

  ngOnInit(): void {
  }

  isComp(type: string): boolean {
    return !this.comp.hidden && this.comp.type == type;

  }

}
