function Join() {
    TextProcessor.call(this);
};
Join.prototype = new TextProcessor();
Join.prototype.constructor = Join;

Join.prototype.createOptionsData = function() {
    return {
        "fields": [
            {"name": "delimiter", "type": "string"},
        ],
    };
};

Join.prototype.process = function(options, input) {
    return {
        "output": input.split("\n").join(options['delimiter']),
    };
};
