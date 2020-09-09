import { Component } from '@angular/core';
import {SchemaService} from './schema.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  schema: any;
  title = 'schemagenerator';

  constructor(schemaService: SchemaService) {
    this.schema = schemaService.schema;

  }
}
