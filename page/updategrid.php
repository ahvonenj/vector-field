<?php

	header("Access-Control-Allow-Origin: *");
	
	if(isset($_POST["grids"], $_POST["auth"]))
	{
		if(password_verify($_POST["auth"], "$2y$11$4T2MkSwtIUQWZoSA6pm2n.jGeHOOLFZiIFbf.Je0KaR/xB7aAEM4a"))
		{
			$grids = $_POST["grids"];

			$regxd = NULL;
			preg_match_all('/(var grid =\s\[(.*)\];.*var fgrid =\s\[(.*)\];)/ims', $grids, $regxd);

			$success = file_put_contents("../resource/file/vectorgrid.js", $regxd[0][0]);

			echo "Doned";
		}
		else
		{
			echo "Wrong auth";
		}

		exit();
	}
	else
	{
		echo "POST param grids undefined";
		exit();
	}

?>