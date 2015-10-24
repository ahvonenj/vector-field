<!doctype html>
<html>
    <head>
        <title>Vector field editor</title>
        <meta charset = "utf8">
        <link rel = "stylesheet" type = "text/css" href = "../style/editorstyle.css" />
        <script src = "../script/lib/jquery-2.1.3.min.js"></script>
        <script src = "../script/editorindex.js"></script>
    </head>
    <body>
		<div id = "container">
			<table id = "grid">

			</table>
		</div>

		<div data-ctrltype = 'mode' data-ctrl = 'up' class = "button selected" id = "up-button">UP</div>
		<div data-ctrltype = 'mode' data-ctrl = 'right' class = "button" id = "right-button">RIGHT</div>
		<div data-ctrltype = 'mode' data-ctrl = 'down' class = "button" id = "down-button">DOWN</div>
		<div data-ctrltype = 'mode' data-ctrl = 'left' class = "button" id = "left-button">LEFT</div>
		<div data-ctrltype = 'mode' data-ctrl = 'nop' class = "button" id = "nop-button">NOP</div>
		<div data-ctrltype = 'mode' data-ctrl = 'angl' class = "button" id = "angl-button">ANGL</div>
		<input type = "text" id = "angl" value = "45"/>
		<div data-ctrltype = 'mode' data-ctrl = 'magic' class = "button" id = "magic-button">MAGIC</div>

		<input type = "text" id = "force" placeholder = "Force" value = "50"/>

		<div data-ctrltype = 'clear' class = "button" id = "clear-button">CLEAR</div>
		<div data-ctrltype = 'print' class = "button" id = "print-button">PRINT</div>
		<input type = "password" id = "auth" placeholder = "Auth" />

		<div id = "output">
			<div id = "opclose">X</div>
			<textarea id = "op"></textarea>    
		</div>
    </body>
</html>

