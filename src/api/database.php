<?php

/**
* this will be away from public_html
**/
class Database {
    private $host = "";
    private $db_name = "";
    private $username = "";
    private $password = "";
    public $conn;

public function getConnection() {
    
    try {
        $this->conn = new PDO("mysql:host=".$this->host. ";dbname=". $this->db_name, $this->username, $this->password);
    } catch (Exception $ex) {
        echo "Connection error: " . $ex->getMessage();
    }
    return $this->conn;
}
}

?>

