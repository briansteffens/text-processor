<!DOCTYPE html>
<?php
$includes = '';

foreach (scandir('scripts/') as $script) {
    if (substr($script, -3) === '.js') {
        if ($includes !== '') {
            $includes .= '        ';
        }
        $includes .= '<script src="scripts/'.$script.'"></script>'."\n";
    }
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

        <?php echo $includes; ?>
    </head>
    <body>
        <div id="header">
            <span class="title">text-processor</span>
            <a href="https://github.com/Tiltar/text-processor/"
                target="_blank">source code</a>
        </div>

        <div id="options">
            <div id="processors"></div>

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
