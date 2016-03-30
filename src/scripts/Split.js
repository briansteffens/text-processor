register({
  name: 'Split',
  description: 'Split into lines.',
  fields: [
    {
      name: 'split on',
      type: 'string',
    },
  ],
  process: function(options, input) {
    var output = '';
    var lines = input.split(options['split on']);

    for (var i = 0; i < lines.length; i++) {
      if (i !== 0)
        output += "\n";

      output += lines[i];
    }

    return {"output": output};
  },
});
