<?php
	
	$plain = $_GET['p'];
	
	$options = 
	[
		'cost' => 11,
		'salt' => mcrypt_create_iv(22, MCRYPT_DEV_URANDOM),
	];

	echo password_hash($plain, PASSWORD_BCRYPT, $options);
?>