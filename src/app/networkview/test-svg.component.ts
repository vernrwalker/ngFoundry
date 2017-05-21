import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';

@Component({
  selector: 'foundry-test-svg',
  templateUrl: './test-svg.component.html',
  styleUrls: ['./test-svg.component.css']
})
export class TestSvgComponent implements OnInit {
  SVGDocument = null;
  SVGRoot: SVGSVGElement = null;

  TrueCoords = null;
  GrabPoint = null;
  BackDrop = null;
  DragTarget = null;

  constructor(private vcr: ViewContainerRef) { }

  ngOnInit() {
    let root = this.vcr.element.nativeElement

    this.SVGDocument = root;
    this.SVGRoot = root.firstChild;

    // these svg points hold x and y values...
    //    very handy, but they do not display on the screen (just so you know)
    this.TrueCoords = this.SVGRoot.createSVGPoint();
    this.GrabPoint = this.SVGRoot.createSVGPoint();

    // this will serve as the canvas over which items are dragged.
    //    having the drag events occur on the mousemove over a backdrop
    //    (instead of the dragged element) prevents the dragged element
    //    from being inadvertantly dropped when the mouse is moved rapidly
    this.BackDrop = this.SVGRoot.getElementById('BackDrop');
  }

  addCircle(evt) {
    var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle'); //Create a path in SVG's namespace
    newElement.setAttribute("cx", '50'); 
     newElement.setAttribute("cy", '50');
    newElement.setAttribute("r", '50'); 
     newElement.setAttribute("style", 'fill:green; ');
    this.SVGRoot.appendChild(newElement);
  }

  Grab(evt) {
    // find out which element we moused down on
    var targetElement = evt.target;

    // you cannot drag the background itself, so ignore any attempts to mouse down on it
    if (this.BackDrop != targetElement) {
      //set the item moused down on as the element to be dragged
      this.DragTarget = targetElement;

      // move this element to the "top" of the display, so it is (almost)
      //    always over other elements (exception: in this case, elements that are
      //    "in the folder" (children of the folder group) with only maintain
      //    hierarchy within that group
      this.DragTarget.parentNode.appendChild(this.DragTarget);

      // turn off all pointer events to the dragged element, this does 2 things:
      //    1) allows us to drag text elements without selecting the text
      //    2) allows us to find out where the dragged element is dropped (see Drop)
      this.DragTarget.setAttributeNS(null, 'pointer-events', 'none');

      // we need to find the current position and translation of the grabbed element,
      //    so that we only apply the differential between the current location
      //    and the new location
      var transMatrix = this.DragTarget.getCTM();
      this.GrabPoint.x = this.TrueCoords.x - Number(transMatrix.e);
      this.GrabPoint.y = this.TrueCoords.y - Number(transMatrix.f);

    }
  };

  Drag(evt) {
    // account for zooming and panning
    this.GetTrueCoords(evt);

    // if we don't currently have an element in tow, don't do anything
    if (this.DragTarget) {
      // account for the offset between the element's origin and the
      //    exact place we grabbed it... this way, the drag will look more natural
      var newX = this.TrueCoords.x - this.GrabPoint.x;
      var newY = this.TrueCoords.y - this.GrabPoint.y;

      // apply a new tranform translation to the dragged element, to display
      //    it in its new location
      this.DragTarget.setAttributeNS(null, 'transform', 'translate(' + newX + ',' + newY + ')');
    }
  };

  Drop(evt) {
    // if we aren't currently dragging an element, don't do anything
    if (this.DragTarget) {
      // since the element currently being dragged has its pointer-events turned off,
      //    we are afforded the opportunity to find out the element it's being dropped on
      var targetElement = evt.target;

      // turn the pointer-events back on, so we can grab this item later
      this.DragTarget.setAttributeNS(null, 'pointer-events', 'all');
      if ('Folder' == targetElement.parentNode.id) {
        // if the dragged element is dropped on an element that is a child
        //    of the folder group, it is inserted as a child of that group
        targetElement.parentNode.appendChild(this.DragTarget);
        console.log(this.DragTarget.id + ' has been dropped into a folder, and has been inserted as a child of the containing group.');
      }
      else {
        // for this example, you cannot drag an item out of the folder once it's in there;
        //    however, you could just as easily do so here
        console.log(this.DragTarget.id + ' has been dropped on top of ' + targetElement.id);
      }

      // set the global variable to null, so nothing will be dragged until we
      //    grab the next element
      this.DragTarget = null;
    }
  };

  GetTrueCoords(evt) {
    // find the current zoom level and pan setting, and adjust the reported
    //    mouse position accordingly
    var newScale = this.SVGRoot.currentScale;
    var translation = this.SVGRoot.currentTranslate;
    this.TrueCoords.x = (evt.clientX - translation.x) / newScale;
    this.TrueCoords.y = (evt.clientY - translation.y) / newScale;
  };

}
