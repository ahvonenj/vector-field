var game;
//var _WIDTH = window.innerWidth;
//var _HEIGHT = window.innerHeight;

var _WIDTH = 800;
var _HEIGHT = 800;


$(document).ready(function()
{
	console.log('%c Initialized! ', 'background: #222; color: #bada55');

	game = new Phaser.Game(_WIDTH, _HEIGHT, Phaser.AUTO, '', 
	{ 
		preload: preload, 
		create: create, 
		update: update 
	});
});

function preload() 
{
	game.load.image('ground', 'resource/img/ground.png');
	game.load.image('red', 'resource/img/bunny.png');
	game.load.image('white', 'resource/img/white.png');
}

var boxes = [];
var platforms = [];

// 0 = no impulse
// 1 = up
// 2 = right
// 3 = down
// 4 = left

var gridcellsize;

function create() 
{
	game.stage.backgroundColor = '#2c3e50';

	game.physics.startSystem(Phaser.Physics.BOX2D);
	game.physics.box2d.setBoundsToWorld();

	gridcellsize = 
	{
		x: game.world.width / 24,
		y: game.world.height / 24
	};

	//game.physics.box2d.gravity.y = 8000;

	for(var i = 0; i < 400; i++)
	{
		var box = game.add.sprite(chance.integer({min: 15, max: game.world.width - 15}), chance.integer({min: 15, max: game.world.height - 15}), 'red');
		box.scale.set(0.8, 0.8);
		game.physics.box2d.enable(box);
		box.body.mass = 0.16000000000000003;
		box.body.velocity.y = chance.integer({min: -1000, max: 1000});
		box.body.velocity.x = chance.integer({min: -1000, max: 1000});
		box.body.setCollisionCategory(1);
		
		//box.body.data.CreateFixture(fixturedef);

		var fixt = box.body.data.m_fixtureList;
		fixt.m_filter.groupIndex = -1;

		box.body.setCircle(15);

		boxes.push(box);
	}

	


}

// 0 = no impulse
// 1 = up
// 2 = right
// 3 = down
// 4 = left

var fd = 60;
var drag = 0.8;
var vmax = 750;

function update() 
{
	for(var i = 0; i < boxes.length; i++)
	{
		if(!grid)
			break;

		var posInGrid = 
		{
			x: Math.round(boxes[i].body.x / gridcellsize.x),
			y: Math.round(boxes[i].body.y / gridcellsize.y)
		};

		var imp = grid[posInGrid.y][posInGrid.x];

		if(typeof fgrid !== 'undefined')
		{
			var f = fgrid[posInGrid.y][posInGrid.x];
		}
		else
		{
			var f = fd
		}


		
		//console.log(posInGrid.y, imp);
		
		if(imp !== 'q')
		{
			boxes[i].body.velocity.x = boxes[i].body.velocity.x * drag;
			boxes[i].body.velocity.y = boxes[i].body.velocity.y * drag;
			//boxes[i].body.angularVelocity = chance.floating({min: -5, max: 5, fixed: 6}); 
			//grid[posInGrid.y][posInGrid.x] = chance.floating({min: 0, max: (Math.PI * 2)});
			//fgrid[posInGrid.y][posInGrid.x] = chance.integer({min: -150, max: 150});
		}

		switch(imp)
		{
			case 'q':
				break;
			case 1:
				boxes[i].body.applyForce(0, -f);
				break;
			case 2:
				boxes[i].body.applyForce(f, 0);
				break;
			case 3:
				boxes[i].body.applyForce(0, f);
				break;
			case 4:
				boxes[i].body.applyForce(-f, 0);
				break;
			default:
				boxes[i].body.applyForce(Math.cos(imp) * f, Math.sin(imp) * f);
				break;
		}

		if(boxes[i].body.velocity.x > vmax)
			boxes[i].body.velocity.x = vmax;

		if(boxes[i].body.velocity.y > vmax)
			boxes[i].body.velocity.y = vmax;



		//console.log(imp);
	}

	//console.log(boxes[0].body.x);
}

function pointRectangleIntersection(p, r) 
{
    return p.x > r.x1 && p.x < r.x2 && p.y > r.y1 && p.y < r.y2;
}