<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $password = 'clochard'; // Remplacez par votre mot de passe
    if (isset($_POST['password']) && $_POST['password'] === $password) {
        session_start(); // Démarrage de la session
        $_SESSION['is_logged_in'] = true; // Authentification réussie
        header("Location: all_messages.php");
        exit;
    } else {
        $error = "Mot de passe incorrect.";
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion</title>
</head>
<body>
    <form action="login.php" method="post">
        <label for="password">Mot de passe :</label>
        <input type="password" name="password" id="password" required>
        <button type="submit">Connexion</button>
    </form>
    <?php if (isset($error)): ?>
        <p style="color: red;"><?= htmlspecialchars($error); ?></p>
    <?php endif; ?>
</body>
</html>
