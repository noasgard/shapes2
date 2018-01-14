var renderer = PIXI.autoDetectRenderer(600, 400, { backgroundColor: 0x000000, antialias: true });
document.body.appendChild(renderer.view);

// Create the main stage for your display objects
var stage = new PIXI.Container();

animate();
function animate() {
    //Render the stage
    renderer.render(stage);
    requestAnimationFrame(animate);
}

//speed variable
var speed = 1;

// contor shapes

var totalShapes = 0
//ticker on stage

var squaresOnStage = []

const ticker = new PIXI.ticker.Ticker();
ticker.stop();


console.log(stage.width,stage.height)

//clasa de shape-uri cu parametri pozitieX, pozitieY,parinte
class createShape extends PIXI.Graphics
{
    positionX:number;
    positionY:number;
    parrent;

    constructor(posX:number, posY:number, parrent)
    {
        super();
        this.positionX = posX;
        this.positionY = posY;
        this.parrent = parrent; 
    }

    createCircle()
    {
        let circle = new PIXI.Graphics();

        circle.beginFill(0x2c3e50); 
        circle.drawCircle(30, 30, 30); // 
        circle.endFill();

        this.parrent.addChildAt(circle,1);
        circle.x = this.positionX;
        circle.y = this.positionY;

        console.log("CIRCLE")

        return circle;
    }

    createTriangle()
    {
        let triangle = new PIXI.Graphics();

        triangle.beginFill(0xffb3b3);
        triangle.drawPolygon([0, 0, 
                                  0, 60, 
                                  60, 0
                                ]);
        triangle.endFill();

        this.parrent.addChildAt(triangle,1);
        triangle.x = this.positionX;
        triangle.y = this.positionY;

        console.log("TRIANGLE")

        return triangle;
    }
}

class createInteractiveShape extends createShape
{
    positionX:number;
    positionY:number;
    parrent;
    outputFunction;

    constructor(posX, posY, parrent, outFunction)
    {
        super(posX,posY,parent);
        this.positionX = posX;
        this.positionY = posY;
        this.parrent = parrent;
        this.outputFunction = outFunction;
    }

    createFakeScene()
    {
        let square = new PIXI.Graphics();

        square.beginFill(0x99ffcc); 
        square.drawRect(0, 0, 600, 400); // drawRect(x, y, width, height)
        square.endFill();

        this.parrent.addChildAt(square,0);
        square.x = this.positionX;
        square.y = this.positionY;

        square.interactive = true;
        square.buttonMode = true;

        square.on("click",this.outputFunction)

        return square;
    }

    createSquare()
    {
        let square = new PIXI.Graphics();

        square.beginFill(0x9b59b6); // Purple
        square.drawRect(0, 0, 60, 60); // drawRect(x, y, width, height)
        square.endFill();

        this.parrent.addChildAt(square,1);
        square.x = this.positionX;
        square.y = this.positionY;

        square.interactive = true;
        square.buttonMode = true;

        square.on("click",this.outputFunction)

        console.log("SQUARE")

        return square;
    }


    top_speed()
    {
        let top_speed = new PIXI.Graphics; 

        top_speed.beginFill(0x0000ff);
        top_speed.drawPolygon([0, 60, 30, 0, 60, 60]);
        top_speed.endFill();

        this.parrent.addChildAt(top_speed,1);
       

        top_speed.interactive = true;
        top_speed.buttonMode = true;
        top_speed.on('click', this.outputFunction)
        console.log("top_speed")

        top_speed.interactive=true;
        top_speed.buttonMode=true;

        top_speed.x = this.positionX;
        top_speed.y = this.positionX;

        return(top_speed)
    }

    down_speed()
    {
        let down_speed = new PIXI.Graphics; 
        down_speed.beginFill(0x0000ff);
        down_speed.drawPolygon([0, 0, 30, 60, 60, 0]);
            
        down_speed.endFill();
        this.parrent.addChildAt(down_speed,1);

        down_speed.interactive = true;
        down_speed.buttonMode = true;

        down_speed.on('pointerdown', this.outputFunction)
        console.log("down_speed")

        down_speed.x = this.positionX;
        down_speed.y = this.positionY;

        return(down_speed)
    }
}


function clickStage()
{
    totalShapes++;
    document.getElementById("total_shapes").textContent="Numar total de shape-uri: " + totalShapes;
    var localShape;

     console.log("click scena")

     let radomShape = Math.floor(Math.random() * 3) + 1
     var posizitieX = Math.floor(Math.random() * 540) + 1 // de la stage.width - shape.width
     console.log(posizitieX)
     
     if (radomShape === 1)
     {
        var square =  new createInteractiveShape (posizitieX,-60,stage,clickSquares);
        localShape = square.createSquare()

        squaresOnStage.push(localShape)
     }

     else if (radomShape === 2)
     {
        var circle =  new createInteractiveShape (posizitieX,-60,stage,undefined);
        localShape = circle.createCircle()
     }

    else if (radomShape === 3)
     {
        var triangle =  new createInteractiveShape (posizitieX,-60,stage,undefined);
        localShape = triangle.createTriangle()
     }

     ticker.add(function () {

        if (localShape.y > 400)
        {
           stage.removeChild(localShape)
        }
        else
        {
            localShape.y = localShape.y +speed;
        }
    });
      ticker.start();

}

function clickSquares()
{
    for(let i in squaresOnStage) { 
        squaresOnStage[i].beginFill(0x000000); // Purple
        squaresOnStage[i].drawRect(0, 0, 60, 60); // drawRect(x, y, width, height)
        squaresOnStage[i].endFill();
  }

  console.log("clickuit pe patrat")
}

function topSpeed()
{
    speed = speed *2

    basicText.setText(speed + " x")
}

function downSpeed()
{
    speed = speed / 2
    if(speed < 1)
        {
            speed = 1
        }        
    basicText.setText(speed + " x")    
}

// text de viteza


var style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#00ff99'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440, 
    align : "center"
});


var basicText = new PIXI.Text('0 x',style);
basicText.x = 15;
basicText.y = 350;

stage.addChild(basicText);
// 

// 

console.log("hello world")

var square = new createInteractiveShape(0, 0, stage, clickStage)
square.createFakeScene()

var buttonUp = new createInteractiveShape(20,120, stage,topSpeed)
buttonUp.top_speed()
var buttonDown = new createInteractiveShape(20,250, stage,downSpeed)
buttonDown.down_speed()

// 