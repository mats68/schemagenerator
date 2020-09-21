import { SchemaManager } from '../app/base-components/schemaManager';
import { IComponent, ISchema, ComponentType, ButtonKind, Color } from '../app/base-components/types';

function buttonClick(comp) {
  alert(comp.label);
}

export const schema1: ISchema =
{
  language: 'de',
  type: 'form',
  name: 'form',
  children: [
    {
      type: 'input',
      name: 'firstInput',
      required: true,
      label(sm: SchemaManager): string {
        return sm.Language === 'de' ? 'Standort' : 'Position';
      },
      field: 'text1'
    },
    {
      type: 'input',
      label: 'Autocomplete',
      hint: 'Choose an item',
      default: 'one',
      required: true,
      field: 'text2',
      options: ['one', 'two', 'test', 'three', 'four', 'five', 'six', 'seven', 'eight']
    },
    {
      type: 'input',
      label: 'Integer',
      dataType: 'int',
      required: true,
      field: 'int1'
    },
    {
      type: 'input',
      label: 'Float',
      dataType: 'float',
      required: true,
      field: 'float1'
    },
    {
      type: 'checkbox',
      label: 'Check1',
      field: 'check1',
      cols: 'col-xs-4',
    },
    {
      type: 'checkbox',
      label: 'Check2',
      field: 'check2',
      cols: 'col-xs-4',
    },
    {
      type: 'checkbox',
      label: 'Check3',
      field: 'check3',
      cols: 'col-xs-4',
    },
    {
      type: 'expansionspanel',
      label: 'Panel1',
      children: [
        {
          type: 'input',
          label: 'Text10',
          field: 'text10',
        },
        {
          type: 'checkbox',
          label: 'Hide Panel 2',
          field: 'check10',
          onChange(sm, comp, val): void {
            sm.toggleVisible('panel2', !val);
          }
        },
        {
          type: 'expansionspanel',
          label: 'Panel2',
          name: 'panel2',
          children: [
            {
              type: 'input',
              label: 'Text100',
              field: 'text100'
            },
            {
              type: 'checkbox',
              label: 'Check100',
              field: 'check100'
            },
            {
              type: 'input',
              label: 'Autocomplete2',
              field: 'text2a',
              options: ['one', 'two', 'three', 'four', 'test']
            },

          ]
        },
        {
          type: 'input',
          label: 'Multiline',
          field: 'multiline',
          rows: 6,
          multiline: true,
          hint: 'Hinweis',
          required: true

        },
        {
          type: 'input',
          label() {
            return 'Label from function'
          },
          field: 'test12',
          hint() {
            return 'Hinweis aus Funktion'
          },
          required: true

        },

      ]
    },
    {
      type: 'expansionspanel',
      label: 'Validation',
      children: [
        {
          type: 'input',
          label: 'Required',
          field: 'text20',
          cols: 'col-lg-3 col-xs-6',
          required: true
        },
        {
          type: 'input',
          label: 'Text30',
          cols: 'col-lg-3 col-xs-6',
          field: 'text30'
        },
        {
          type: 'input',
          label: 'Prev',
          cols: 'col-lg-3 col-xs-6',
          field: 'prev'
        },
        {
          type: 'input',
          label: 'Required if prev empty',
          field: 'next',
          cols: 'col-lg-3 col-xs-6',
          validate(sm: SchemaManager, comp: IComponent, val: any): string {
            if (!sm.Values.prev && !val) {
              return 'Required since prev is empty';
            }
            return '';

          }
        },
        {
          type: 'input',
          inputType: 'number',
          dataType: 'float',
          label: 'Number',
          cols: 'col-lg-3',
          field: 'number'
        },
        {
          type: 'input',
          label: 'Number with mask',
          dataType: 'float',
          mask: '0*.00',
          cols: 'col-lg-3',
          field: 'numbermask'
        },
        {
          type: 'input',
          label: 'Number with mask special character',
          hint: 'special character not saved',
          dataType: 'float',
          mask: '0*.00',
          maskOptions: {
            dropSpecialCharacters: true
          },
          cols: 'col-lg-3',
          field: 'numbermask2'
        },
        
      ]
    },
    {
      type: ComponentType.expansionspanel,
      label: 'Buttons',
      children: [
        {
          type: ComponentType.button,
          label: 'normal button',
          width: '140px',
          onClick(sm: SchemaManager, comp: IComponent)  {
            buttonClick(comp);
          }

        },
        {
          type: ComponentType.button,
          kind: ButtonKind.raised,
          label: 'raised button',
          width: '140px',
          onClick(sm: SchemaManager, comp: IComponent) {
            buttonClick(comp);
          }
        },
        {
          type: ComponentType.button,
          kind: ButtonKind.flat,
          width: '140px',
          style: 'color: blue',
          label: 'flat button',
          onClick(sm: SchemaManager, comp: IComponent) {
            buttonClick(comp);
          }
        },
        {
          type: ComponentType.button,
          kind: ButtonKind.stroked,
          width: '140px',
          label: 'stroked button',
          onClick(sm: SchemaManager, comp: IComponent) {
            buttonClick(comp);
          }
        },
        {
          type: ComponentType.button,
          kind: ButtonKind.icon,
          width: '140px',
          label: 'icon button',
          style: 'color: blue',
          icon: 'favorite',
          onClick(sm: SchemaManager, comp: IComponent) {
            buttonClick(comp);
          }
        },
        {
          type: ComponentType.button,
          kind: ButtonKind.fab,
          style: 'background-color: blue; color: white; width: 60px; height: 60px; margin-right: 10px',
          label: 'fab button',
          icon: 'favorite',
          onClick(sm: SchemaManager, comp: IComponent) {
            buttonClick(comp);
          }
        },
        {
          type: ComponentType.button,
          kind: ButtonKind.minifab,
          style: 'color: blue; width: 30px; height: 30px',
          label: 'minifab button',
          icon: 'menu',
          onClick(sm: SchemaManager, comp: IComponent) {
            buttonClick(comp);
          }
        },

      ]
    },
    {
      type: 'cardgrid',
      label: 'Adressen',
      field: 'adresses',
      // datacols: 'col-lg-6',
      summary(sm, comp, row) {
        const name = row.name ? `Name: ${row.name}` : '';
        const ort = row.ort ? ` Ort: ${row.ort}` : '';
        const email = row.email ? ` Email: ${row.email}` : '';

        return `${name}\n${ort}${email}`;

      },
      children: [
        {
          type: 'input',
          hidden: true,
          field: 'id',
        },
        {
          type: 'input',
          label: 'Adresstyp',
          field: 'typ',
          options: ["Rechnungsadresse", "Versandadresse"],
          required: true,
        },
        {
          type: 'input',
          label: 'Name',
          field: 'name',
          required: true,
        },
        {
          type: 'input',
          label: 'Ort',
          field: 'ort',
          required: true,
        },
        {
          type: 'input',
          inputType: 'email',
          label: 'Email',
          field: 'email',
          suffix: '.com',
          required: true,
        },
        {
          type: 'checkbox',
          label: 'Gueltig',
          field: 'gültig',
        },

      ]
    },
    {
      type: 'divider',
      style: 'margin-top: 60px;'
    },
    {
      type: 'button',
      label: 'Speichern',
      disabled(sm: SchemaManager) {
        return !sm.ValuesChanged
      },
      onClick(sm: SchemaManager) {
        sm.validateAll();
      }
    },

  ]
};

export const values1 = {
  text1: 'AA',
  text2: 'one',
  check1: true,
  numbermask: 123.55,
  number: 800,
  adresses: [
    {
      typ: 'Rechnungsadresse',
      name: 'Thaler Matthias',
      ort: 'Bern',
      email: 'Matthias@gmail.com'
    },
    {
      typ: 'Versandadresse',
      name: 'Meier Hans',
      ort: 'Zürich',
      email: 'MeierHans@gmail.com'
    }

  ]
};
