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
      name: 'createdAt',
      title: 'Data zgłoszenia',
      type: 'datetime',
    },
  ],
}