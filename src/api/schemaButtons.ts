import { SchemaManager } from '../app/base/schemaManager';
import { IComponent, ISchema, ComponentType, ButtonKind, Color } from '../app/base/types';

export const buttons: Array<IComponent> = [
{
    type: 'errorpanel',
    label: 'Fehler',
  },    
  {
    type: 'divider',
    style: 'margin-top: 60px;'
  },
  {
    type: 'button',
    label: 'Speichern',
    style: 'color: blue',
    kind: 'raised',
    cols: 'md-1',
    onClick(sm: SchemaManager) {
      sm.validateAll();
    }
  },
  {
    type: 'button',
    isSubmit: true,
    kind: 'raised',
    cols: 'md-1',
    label: 'Submit'
  },
  {
    type: 'button',
    kind: 'raised',
    cols: 'md-1',
    label: 'refresh UI',
    onClick(sm: SchemaManager) {
      sm.refresh_UI();
    }
  },
]