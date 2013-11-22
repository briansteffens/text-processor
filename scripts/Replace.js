function Replace() {
	TextProcessor.call(this);
};
Replace.prototype = new TextProcessor();
Replace.prototype.constructor = Replace;

Replace.prototype.createOptionsData = function() {
	return {
		"fields": [
			{"name": "find", "type": "string"},
			{"name": "replace", "type": "string"},
		],
	};
};

Replace.prototype.process = function(options, input) {
	return {
		"output": input.split(options['find']).join(options['replace']),
	};
};
