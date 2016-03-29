function selectProcessor(element, processor) {
    $('#processors').children('div.processor').each(function(i) {
        $(this).toggleClass('processorSelected', (this === element));
    });

    var fields = $("#fields");

    fields.empty();
    processor.renderFields(fields);

    $('#submit').off('click').click(function() {
        var options = processor.readFields(fields);
        var input = $('#text');
        var output = processor.process(options, input.val());
        input.val(output['output']);
    });

    $('#submit').show();
}

$(function() {
    $('#submit').hide();
});
