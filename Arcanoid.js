function PlayingArea()
{

    this.element = $("#playing-area");
    this.element.width(countBricksLine*widthBricks);
    this.element.height(countBricksLines*heightBricks +200);
    this.offset = this.element.offset();
    this.width = this.element.width();
    this.height = this.element.height();
    
    
    this.initBricks = function() // функция заполнения площадки блоками
    {
        for (var i = 0; i < countBricksLines; i++)
            for (var j = 0; j < countBricksLine; j++)
                this.element.prepend("<div id='brick_"+i+"_"+j+"' class='brick' style='left:"+(j * widthBricks + 1)+"px; top:"
                    +(i * heightBricks + 1)+"; width:"+(widthBricks - 2)+"px; height: "+(heightBricks - 2)+"px'><p>"
                        + (Math.round(Math.random() * (countBricksLines - i)) + (countBricksLines - i)) + "</p></div>");
    }
}


//Параметры кирпичей
const countBricksLine=10;
const countBricksLines=10;
const widthBricks=100;
const heightBricks=30;

var pa; // игровая площадка

$(document).ready(function() 
{
    pa = new PlayingArea();
    pa.initBricks();
})
