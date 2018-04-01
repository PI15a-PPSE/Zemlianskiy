/**
* Игровая площадка
*
* Класс описывает игровую площадку, методы ее изменения, 
* содержимое и характеристики
*
* @author       Zemlianskiy Dmitriy
* @version      1.0
* @copyright    GNU Public License
*/
function PlayingArea() {
    
    /**
    * Элемент html представляющий игровую площадку
    *
    * Используется для изменения внешнего вида и положения элемента на странице
    *
    * @var      object  element
    */
    this.element = $("#playing-area");
    this.element.width(countBricksLine*widthBricks);
    this.element.height(countBricksLines*heightBricks +200);
    /**
    * Положение на игровой площадки на странице
    *
    * Используется для определения положения других элементов
    *
    * @var      object  offset
    */
    this.offset = this.element.offset();
    /**
    * Ширина игровой площадки
    *
    * Используется для определения положения других элементов
    *
    * @var      int     width
    */
    this.width = this.element.width();
    /**
    * Высота игровой площадки
    *
    * Используется для определения положения других элементов
    *
    * @var      int     height
    */
    this.height = this.element.height();
    
    /**
    * Количество набраных игроком очков
    *
    * Хранит количесто очков набраных игроком в игре
    *
    * @var      int     score
    */
    this.score=0;
    
    /**
    * Объект класса Platform
    *
    * Используется для обеспечения отбивания шара игроком
    *
    * @var      Platfrom    platfrom
    */
    this.platform = new Platform(this);
    
    /**
    * Объект класса Ball
    *
    * Используется для уничтожения кирпичей, тем самым увеличивая количество очков
    *
    * @var      Ball   ball
    */
    this.ball = new Ball(this);
    
    /**
    * Создание кирпичей { }
    *
    * Заполняет игровую площадку кирпичами с шириной и высотой указаными в константах widthBricks и heightBricks
    * в количестве кирпичей в ряду и количество рядов указаными в константах countBricksLine и countBricksLines
    * 
    * @param    null    Не требует параметров
    * @return   void    Не возвращает значений
    */   
    this.initBricks = function() {
        for (var i = 0; i < countBricksLines; i++) {
            for (var j = 0; j < countBricksLine; j++) {
                this.element.prepend("<div id='brick_"+i+"_"+j+"' class='brick' style='left:"+(j * widthBricks + 1)+"px; top:"
                    +(i * heightBricks + 1)+"; width:"+(widthBricks - 2)+"px; height: "+(heightBricks - 2)+"px'><p>"
                        + (Math.round(Math.random() * (countBricksLines - i)) + (countBricksLines - i)) + "</p></div>");
            }
        }
    }
    
    /**
    * Обновляет количество заработаных очков { }
    *
    * Обновляет количество очков заработаных игроком за текущую игру в окне
    * 
    * @param    void    Не требует параметров
    * @return   void    Не возвращает значений
    */   
    this.showInfo = function() {
        $('#info').html("Очки: " + this.score);
    }
    
    /**
    * Обновление игровой площадки { }
    *
    * Очищает игровую площадку от кирпичей оставшихся от прошлой игры,
    * заново заполняет площадку кирпичами и обнуляет полученые очки
    * 
    * @param    void    Не требует параметров
    * @return   void    Не возвращает значений
    */
    this.refreshArea = function() {
        $('.brick').remove();
        this.initBricks();
        this.score=0;
        this.showInfo();
    } 
}

/**
* Платформа
*
* Класс описывает платформу для отбивания шара, ее свойства и функции
*
* @author       Zemlianskiy Dmitriy
* @version      1.0
* @copyright    GNU Public License
*/
function Platform(pa) {
    /**
    * Указатель на объект класса PlayingArea
    *
    * Используется для ограничения движения платформы в пределах игровой площадки
    *
    * @var      PlayingArea    pa
    */
    this.pa = pa;
    
    /**
    * Элемент html представляющий плаформу
    *
    * Используется для изменения положения элемента на странице и отслеживания скорости перемещения
    *
    * @var      object  element
    */
    this.element = $("#platform"); 
    
    /**
    * Ширина платформы
    *
    * Используется для ограничения движения платформы в пределах 
    * игровой площадки и отслеживания отбивания мяча
    *
    * @var      object  element
    */
    this.width = this.element.width();
    
    /**
    * Идентификатор таймера
    *
    * Используется для остановки таймера SetInterval
    *
    * @var      object  interval
    */
    this.interval = 0;
    
    /**
    * Скорость движения платформы
    *
    * Используется для изменения горизонтальной скорости шара
    *
    * @var      int     dx
    */
    this.dx = 0;
    
    /**
    * Последнее положение платформы
    *
    * Используется для измерения текущей скорости платформы
    *
    * @var      int     dx
    */
    this.lastX = this.element.offset().left;
    
    /**
    * Перемещение платформы { }
    *
    * Перемещает платформу вслед за укзазателем мыши в пределах игровой площадки
    * Если шар находится в состоянии покоя (скорость по вертикали равна нулю) перемещает шар вместе с площадкой
    * 
    * @param    int     x   Координата текущего горизонтального положения мыши
    * @return   void    Не возвращает значений
    */
    this.move = function(x) { 
        var mleft = x - this.width / 2; 
        var leftMin = this.pa.offset.left;   
        var leftMax = this.pa.offset.left + this.pa.width - this.width;   

        if (mleft < leftMin){
            mleft = leftMin;
        }

        if (mleft > leftMax){
            mleft = leftMax;
        }
        this.element.offset({left:mleft});
        if (this.pa.ball.dy==0){
            this.pa.ball.element.offset({left:mleft+this.width/2 - this.pa.ball.width/2});
        }
    }
    
    /**
    * Оценка скорости { }
    *
    * Оценивает скорость плаформы путем вычитания прошлого положения площадки из текущего
    * запоминает текщее положение. Если прошлое положение меньше либо равно нулю функция 
    * только запоминает текущее положение
    * 
    * @param    null    Не требует параметров
    * @return   void    Не возвращает значений
    */
    this.evaluateDx = function(){
        if (this.lastX > 0){
            this.dx =this.element.offset().left - this.lastX;
        }
        this.lastX =this.element.offset().left;
    }
    
}

/**
* Шар
*
* Класс описывает мяч его свойства и функции
*
* @author       Zemlianskiy Dmitriy
* @version      1.0
* @copyright    GNU Public License
*/
function Ball(pa) {
    /**
    * Указатель на объект класса PlayingArea
    *
    * Используется для ограничения движения платформы в пределах игровой площадки
    *
    * @var      PlayingArea    pa
    */
    this.pa = pa;
    
    /**
    * Элемент html представляющий шар
    *
    * Используется для изменения положения элемента на странице, и отслеживания столкновения с другими объекстами
    *
    * @var      object  element
    */
    this.element = $("#ball");
    
    /**
    * Ширина шара
    *
    * Используется для отслеживания столкновениями с другими объектами
    *
    * @var      int     width
    */
    this.width = this.element.width();
    /**
    * Высота шара
    *
    * Используется для отслеживания столкновениями с другими объектами
    *
    * @var      int     height
    */
    this.height = this.element.height();
    
    /**
    * Горизонтальная скорость шара
    *
    * Используется для перемещения шара
    *
    * @var      int     dx
    */
    this.dx = 0;
    
    /**
    * Вертикальная скорость шара
    *
    * Используется для перемещения шара
    *
    * @var      int     dy
    */
    this.dy = 0;
    
     /**
    * Идентификатор таймера
    *
    * Используется для остановки таймера SetInterval
    *
    * @var      object  interval
    */
    this.interval = 0;
    
    /**
    * Установка шара в начальное положение { }
    *
    * Устанавливает шар по центру платформы
    * 
    * @param    null    Не требует параметров
    * @return   void    Не возвращает значений
    */
    this.setDef = function(){
        this.element.offset({top:this.pa.platform.element.offset().top - this.height, 
        left:this.pa.platform.element.offset().left + this.pa.platform.width / 2 - this.width / 2});
    }
    
     
    /**
    * Старт шара { }
    *
    * Устанавливает вертикальную скорость мяча в значение -3, и случайную скорость по горизонтали
    * 
    * @param    null    Не требует параметров
    * @return   void    Не возвращает значений
    */   
    this.start = function() {
        this.dx = 1 - Math.round(Math.random() * 3);
        this.dy = -3;
        
    }
    
    
    /**
    * Движение шара { }
    *
    * Перемещает мяч по игровой площадке и обеспечивает отивание от границ игровой плщадки, кирпичей и 
    * платформы, а также в случае падения мяча запускает функцию вывода результатов игры и обновления формы
    * Если мяч отбивается от платформы в состоянии движения меняет горизонтальную скорость мяча
    * Если мяч отбивается от кирпича, удаляет кирпич и начисляет очки за них
    * 
    * @param    null    Не требует параметров
    * @return   void    Не возвращает значений
    */
    this.move = function() {
        var ballOffset= this.element.offset();
        // отбивание шарика от боковых стенок площадки        
        if(this.element.offset().left+this.dx < this.pa.element.offset().left || 
            this.element.offset().left+this.dx > this.pa.element.offset().left + this.pa.width - 20) {
            this.dx = -this.dx;
        }
        // отбивание шарика от верхней стени площадки
        if(this.element.offset().top + this.dy < this.pa.element.offset().top){
            this.dy = -this.dy;
        }
        // отбивание шарика от платформы
        if(this.element.offset().top + this.dy > this.pa.platform.element.offset().top - 20 &&
            this.element.offset().left+this.dx > this.pa.platform.element.offset().left && 
                this.element.offset().left+this.dx < this.pa.platform.element.offset().left + this.pa.platform.width){
            this.dy = -this.dy;
            this.dx = this.dx + Math.round(this.pa.platform.dx / 3);
            if (Math.abs(this.dx) > maxBallDx) {
                console.log(this.dx);
                if(this.dx < 0) {
                    this.dx = -maxBallDx;
                }
                else {
                    this.dx = maxBallDx;
                }
                console.log(this.dx);
            }                
        }
        
        // падение шарика
        if(this.element.offset().top + this.dy > this.pa.platform.element.offset().top - 20 &&
            (this.element.offset().left+this.dx < this.pa.platform.element.offset().left || 
            this.element.offset().left+this.dx > this.pa.platform.element.offset().left + this.pa.platform.width)){
                this.reset();
                return;
        }      

        // отбивание от кирпича
        var ballNextX = this.element.offset().left + this.dx;
        var ballNextY = this.element.offset().top +this.dy;
        
        var brickIndexX = Math.floor((ballNextX - this.pa.offset.left)/widthBricks);
        var brickIndexY = Math.floor((ballNextY - this.pa.offset.top)/heightBricks);
        
        var brick = document.getElementById("brick_" + brickIndexY + "_" + brickIndexX);
        if (brick != null) {
            var rect = brick.getBoundingClientRect();
            if (this.element.offset().left > rect.left - this.width &&
                this.element.offset().left < rect.left + rect.width) {
                    this.dy = -this.dy;
            }
            else {
                this.dx = -this.dx;
            }
            $("#"+brick.id).hide(100, function(){$("#"+this.id).remove()});
            var brickText;
            if ( brick.innerText) {
                brickText = brick.innerText;
            }
            else {
                brickText = brick.textContent;
            }
            var brickScore = parseInt(brickText);
            this.pa.score = this.pa.score + brickScore;
            this.pa.showInfo();
        }
        
        this.element.offset({top:ballOffset.top+this.dy,left:ballOffset.left+this.dx});
    }
    
    /**
    * Окночание игры { }
    *
    * Останавливает мяч, ставит его на на центр платформы, обновляет игровую площадку
    * и выводит результаты игры
    * 
    * @param    null    Не требует параметров
    * @return   void    Не возвращает значений
    */
    this.reset = function()
    {
        this.dx = 0;
        this.dy = 0;
        this.setDef();
        if (this.interval){
            clearInterval(this.interval);
        }
        alert("Игра окончена. Ваши очки: " + this.pa.score);
        this.pa.refreshArea();
    }
}

/**
* Количество кирпичей в одном ряду
*
* Используется для заполнения игровой площадки кирпичами
*
* @var      int     countBricksLine
*/
const countBricksLine=10;

/**
* Количество рядов кирпичей
*
* Используется для заполнения игровой площадки кирпичами
*
* @var      int     countBricksLines
*/
const countBricksLines=10;

/**
* Ширина одного кирпича
*
* Используется для заполнения игровой площадки кирпичами и отбивания шара от кирпичей
*
* @var      int     widthBricks
*/
const widthBricks=100;

/**
* Высота одного кирпича
*
* Используется для заполнения игровой площадки кирпичами и отбивания шара от кирпичей
*
* @var      int     heightBricks
*/
const heightBricks=30;

/**
* Максимальная горизонтальная скорость мяча
*
* Используется для ограничения скорости мяча при отбивании от платформы
*
* @var      int     maxBallDx
*/
const maxBallDx = 2;

/**
* Объект класса PlayingArea
*
* Используется для инициализации и хранения объекта класса PlayingArea
*
* @var      PlayingArea    pa
*/
var pa;

/**
* Инициализация игровой площадки и всех элементов на ней
* установка шара на платформу, привязка старта мяча к клику мыши
* старт таймера для отслеживания скорости платформы
* привязка движения платформы к движениям мыши
*/
$(document).ready(function() {
    pa = new PlayingArea();
    pa.refreshArea();
    pa.ball.setDef();
    pa.showInfo();
    pa.platform.interval = window.setInterval(function() {pa.platform.evaluateDx()}, 5);

    $(document).mousemove(function(event) {      
        event = event || window.event;
        pa.platform.move(event.pageX || event.x);
    })
    
    $(document).mousedown(function(event){    
        if (pa.ball.dy!=0)
            return;
        pa.ball.start();
        pa.ball.interval = window.setInterval(function() {pa.ball.move()}, 5); 
    })
    
})
