<!DOCTYPE html>
<?php

require 'model.php';

$model = new Model;
$scripts = $model->select_all_scripts();

$processor_includes = '';
$processor_list = '';

foreach ($scripts as $script) {
    $processor_includes .=
        "\t\t".'<script type="text/javascript">'."\n".
            $script->code.
        "\n\t\t</script>";

    $click = 'onclick="selectProcessor(this, new '.$script->impl.'());"';
    $processor_list .=
        '<div class="processor" '.$click.'>'.
            '<span class="title">'.$script->name.'</span>'.
            '<span class="description">'.$script->description.'</span>'.
        '</div>';
}

?>
<html>
    <head>
        <meta charset="UTF-8" />

        <title>text-processor</title>

        <link rel="stylesheet" type="text/css" href="style.css"
            media="screen" />

        <script src="jquery-1.10.1.min.js"></script>

        <script src="standard.js"></script>
        <script src="TextProcessor.js"></script>

        <?php echo $processor_includes; ?>
    </head>
    <body>
        <div id="header">
            <span class="title">text-processor</span>
            <a href="https://github.com/Tiltar/text-processor/"
                target="_blank">source code</a>
        </div>

        <div id="options">
            <div id="processors">
                <?php echo $processor_list; ?>
            </div>

            <div id="fieldcontainer">
                <div id="fields"></div>

                <input id="submit" type="button" value="process" />
            </div>
        </div>

        <div id="textcontainer">
            <textarea id="text"></textarea>
        </div>
    </body>
</html>
