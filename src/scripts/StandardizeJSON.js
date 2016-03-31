register({
  name: 'Standardize JSON',
  description: 'Attempts to standardize JSON data.',
  fields: [
    {
      name: 'indent string',
      type: 'string',
      default_value: '  ',
    },
  ],
  process: function(options, input) {
    return {
      "output": JSON.stringify(JSON.parse(input), undefined,
          options["indent string"]),
    };
  },
});
