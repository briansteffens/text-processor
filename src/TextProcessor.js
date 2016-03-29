function TextProcessor() {
    this.name = null;
    this.description = null;
}

TextProcessor.prototype.generateFieldId = function(name) {
    return 'field_' + name.split(' ').join('_');
};

TextProcessor.prototype.createOptionsData = function() {
    return {"fields": []};
};

TextProcessor.prototype.renderFields = function(element) {
    var fields = this.createOptionsData()['fields'];

    for (var i = 0; i < fields.length; i++) {
        var field = fields[i];
        var fieldId = this.generateFieldId(field['name']);

        element.append(field['name'] + ':<br />');

        switch (field['type']) {
            case null:
            case 'string':
                element.append('<input id="' + fieldId + '" type="text" />');
                break;

            case 'bool':
                element.append('<input id="' + fieldId +
                        '" type="checkbox" />');
                break;

            case 'enum':
                if (!('enum_options' in field))
                    throw 'Field ' + field['name'] +
                        ' is enum but has no enum_options set.';

                var enumOptions = '';
                for (var j = 0; j < field['enum_options'].length; j++)
                    enumOptions += '<option>' + field['enum_options'][j] +
                        '</option>';

                element.append('<select id="' + fieldId + '">' + enumOptions +
                        '</select>');

                break;

            default:
                throw 'Field ' + field['name'] + ' has unrecognized type ' +
                    field['type'];
        }

        element.append('<br />');
    }
};

TextProcessor.prototype.readFields = function(element) {
    var fields = this.createOptionsData()['fields'];
    var result = {};

    for (var i = 0; i < fields.length; i++) {
        var field = fields[i];
        var fieldId = this.generateFieldId(field['name']);

        switch (field['type']) {
            case 'bool':
                result[field['name']] = $('#' + fieldId).prop('checked');
                break;

            default:
                result[field['name']] = $('#' + fieldId).val();
                break;
        }
    }

    return result;
};

TextProcessor.prototype.process = function(options, input) {
    return input;
};
