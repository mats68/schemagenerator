export const schema =
{
    type: 'form',
    children: [
        {
            type: 'input',
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
                    label: 'Check10',
                    field: 'check10'
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