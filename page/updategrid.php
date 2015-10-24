<?php

	header("Access-Control-Allow-Origin: *");
	
	if(isset($_POST["grids"], $_POST["auth"]))
	{
		if(md5($_POST["auth"]) === "5ee1e992958b13adfd77e10342f25f6c")
		{
			$grids = $_POST["grids"];

			$regxd = NULL;
			preg_match_all('/(var grid =\s\[(.*)\];.*var fgrid =\s\[(.*)\];)/ims', $grids, $regxd);

			$success = file_put_contents("resource/file/vectorgrid.js", $regxd[0][0]);

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