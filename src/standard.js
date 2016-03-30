var processors = [];

function register(processor) {
    processors.push(processor);
}

window.onload = function() {
    let container = document.getElementById('processors');

    for (let i = 0; i < processors.length; i++) {
        let processor = processors[i];

        let div = document.createElement('div');
        div.className = 'processor';
        div.onclick = function() {
            select(div, processor);
        }

        let title = document.createElement('span');
        title.setAttribute('class', 'title');
        title.appendChild(document.createTextNode(processor.name));
        div.appendChild(title);

        let description = document.createElement('span');
        description.setAttribute('class', 'description');
        description.appendChild(document.createTextNode(
                    processor.description));
        div.appendChild(description);

        container.appendChild(div);
    }
};

function field_id(name) {
    return 'field_' + name.split(' ').join('_');
};

function render_fields(fields, element) {
    for (let i = 0; i < fields.length; i++) {
        let field = fields[i];
        let fieldId = field_id(field['name']);

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

                let enumOptions = '';
                for (let j = 0; j < field['enum_options'].length; j++)
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

function read_fields(fields) {
    let result = {};

    for (let i = 0; i < fields.length; i++) {
        let field = fields[i];
        let fieldId = field_id(field['name']);

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

function select(element, processor) {
    $('#processors').children('div.processor').each(function(i) {
        $(this).toggleClass('processorSelected', (this === element));
    });

    let fields = $("#fields");

    fields.empty();
    render_fields(processor.fields, fields);

    $('#submit').off('click').click(function() {
        let options = read_fields(processor.fields);
        let input = $('#text');
        let output = processor.process(options, input.val());
        input.val(output['output']);
    });

    $('#submit').show();
}

$(function() {
    $('#submit').hide();
});
