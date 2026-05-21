export default {
  name: 'service',
  title: 'Usługi',
  type: 'document',

  fields: [
    {
      name: 'title',
      title: 'Nazwa usługi',
      type: 'string',
    },

    {
      name: 'icon',
      title: 'Ikona',
      type: 'string',
    },

    {
      name: 'text',
      title: 'Opis usługi',
      type: 'text',
    },
  ],
}