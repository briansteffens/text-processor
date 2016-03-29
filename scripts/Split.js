function Split() {
    TextProcessor.call(this);
};
Split.prototype = new TextProcessor();
Split.prototype.constructor = Split;

Split.prototype.createOptionsData = function() {
    return {
        "fields": [
            {"name": "split on", "type": "string"},
        ],
    };
};

Split.prototype.process = function(options, input) {
    var output = '';
    var lines = input.split(options['split on']);

    for (var i = 0; i < lines.length; i++) {
        if (i !== 0)
            output += "\n";

        output += lines[i];
    }

    return { "output": output };
};
