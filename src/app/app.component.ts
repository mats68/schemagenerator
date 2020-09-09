import { Component } from '@angular/core';
import {SchemaService} from './schema.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'schemagenerator';

  constructor(schemaService: SchemaService) {
    console.log(schemaService.schema);

  }
}
