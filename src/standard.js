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
    description.appendChild(document.createTextNode(processor.description));
    div.appendChild(description);

    container.appendChild(div);
  }

  document.getElementById('submit').style.display = 'none';
};

function make_field_id(name) {
  return 'field_' + name.split(' ').join('_');
};

function render_fields(fields, element) {
  for (let i = 0; i < fields.length; i++) {
    let field = fields[i];
    let field_id = make_field_id(field['name']);

    element.appendChild(document.createTextNode(field['name'] + ':'));
    element.appendChild(document.createElement('br'));

    switch (field['type']) {
      case null:
      case 'string':
        let el_text = document.createElement('input');
        el_text.setAttribute('id', field_id);
        el_text.setAttribute('type', 'text');
        if (field.default_value !== undefined) {
          el_text.setAttribute('value', field.default_value);
        }
        element.appendChild(el_text);
        break;

      case 'bool':
        let el_check = document.createElement('input');
        el_check.setAttribute('id', field_id);
        el_check.setAttribute('type', 'checkbox');
        if (field.default_value) {
          el_check.setAttribute('checked', 'checked');
        }
        element.appendChild(el_check);
        break;

      case 'enum':
        if (!('enum_options' in field)) {
          throw 'Field '+field['name']+' is enum but has no enum_options set.';
        }

        let options = document.createElement('select');
        options.setAttribute('id', field_id);

        for (let j = 0; j < field['enum_options'].length; j++) {
          let option_val = field['enum_options'][j];
          let option = document.createElement('option');
          option.appendChild(document.createTextNode(option_val));
          if (field.default_value === option_val) {
            option.setAttribute('selected', 'selected');
          }
          options.appendChild(option);
        }

        element.appendChild(options);
        break;

      default:
        throw 'Field '+field['name']+' has unrecognized type '+field['type'];
    }

    element.appendChild(document.createElement('br'));
  }
};

function read_fields(fields) {
  let result = {};

  for (let i = 0; i < fields.length; i++) {
    let field = fields[i];
    let field_id = make_field_id(field['name']);

    let el = document.getElementById(field_id);

    switch (field['type']) {
      case 'bool':
        result[field['name']] = el.checked;
        break;

      default:
        result[field['name']] = el.value;
        break;
    }
  }

  return result;
};

function select(element, processor) {
  // Update selection visually
  let processors = document.getElementById('processors');
  for (let i = 0; i < processors.children.length; i++) {
    let el = processors.children[i];
    let cls = 'processor';

    if (el === element) {
      cls += ' selected';
    }

    el.className = cls;
  }

  // Clear fields
  let fields = document.getElementById('fields');
  while (fields.firstChild) {
    fields.removeChild(fields.firstChild);
  }

  render_fields(processor.fields, fields);

  let submit = document.getElementById('submit');

  // Wire up the processor to run on submit click
  submit.onclick = function() {
    let options = read_fields(processor.fields);
    let input = document.getElementById('text');
    let output = processor.process(options, input.value);
    input.value = output.output;
  };

  submit.style.display = 'inline-block';
}
