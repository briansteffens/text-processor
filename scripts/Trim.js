function Trim() {
    TextProcessor.call(this);
};
Trim.prototype = new TextProcessor();
Trim.prototype.constructor = Trim;

Trim.prototype.createOptionsData = function() {
    return {"fields": []};
};

Trim.prototype.process = function(options, input) {
    var output = '';
    var lines = input.split("\n");

    for (var i = 0; i < lines.length; i++) {
        if (output !== '')
            output += "\n";

        output += lines[i].trim()
    }

    return {
        "output": output,
    };
};
