<!DOCTYPE html>
<html>
    <head>
        <title>Score</title>
        <meta charset="utf-8" />
    </head>
    <body>
        
        <p>
            <?php $bdd = new PDO('mysql:host=localhost;dbname=ndl;charset=utf8', 'root', 'be83fbba'); 
                $reponse = $bdd->query('SELECT * FROM scoreboard ORDER BY score DESC LIMIT 10');
            // On affiche chaque entrée une à une
                $rang = 1;
                $i = 0;
            while ($donnees = $reponse->fetch())
            {
    ?>
        <p>
        <?php 
            $arrang = array($rang, $donnees['nom'], $donnees['score']); 
            $array[] = $arrang; 
            $i++;   
        ?>

   </p>
   
<?php
}
//$array = array($arrang0, $arrang1, $arrang2, $arrang3, $arrang4, $arrang5, $arrang6, $arrang7, $arrang8, $arrang9);
echo json_encode($array);
$reponse->closeCursor(); // Termine le traitement de la requête
?>

    </body>
</html>