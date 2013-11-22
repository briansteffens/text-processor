<?php

require 'model.php';

$model = new Model;

if (FALSE === $model->db->query("delete from scripts;"))
	die('Unable to delete existing scripts: '.$model->db_error()."\n");

function insert_script($name, $file, $description) {
	global $model;

	$s = new Script();
	$s->name = $name;
	$s->description = $description;
	$s->code = file_get_contents('../scripts/'.$file.'.js');
	$s->impl = $file;
	
	$model->insert_script($s);
	
	echo "Inserted ".$name."\n";
}

insert_script("Replace", "Replace", "Basic string replace.");
insert_script("Split", "Split", "Split into lines.");
insert_script("Join", "Join", "Join lines with delimiter.");
insert_script("Trim", "Trim", "Trim whitespace from each line.");
insert_script("Remove", "Remove", "Remove string from ends of line.");
insert_script("Remove Empty Lines", "RemoveEmptyLines", "Remove empty lines.");
insert_script("Append", "Append", "Append text to each line.");

?>
