<?php
/**
 * Connexion à la base de données
 */
$bdd = new PDO('mysql:host=localhost;dbname=ndl;charset=utf8', 'ndl', 'ndl'); 

/**
 * Insertion du nouveau score
 */
$req = $bdd->prepare('INSERT INTO scoreboard(nom, score) VALUES(:nom, :score)');
$req->execute(array(
	'nom' => $_GET["nom"],
	'score' => $_GET["score"]
));

/**
 * Selection des 10 meilleurs scores
 */
$reponse = $bdd->query('SELECT * FROM scoreboard ORDER BY score DESC LIMIT 10');
while ($donnees = $reponse->fetch())
{
	$arrang = array($rang, $donnees['nom'], $donnees['score']); 
	$array[] = $arrang; 
	$i++;   
}

/**
 * Afficher en json le résultat
 */
echo json_encode($array);
?>
