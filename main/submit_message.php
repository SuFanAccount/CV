<?php
$servername = "localhost";
$username = "root"; // Par défaut sur XAMPP
$password = ""; // Par défaut sur XAMPP
$dbname = "anonymous_messages";

// Connexion à la base de données
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Échec de la connexion : " . $conn->connect_error);
}

// Sauvegarde du message
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['message'])) {
    $message = $conn->real_escape_string($_POST['message']);
    $sql = "INSERT INTO messages (message) VALUES ('$message')";
    if ($conn->query($sql) === TRUE) {
        echo "Message enregistré avec succès !";
    } else {
        echo "Erreur : " . $conn->error;
    }
}

$conn->close();
?>
