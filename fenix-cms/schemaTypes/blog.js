export default {
  name: 'blog',
  title: 'Blog',
  type: 'document',

  fields: [
    {
      name: 'title',
      title: 'Tytuł',
      type: 'string',
    },

    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },

    {
      name: 'excerpt',
      title: 'Krótki opis',
      type: 'text',
    },

    {
  name: 'seoTitle',
  title: 'SEO tytuł',
  type: 'string',
},

{
  name: 'seoDescription',
  title: 'SEO opis',
  type: 'text',
},

    {
      name: 'content',
      title: 'Treść',
      type: 'array',
      of: [{ type: 'block' }],
    },

    {
      name: 'image',
      title: 'Zdjęcie główne',
      type: 'image',
      options: {
        hotspot: true,
      },
    },

    {
      name: 'publishedAt',
      title: 'Data publikacji',
      type: 'datetime',
    },
  ],
}