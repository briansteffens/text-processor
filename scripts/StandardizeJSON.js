function StandardizeJSON() {
	TextProcessor.call(this);
};
StandardizeJSON.prototype = new TextProcessor();
StandardizeJSON.prototype.constructor = StandardizeJSON;

StandardizeJSON.prototype.createOptionsData = function() {
	return {
		"fields": [
			{"name": "indent string", "type": "string"},
		],
	};
};

StandardizeJSON.prototype.process = function(options, input) {
	return {
		"output": JSON.stringify(JSON.parse(input), undefined, options["indent string"]),
	};
};
