function PlayingArea()
{

    this.element = $("#playing-area");
    this.element.width(countBricksLine*widthBricks);
    this.element.height(countBricksLines*heightBricks +200);
    this.offset = this.element.offset();
    this.width = this.element.width();
    this.height = this.element.height();
    
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
})
