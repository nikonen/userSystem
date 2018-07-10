<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");

require_once('vendor/autoload.php');
use Firebase\JWT\JWT;
include_once 'database.php';
define('JWT_SECRET', 'secret-phrase-that-should-be-somewhere-else');

$database = new Database();
$db = $database->getConnection();
$username = '';
$password = '';
$role = '';
$key;
$jwt;
$result = array();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->username)) {
    $username = $data->username;
}
if (!empty($data->password)) {
    $password = $data->password;
}
$data = (array)$data;

$toDo = $data['data'];

 switch ($toDo) {
    case "login": 
        loginUser($data, $db);
        break;
    case "privileges": 
        getUserPrivileges($data, $db);
        break;
    case "listUsers":
        listUsers($data, $db);
        break;
    case "logout":
        break;
    case "deleteUser":
        deleteUser($data, $db);
        break;
    case "checkToken": 
        checkToken($data);
        break;
    case "getUser": 
        getUser($data, $db);
        break;
    case "getUsers":
        getUsers($data, $db);
        break;
    case "deleteUser": 
        deleteUser($data, $db);
        break;
    case "signUpUser":
        signUpUser($data, $db);
        break;
    case "searchUser":
        searchUser($data,$db);
        break;
    case "uploadPicture":
        uploadPicture($data, $db);
 }
    
function loginUser($data, $db) {
    
$username = $data['username'];
$password = $data['password'];
$query = "select * from user where username=? limit 1";
$stmt = $db->prepare($query);
$stmt->execute((array($username)));
$result = $stmt->fetchObject();

if (password_verify($password, $result->password)) {

$loggedin = true;
$id = $result->id;
$username = $result->username;
/**
 * 
 *Just for the timestamp :)
 */
$query = "update user set loggedin = loggedin + 1 where id=?";
$stmt = $db->prepare($query);
$resultt= $stmt->execute((array($id)));

    $id = $result->id;
    $issuedAt = time();
    $expiration = $issuedAt + 120;
    $payload = array( 
        'id' => $id,
        'username' => $username,
        'iat'=> $issuedAt,
        'exp'=> $expiration
    );

    $key = JWT_SECRET;
    $alg = 'HS256';
    $jwt = JWT::encode($payload, $key, $alg);
    $resultJWT['jwt'] = $jwt;

    echo json_encode($resultJWT);
} else {
    echo "No go";
}
}

function getUser($data, $db) {
$id = $data['id'];
$query = "select * from user where id=? limit 1";
$stmt = $db->prepare($query);
$stmt->execute((array($id)));
$result = $stmt->fetchObject();




echo json_encode($result);
//var_dump($result);

}

function deleteUser($data, $db) {
$id = $data['id'];
$query = "delete from user where id=? limit 1";
$stmt = $db->prepare($query);
$result = $stmt->execute((array($id)));
echo json_encode($result);
}

function signUpUser($data, $db) {
$username = $data['username'];
$password = $data['password'];

$password = password_hash($password, PASSWORD_DEFAULT);

$email = $data['email'];
$query = 'insert into user (username, email, password) values (?,?,?)';
$stmt = $db->prepare($query);
$result = $stmt->execute((array($username, $email, $password)));
echo json_encode($result);
}

function getUsers($data, $db) {
    $query = "Select id, username,role, registerdate, picurl from user";
    $stmt = $db->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchAll();

    echo json_encode($result);
}

function searchUser($data, $db) {


        $search = $data['searchable'];

    
    $query = "SELECT * FROM user WHERE username LIKE '%{$search}%'";
    $stmt = $db->prepare($query);
    $stmt->execute((array($search)));
    $result = $stmt->fetchAll();
    
    echo json_encode($result);
}



function checkToken($data) {
    $token = $data['token'];
    $key = JWT_SECRET;
    $resultJWT = array();
    try {
        $decoded = JWT::decode($token, $key, array('HS256'));
        $decoded_array = (array)$decoded;
        $resultJWT = array(
            'code' => 200,
            'status' => 'success',
            'jwtPayload' => $decoded_array
        );

    } catch (Exception $e) {
        $resultJWT = array(
            'code' => 0,
            'status' => 'error',
            'message' => 'Invalid JWT - Authentication failed!'
        );
    }

    echo json_encode($resultJWT);

}


    




?>

