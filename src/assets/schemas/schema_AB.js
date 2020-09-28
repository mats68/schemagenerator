schemas.AB = {
    type: 'form',
    name: 'form2',
    children: [{
            type: 'input',
            name: 'firstInput',
            label: 'Test-IA',
            field: 'text1',
            default: 'Standard'
        },
        {
            type: 'input',
            name: 'secondInput',
            label: 'Text2',
            field: 'text2',
            default () {
                return 'Test2';
            }
        },
    ]
}
