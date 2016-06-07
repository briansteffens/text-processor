register({
  name: 'Append',
  description: 'Append text to each line.',
  fields: [
    {
      name: "append to side",
      type: "enum",
      enum_options: ["left", "right", "both"],
    },
    {
      name: "string to append",
      type: "string",
    },
  ],
  process: function(options, input) {
    var side = options['append to side'];
    var append = options['string to append'];
    var output = '';

    var lines = input.split("\n");

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];

      if (side === 'left' || side === 'both')
        line = append + line;

      if (side === 'right' || side === 'both')
        line = line + append;

      if (i !== 0)
        output += "\n";

      output += line;
    }

    return {"output": output};
  },
});
