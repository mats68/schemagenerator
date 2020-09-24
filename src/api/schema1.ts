import { SchemaManager } from '../app/base/schemaManager';
import { IComponent, ISchema, ComponentType, ButtonKind, Color } from '../app/base/types';

function buttonClick(comp) {
  alert(comp.label);
}

export const schema1: ISchema =
{
  language: 'de',
  type: 'form',
  name: 'form',
  onInitSchema(sm) {

  },
  onSubmit(sm) {
    console.log('form submitted');
  },
  onResize(sm) {
    const c = sm.getCompByName('tb');
    c!.menuView = sm.ScreenSize === 'xs';
  },
  onDataLoaded(sm) {
    const liste = sm.Schema.auswahllisten.mitarbeiter;
    const c = sm.getCompByName('mitarbeiter');
    c!.options = Object.values(liste) as string[];
    sm.refresh_UI();
  },
  children: [
    {
      type: 'input',
      name: 'firstInput',
      cols: 'sm-12 lg-6',
      required: true,
      label(sm: SchemaManager): string {
        return sm.Language === 'de' ? 'Standort' : 'Position';
      },
      field: 'text1'
    },
    {
      type: 'input',
      label: 'Autocomplete',
      cols: 'sm-12 lg-6',
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
      type: 'input',
      label: 'Mitarbeiter',
      options: [],
      field: 'mitarbeiter'
    },
    {
      type: 'checkbox',
      label: 'Check1',
      field: 'check1',
      cols: 'xs-4',
    },
    {
      type: 'checkbox',
      label: 'Check2',
      field: 'check2',
      cols: 'xs-4',
    },
    {
      type: 'checkbox',
      label: 'Check3',
      field: 'check3',
      cols: 'xs-4',
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
            const c = sm.getCompByName('panel2');
            if (c) c.hidden = !val; 
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
          cols: 'lg-3 xs-6',
          required: true
        },
        {
          type: 'input',
          label: 'Text30',
          cols: 'lg-3 xs-6',
          field: 'text30'
        },
        {
          type: 'input',
          label: 'Prev',
          cols: 'lg-3 xs-6',
          field: 'prev'
        },
        {
          type: 'input',
          label: 'Required if prev empty',
          field: 'next',
          cols: 'lg-3 xs-6',
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
          cols: 'lg-3',
          field: 'number'
        },
        {
          type: 'input',
          label: 'Number with mask',
          dataType: 'float',
          mask: '0*.00',
          cols: 'lg-3',
          field: 'numbermask'
        },
        {
          type: 'input',
          label: 'mask special character',
          hint: 'special character not saved',
          dataType: 'float',
          mask: '0*.00',
          maskOptions: {
            dropSpecialCharacters: true
          },
          cols: 'lg-3',
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
          width: '80px',
          label: 'icon button',
          style: 'color: blue',
          icon: 'favorite',
          onClick(sm: SchemaManager, comp: IComponent) {
            buttonClick(comp);
          }
        },
        {
          type: ComponentType.button,
          kind: ButtonKind.minifab,
          // style: 'background-color: blue; width: 30px; height: 30px; color: white',
          width: '45px',
          label: 'minifab button',
          icon: 'menu',
          onClick(sm: SchemaManager, comp: IComponent) {
            buttonClick(comp);
          }
        },

      ]
    },
    {
      type: 'expansionspanel',
      label: 'Focus Input',
      children: [
        {
          type: 'button',
          cols: 'md-2',
          kind: 'raised',
          label: 'Focus Input',
          onClick(sm) {
            sm.DoFocus(sm.getCompByField('focusinput'));
          }
        },
        {
          type: 'input',
          cols: 'md-5',
          field: 'focusinput',
          label: 'Focus',
        }
      ]
    },
    {
      type: 'datatable',
      label: 'Adressen',
      field: 'adresses',
      cardView: true,
      // datacols: 'lg-6',
      summary(sm, comp, row) {
        const name = row.name ? `Name: ${row.name}` : '';
        const ort = row.ort ? ` Ort: ${row.ort}` : '';
        const email = row.email ? ` Email: ${row.email}` : '';

        return `${name}\n${ort}${email}`;

      },
      children: [
        {
          type: 'input',
          label: 'Adresstyp',
          field: 'typ',
          options: ["Rechnungsadresse", "Versandadresse"],
          required: true,
          cols: 'md-6',
        },
        {
          type: 'input',
          label: 'Name',
          field: 'name',
          required: true,
          cols: 'md-6',
        },
        {
          type: 'input',
          label: 'Ort',
          field: 'ort',
          required: true,
          cols: 'md-6',
        },
        {
          type: 'input',
          inputType: 'email',
          label: 'Email',
          field: 'email',
          suffix: '.com',
          required: true,
          cols: 'md-6',
        },
        {
          type: 'checkbox',
          label: 'Gueltig',
          field: 'gültig',
          cols: 'md-6',
        },

      ]
    },
    {
      type: 'toolbar',
      label: 'Eine Toolbar',
      name: 'tb',
      toolbarItems: [
        {
          label: 'First',
          icon: 'menu',
          color: 'primary',
          onClick(sm, comp) {alert(comp.label)}
        },
        {
          label: 'Delete',
          icon: 'delete',
          color: 'warn',
          onClick(sm, comp) {alert(comp.label)}
        },
      ]
    },
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
    {
      type: 'button',
      kind: 'raised',
      cols: 'md-1',
      label: 'Focus prev',
      onClick(sm: SchemaManager) {
        sm.DoFocus(sm.getCompByField('prev'));
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
