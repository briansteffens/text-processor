register({
  name: 'Replace',
  description: 'Basic string replace.',
  fields: [
    {
      name: 'find',
      type: 'string',
    },
    {
      name: 'replace',
      type: 'string',
    },
  ],
  process: function(options, input) {
    return {
      "output": input.split(options['find']).join(options['replace']),
    };
  },
});
