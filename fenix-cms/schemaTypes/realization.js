export default {
  name: 'realization',
  title: 'Realizacje',
  type: 'document',

  fields: [
    {
      name: 'title',
      title: 'Tytuł',
      type: 'string',
    },

    {
      name: 'image',
      title: 'Zdjęcie',
      type: 'image',

      options: {
        hotspot: true,
      },
    },
  ],
}