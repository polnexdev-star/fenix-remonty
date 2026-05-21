export default {
  name: 'beforeAfter',
  title: 'Przed i po',
  type: 'document',

  fields: [
    {
      name: 'title',
      title: 'Tytuł',
      type: 'string',
    },

    {
      name: 'beforeImage',
      title: 'Zdjęcie przed',
      type: 'image',
      options: {
        hotspot: true,
      },
    },

    {
      name: 'afterImage',
      title: 'Zdjęcie po',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
}