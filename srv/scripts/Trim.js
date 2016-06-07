register({
  name: 'Trim',
  description: 'Trim whitespace from each line.',
  fields: [],
  process: function(options, input) {
    var output = '';
    var lines = input.split("\n");

    for (var i = 0; i < lines.length; i++) {
      if (output !== '')
        output += "\n";

      output += lines[i].trim();
    }

    return {"output": output};
  },
});
