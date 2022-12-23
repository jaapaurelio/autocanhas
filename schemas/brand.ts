export default {
    name: 'brand',
    type: 'document',
    title: 'Marcas',
    fields: [
        {
            name: 'name',
            type: 'string',
            title: 'Título',
            description: 'ex: Renault'
        },
        {
            name: 'image',
            type: 'image',
            title: 'Logotipo',
        },

    ]
}