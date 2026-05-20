export default {
  name: 'review',
  title: 'Opinie',
  type: 'document',

  fields: [
    {
      name: 'name',
      title: 'Imię',
      type: 'string',
    },

    {
      name: 'text',
      title: 'Treść opinii',
      type: 'text',
    },
  ],
}