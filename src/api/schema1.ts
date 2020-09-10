import { SchemaService } from 'src/app/schema.service'

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
            type: 'input',
            label: 'Text2',
            field: 'text2'
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
                        srv.toggleVisible('panel2', !val);
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
                        if (!srv.Values['prev']) {
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
        }
    ]
}

export const values = {
    text1: 'AA',
    text2: 'BB',
    check1: false,
}