register({
  name: 'Join',
  description: 'Join lines with delimiter.',
  fields: [
    {
      name: "delimiter",
      type: "string"
    },
  ],
  process: function(options, input) {
    return {
      "output": input.split("\n").join(options['delimiter']),
    };
  },
});
