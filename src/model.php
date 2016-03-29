<?php

class Script {
    public $name;
    public $description;
    public $code;
    public $impl;

    function load($row) {
        $this->name = $row["name"];
        $this->description = $row["description"];
        $this->code = $row["code"];
        $this->impl = $row["impl"];
    }
}

class Model {
    public $db = null;

    function __construct() {
        require '/etc/text-processor.conf';

        $this->db = new mysqli(
            $CONFIG["db"]["host"],
            $CONFIG["db"]["user"],
            $CONFIG["db"]["pass"],
            $CONFIG["db"]["db"]
        );

        if ($this->db->connect_errno)
            die("Failed to connect to database: ".db_error());
    }

    function __destruct() {
        if (!is_null($this->db))
            $this->db->close();
    }

    function db_error() {
        return $this->db->connect_errno." - ".$this->db->connect_error;
    }

    function select_all_scripts() {
        if ($result = $this->db->query("select * from scripts;")) {
            $ret = array();

            while ($row = $result->fetch_assoc()) {
                $script = new Script;
                $script->load($row);
                $ret[] = $script;
            }

            $result->close();

            return $ret;
        }
        else
            throw new Exception("Failed to select all scripts: ".db_error());
    }

    function select_script($name) {
        $q = $this->db->prepare("select * from scripts where name = ?;");
        $q->bind_param("s", $name);

        if (!$q->execute())
            throw new Exception("Failed to select script: ".db_error());

        $result = $q->get_result();
        $data = $result->fetch_assoc();

        $script = new Script;
        $script->load($data);
        return $script;
    }

    function insert_script($script) {
        $q = $this->db->prepare(
            "insert into scripts (name, description, code, impl) ".
            "values (?, ?, ?, ?);"
        );
        $q->bind_param("ssss", $script->name, $script->description,
            $script->code, $script->impl);
        $q->execute();
        $q->close();
    }
}

?>
