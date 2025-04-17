<?php
// Démarrer la session pour gérer l'authentification
session_start();

// Vérifier si l'utilisateur est connecté
if (!isset($_SESSION['is_logged_in']) || $_SESSION['is_logged_in'] !== true) {
    header("Location: login.php"); // Redirige vers une page de connexion si non connecté
    exit;
}

// Connexion à la base de données
$host = 'localhost'; // Remplacez par votre hôte de base de données
$db = 'anonymous_messages'; // Remplacez par le nom de votre base de données
$user = 'root'; // Remplacez par le nom d'utilisateur de la base de données
$password = ''; // Remplacez par le mot de passe de la base de données

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erreur de connexion à la base de données : " . $e->getMessage());
}

// Récupérer les messages depuis la base de données
$sql = "SELECT * FROM messages ORDER BY timestamp DESC LIMIT 10";
$stmt = $pdo->query($sql);
$messages = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Messages Reçus</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>Messages Reçus</h1>
        <a href="logout.php" class="logout-button">Déconnexion</a>
    </header>
    <main>
        <section id="messages-list">
            <?php if (count($messages) > 0): ?>
                <ul>
                    <?php foreach ($messages as $message): ?>
                        <li>
                            <strong>Message ID #<?= htmlspecialchars($message['id']); ?>:</strong>
                            <p><?= htmlspecialchars($message['message']); ?></p>
                            <small>Reçu le : <?= htmlspecialchars($message['timestamp']); ?></small>
                        </li>
                        <hr>
                    <?php endforeach; ?>
                </ul>
            <?php else: ?>
                <p>Aucun message reçu pour le moment.</p>
            <?php endif; ?>
        </section>
    </main>
</body>
</html>
