<!DOCTYPE html>
<html>
    <head>
        <title>Insert</title>
        <meta charset="utf-8" />
    </head>
    <body>
        
        <p>
            <?php $bdd = new PDO('mysql:host=localhost;dbname=ndl;charset=utf8', 'root', 'be83fbba'); 
            $req = $bdd->prepare('INSERT INTO scoreboard(nom, score) VALUES(:nom, :score)');
            $req->execute(array(
                'nom' => $_GET["nom"],
                'score' => $_GET["score"]
            ));
?>

    </body>
</html>