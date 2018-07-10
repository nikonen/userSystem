<?php


class Database {
    private $host = "localhost";
    private $db_name = "nameless";
    private $username = "root";
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

