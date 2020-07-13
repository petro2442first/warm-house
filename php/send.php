<?php
require './PHPMailer.php';
require './SMTP.php';
require './Exception.php';
require './OAuth.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\OAuth;

// Instantiation and passing `true` enables exceptions
$mail = new PHPMailer(true);

$out[] = json_decode(file_get_contents('php://input'));
$subject = $out[0][0];
$name = $out[0][1];
$phone = $out[0][2];
try {
    //Server settings
    $mail->SMTPDebug = false;                      // Enable verbose debug output
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host = 'cluashared03.twinservers.net';                 // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'test@art-portfolio.alfafood-ge.com';                     // SMTP username
    $mail->Password   = 'Petro244275665';
	$mail->SMTPSecure = 'ssl';
	$mail->SMTPOptions = array(
	   'ssl' => array(
	     'verify_peer' => false,
	     'verify_peer_name' => false,
	     'allow_self_signed' => true
	    )
	);
	
	$mail->Port = 465;

    $mail->setFrom('test@art-portfolio.alfafood-ge.com', 'Mailer');
    $mail->addAddress('mrb13022001@gmail.com', 'Joe User'); 


    // Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = "=?UTF-8?B?".base64_encode('Заявка с сайта teplotech.com')."?=";

    $mail->Body = "
    <p>{$subject}</p>
    <p>Номер телефона: {$phone}</p>
    ";
    if($name !== '') {
    	$mail->Body .= "<p>Имя: {$name}</p>";
    }
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();
    echo 'Ваша заявка отправлена!';
} catch (Exception $e) {
    echo "Во время отправки произошла ошибка: {$mail->ErrorInfo}";
}
?>