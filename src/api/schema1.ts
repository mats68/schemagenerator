import { SchemaService } from 'src/app/schema.service';
function change(srv: SchemaService, val: boolean): void {
    srv.toggleVisible('panel2', !val);
}


export const schema =
{
    type: 'form',
    name: 'form',
    children: [
        {
            type: 'input',
            name: 'firstInput',
            label: 'Text1',
            field: 'text1'
        },
        {
            type: 'autocomplete',
            label: 'Autocomplete',
            field: 'text2',
            options: ['one', 'two', 'test']
        },
        {
            type: 'checkbox',
            label: 'Check1',
            field: 'check1',
            width: '20%'
        },
        {
            type: 'checkbox',
            label: 'Check2',
            field: 'check2',
            width: '20%'
        },
        {
            type: 'checkbox',
            label: 'Check3',
            field: 'check3',
            width: '20%'
        },
        {
            type: 'expansionspanel',
            label: 'Panel1',
            children: [
                {
                    type: 'input',
                    label: 'Text10',
                    field: 'text10'
                },
                {
                    type: 'checkbox',
                    label: 'Hide Panel 2',
                    field: 'check10',
                    onChange(srv: SchemaService, val: boolean): void {
                        change(srv, val);
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
                            type: 'autocomplete',
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
                    placeholder: 'Etwas eingeben...',
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
                    required: true
                },
                {
                    type: 'input',
                    label: 'Text30',
                    field: 'text30'
                },
                {
                    type: 'input',
                    label: 'Prev',
                    field: 'prev'
                },
                {
                    type: 'input',
                    label: 'Required if prev empty',
                    field: 'next',
                    validate(srv: SchemaService): string {
                        if (!srv.Values.prev) {
                            return 'Required since prev is empty';
                        }
                        return '';

                    }
                },
                {
                    type: 'input',
                    inputType: 'number',
                    label: 'Number',
                    field: 'number'
                },
            ]
        },
        {
            type: 'cardgrid',
            label: 'Adresses Grid',
            field: 'adresses',
            summary(row: any, srv: SchemaService) {
                return row.name;

            },
            rows: [
                {
                    type: 'autocomplete',
                    label: 'Adresstyp',
                    field: 'typ',
                    options: ["Rechnungsadresse", "Versandadresse"]
                },
                {
                    type: 'input',
                    label: 'Name',
                    field: 'name'
                },
                {
                    type: 'input',
                    label: 'Ort',
                    field: 'ort'
                },
            ]
        },
        {
            type: 'divider',
            top: '500px'
        },
        {
            type: 'button',
            label: 'Speichern',
            color: 'primary',
            onClick(srv: SchemaService) {
                srv.validateAll();
            }
        },

    ]
};

export const values = {
    text1: 'AA',
    text2: 'one',
    check1: false,
    adresses: []

};
