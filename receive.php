<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");

$name = $_POST['name'];
$selectedBreedName = $_POST['breed'];

$apiUrl = "https://dog.ceo/api/breed/$selectedBreedName/images/random";

$imageResponse = file_get_contents($apiUrl);
$imageData = json_decode($imageResponse, true);

$response = array(
    'name' => $name,
    'breed' => $selectedBreedName,
    'image' => $imageData['message'],
    'fontColor' => $_POST['fontColor'],
    'fontStyle' => $_POST['fontStyle'],
    'dateTime' => $_POST['dateTime']
);

echo json_encode($response);
?>