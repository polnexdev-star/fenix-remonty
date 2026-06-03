export default {
  name: 'lead',
  title: 'Zapytania klientów',
  type: 'document',

  fields: [
    {
      name: 'name',
      title: 'Imię i nazwisko',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Numer telefonu',
      type: 'string',
    },
    {
      name: 'message',
      title: 'Wiadomość',
      type: 'text',
    },

{
  name: 'uploadedFiles',
  title: 'Załączone pliki',
  type: 'array',
  of: [{ type: 'url' }],
},

{
  name: 'status',
  title: 'Status',
  type: 'string',
  options: {
    list: [
      { title: 'Nowe', value: 'new' },
      { title: 'W trakcie wyceny', value: 'quote' },
      { title: 'Umówione', value: 'scheduled' },
      { title: 'Zrealizowane', value: 'completed' },
      { title: 'Odrzucone', value: 'rejected' },
    ],
  },
  initialValue: 'new',
},

    {
      name: 'createdAt',
      title: 'Data zgłoszenia',
      type: 'datetime',
    },
  ],
}