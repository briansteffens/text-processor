<?php

require_once('model.php');

$model = new Model;

$script = $model->select_script($_GET['name']);

header('Content-type: text/javascript');
echo $script->code;

?>
