import { Component, OnInit } from '@angular/core';

import { iShape } from "./shape";
import { cCircle } from "./circle";
import { cRectangle } from "./rectangle";
import { cAsteroid } from "./asteroid";
import { cTriangle } from "./triangle";
import { cText } from "./text";
import { cClock } from "./clock";

function doAnimate(mySelf) {
  function animate() {
    requestAnimationFrame(animate);
    mySelf.draw(mySelf.context);
  }
  animate();
}


@Component({
  selector: 'foundry-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  shape_array: Array<iShape> = new Array<iShape>();


  constructor() { }

  ngOnInit() {
    this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
    this.context = this.canvas.getContext("2d");

    // Redraw the circle every time the mouse moves
    this.canvas.addEventListener('mousemove',function(e){

    });

    // Clear the canvas when the mouse leaves the canvas region
    this.canvas.addEventListener('mouseout',function(e){

    });

    var shape_array = this.shape_array;
    shape_array.push(new cAsteroid());
    shape_array.push(new cAsteroid());
    shape_array.push(new cAsteroid());
    shape_array.push(new cAsteroid());
    shape_array.push(new cAsteroid());

    shape_array.push(new cTriangle(20, 50, 500, 500));

    shape_array.push(new cCircle(20, 50, 30));
    shape_array.push(new cCircle(120, 70, 50));

    shape_array.push(new cText(20, 50, "Steve"));
    shape_array.push(new cClock(320, 50));

    shape_array.push(new cRectangle(500, 500, 80, 60));

    this.go();
  }

  go() {
    doAnimate(this);
  }

  draw(ctx: CanvasRenderingContext2D) {

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 1280, 720);
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 5;
    ctx.arc(400, 400, 100, 0, 2 * Math.PI);
    ctx.stroke();

    var shape: iShape;
   for (var i: number = 0; i < this.shape_array.length; i++) {
      shape = this.shape_array[i];
      shape.draw(ctx);
   }

  }

}




