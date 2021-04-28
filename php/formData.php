<?php
$list_id = 'edac562c3e';
$authToken = '21c7a50c4217af6e91efdf66890767da-us1';

$postData = array(
    "email_address" => $_POST['values']["EMAIL"],
    "status" => "subscribed",
    "merge_fields" => array(
        "FNAME" => $_POST['values']["FNAME"],
        "LNAME" => $_POST['values']["LNAME"],
        "PHONE" => $_POST['values']["PHONE"]
    )
);

$ch = curl_init('https://us1.api.mailchimp.com/3.0/lists/' . $list_id . '/members/');
curl_setopt_array($ch, array(
    CURLOPT_POST => TRUE,
    CURLOPT_RETURNTRANSFER => TRUE,
    CURLOPT_HTTPHEADER => array(
        'Authorization: apikey ' . $authToken,
        'Content-Type: application/json'
    ),
    CURLOPT_POSTFIELDS => json_encode($postData)
));

$response = curl_exec($ch);
echo (json_decode($response)->status);
