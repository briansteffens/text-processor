register({
  name: 'Remove Empty Lines',
  description: 'Remove empty lines.',
  fields: [],
  process: function(options, input) {
    var output = '';
    var lines = input.split("\n");

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];

      if (line === '')
        continue;

      if (output !== '')
        output += "\n";

      output += line;
    }

    return {"output": output};
  },
});
