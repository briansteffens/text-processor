register({
  name: 'Remove',
  description: 'Remove string from end of line.',
  fields: [
    {
      name: "remove from side",
      type: "enum",
      enum_options: ["left", "right", "both"],
    },
    {
      name: "string to remove",
      type: "string",
    },
    {
      name: "greedy",
      type: "bool",
    },
  ],
  process: function(options, input) {
    var side = options['remove from side'];
    var remove = options['string to remove'];
    var greedy = options['greedy'];
    var output = '';
    var lines = input.split("\n");

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];

      while (true) {
        var last_length = line.length;

        if (side === 'left' || side === 'both')
          line = line.replace(RegExp('^' + remove), '');

        if (side === 'right' || side === 'both')
          line = line.replace(RegExp(remove + '$'), '');

        if (greedy === false || line.length === last_length)
          break;
      }

      if (i !== 0)
        output += "\n";

      output += line;
    }

    return {"output": output};
  },
});
