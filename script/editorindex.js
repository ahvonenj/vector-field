var _gridS = 25;
var append = '';

var mouseDown = false;
var mouseX = null;
var mouseY = null;
var lastX = -999;
var lastY = -999;
var lastlastX = -999;
var lastlastY = -999;

var mode = 'up';

var taggedCells = [];

var marks =
{
    nop:
    {
    	icon: '&nbsp;',
        data: '\'q\''
    },
    up:
    {
    	icon: '▲',
        data: 1
    },
    right:
    {
    	icon: '►',
        data: 2
    },
    down:
    {
    	icon: '▼',
        data: 3
    },
    left:
    {
    	icon: '◄',
        data: 4
    }
};

var _uploadurl = 'https://jonah.fi/vectorfield/page/updategrid.php';

$(document).ready(function()
{
	// Build the initial grid
	for(var i = 0; i < _gridS; i++)
	{
		var row = '<tr>';
	    
	    for(var j = 0; j < _gridS; j++)
	    {
	    	row += '<td data-mark = "\'q\'" ' + 
	        'data-x = "' + j + 
	        '" data-y = "' + i + 
	        '" data-cid = "c-' + j + '-' + i +
	        '" data-force = "0">&nbsp;</td>';
	    }
	    
	    row += '</tr>\n';
	    append += row;
	}

	$('#grid').append(append);
});

$(document).on('mouseup', function(e)
{
    e.preventDefault();
	mouseDown = false;
    taggedCells.length = 0;
});

$(document).on('mousedown', '#grid', function(e)
{
   	e.preventDefault();
	mouseDown = true;
});

$(document).on('mousemove', function(e)
{
    lastlastX = lastX;
    lastlastY = lastY;
    lastX = mouseX;
    lastY = mouseY;
	mouseX = e.pageX;
    mouseY = e.pageY;  
    
    var angle = Math.atan2(lastY - lastlastY, lastX - lastlastX);
    
    if(mouseDown)
    {
        var $element = $(document.elementFromPoint(mouseX, mouseY));
        
        if($element.is('#grid td'))
        {
            if(mode == 'angl')
            {
                $element.html($('#angl').val());
                $element.data('mark', ($('#angl').val()-90) * (Math.PI/180));
                $element.data('force', $('#force').val());
                return;
            }
            else if(mode == 'magic')
            {
                var cid = $element.data('cid');
                
                if(taggedCells.indexOf(cid) === -1)
                {
                    $element.html(angle * (180/Math.PI));
                    $element.data('mark', angle);
                    $element.data('force', $('#force').val());

                    taggedCells.push(cid);
                }
                
                return;
            }
            
            $element.html(marks[mode].icon);
            $element.data('mark', marks[mode].data);
            $element.data('force', $('#force').val());
        }
    }
});

$(document).on('click', '#grid td', function(e)
{
    e.preventDefault();
	
    var $element = $(document.elementFromPoint(mouseX, mouseY));
    
    if($element.is('#grid td'))
    {
        if(mode == 'angl')
        {
            $element.html($('#angl').val());
            $element.data('mark', ($('#angl').val()-90) * (Math.PI/180));
            $element.data('force', $('#force').val());
            return;
        }
        else if(mode == 'magic')
        {
            return;
        }
        
        $element.html(marks[mode].icon);
        $element.data('mark', marks[mode].data);
        $element.data('force', $('#force').val());
    }
});

$(document).on('click', '.button', function(e)
{
    if(typeof $(this).data('ctrltype') !== 'undefined')
    {
        if($(this).data('ctrltype') == 'mode')
        {
            if(typeof $(this).data('ctrl') !== 'undefined')
            {
                $('.button').each(function() { $(this).removeClass('selected'); });
                $(this).addClass('selected');
                
                mode = $(this).data('ctrl');
            }
        }
        else if($(this).data('ctrltype') == 'print')
        {
            if($('#auth').val().length === 0)
            {
                $('#op').html(outputGrid());
                $('#output').fadeIn();
            }
            else
            {
                $.ajax(
                {
                    url: _uploadurl,
                    type: 'post',
                    method: 'post',

                    data:
                    {
                        grids: outputGrid(),
                        auth: $('#auth').val()
                    },

                    success: function(data, status, xhr)
                    {
                        alert(data);
                    }
                });
            }
        }
        else if($(this).data('ctrltype') == 'clear')
        {
            var sure = confirm('Are you sure you want to clear all?');
            
            if(sure)
            {
                $('#grid td').each(function()
                {
                    $(this).html(marks['nop'].icon);
                    $(this).data('mark', marks['nop'].data);    
                    $(this).data('force', 0);
                });
            }
        }
    }
});

$(document).on('click', '#opclose', function(e)
{
    $('#output').fadeOut();
});

function outputGrid()
{
	var output = 'var grid =\n[\n';
	var foutput = 'var fgrid =\n[\n';
    
    $('#grid tr').each(function()
    {
    	output += '\t[';
        foutput += '\t[';
        
        $(this).find('td').each(function()
        {
            if($(this).is(':last-child'))
            {
                output += $(this).data('mark');
                foutput += $(this).data('force');
            }
            else
            {
            	output += $(this).data('mark') + ', ';
                foutput += $(this).data('force') + ', ';
            }
        });
		
        if($(this).is(':last-child'))
        {
            output += ']\n';
            foutput += ']\n';
        }
        else
        {
            output += '],\n';
            foutput += '],\n';
        }
        
    });
    
    output += '];\n\n';
    foutput += '];';
    
    return output + foutput;
}