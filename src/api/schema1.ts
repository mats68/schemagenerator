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
            field: 'check1'
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
                    onChange(srv: SchemaService, val: boolean) {
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
                }
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
            ]
        }


    ]
}

export const values = {
    text1: 'AA',
    text2: 'BB',
    check1: false,
}