class Particle {
  constructor() {

    window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

    this.mouse = {
      x: 0,
      y: 0,
      px: 0,
      py: 0,
      down: true // TODO: find a solution for mousedown: true on desktop, mousedown: false on mobile
    };

    this.canvas_width = Math.round(window.innerWidth / 10) * 10; //Rounding to nearest 10. Needs to be a multiple of the resolution value below.
    this.canvas_height = Math.round(window.innerHeight / 10) * 10; //This too.

    this.resolution = 10; //Width and height of each cell in the grid.

    this.pen_size = 40; //Radius around the mouse cursor coordinates to reach when stirring

    this.num_cols = this.canvas_width / this.resolution; //This value is the number of columns in the grid.
    this.num_rows = this.canvas_height / this.resolution; //This is number of rows.
    this.speck_count = this.canvas_width; //This determines how many particles will be made.

    this.vec_cells = []; //The array that will contain the grid cells
    this.particles = []; //The array that will contain the particles

    $(document).ready(this.onReady.bind(this));

  }

  onReady() {
    console.log(document)
    this.init();
  }

  init() {
    //These lines get the canvas DOM element and canvas context, respectively.
    this.canvas = document.getElementById("fluid");
    this.ctx = this.canvas.getContext("2d");

    //These two set the width and height of the canvas to the defined values.
    if (window.devicePixelRatio > 1) {
      // Retina screen
      this.canvas.width = this.canvas_width * 2;
      this.canvas.height = this.canvas_height * 2;

      this.canvas.style.width = this.canvas_width + 'px';
      this.canvas.style.height = this.canvas_height + 'px';

      this.canvas.getContext('2d').scale(2,2);
    } else {
      // Not Retina screen
      this.canvas.width = this.canvas_width;
      this.canvas.height = this.canvas_height;
    }


    /*
    This loop begins at zero and counts up to the defined number of particles,
    less one, because array elements are numbered beginning at zero.
    */
    for (var i = 0; i < this.speck_count; i++) {
      /*
      This calls the function particle() with random X and Y values. It then
      takes the returned object and pushes it into the particles array at the
      end.
      */
      this.particles.push(
        new this.particle(Math.random() * this.canvas_width, Math.random() * this.canvas_height)
      );
    }

    //This loops through the count of columns.
    for (var col = 0; col < this.num_cols; col++) {

      //This defines the array element as another array.
      this.vec_cells[col] = [];

      //This loops through the count of rows.
      for (var row = 0; row < this.num_rows; row++) {

        /*
        This line calls the cell() function, which creates an individual grid cell
        and returns it as an object. The X and Y values are multiplied by the
        resolution so that when the loops are referring to "column 2, row 2", the
        width and height of "column 1, row 1" are counted in so that the top-left
        corner of the new grid cell is at the bottom right of the other cell.
        */
        var cell_data = new this.cell(col * this.resolution, row * this.resolution, this.resolution)

        //This pushes the cell object into the grid array.
        this.vec_cells[col][row] = cell_data;

        /*
        These two lines set the object's column and row values so the object knows
        where in the grid it is positioned.
        */
        this.vec_cells[col][row].col = col;
        this.vec_cells[col][row].row = row;

      }
    }


    /*
    These loops move through the rows and columns of the grid array again and set variables
    in each cell object that will hold the directional references to neighboring cells.
    For example, let's say the loop is currently on this cell:

    OOOOO
    OOOXO
    OOOOO

    These variables will hold the references to neighboring cells so you only need to
    use "up" to refer to the cell above the one you're currently on.
    */
    for (var col = 0; col < this.num_cols; col++) {

      for (var row = 0; row < this.num_rows; row++) {

        /*
        This variable holds the reference to the current cell in the grid. When you
        refer to an element in an array, it doesn't copy that value into the new
        variable; the variable stores a "link" or reference to that spot in the array.
        If the value in the array is changed, the value of this variable would change
        also, and vice-versa.
        */
        var cell_data = this.vec_cells[col][row];

        /*
        Each of these lines has a ternary expression. A ternary expression is similar
        to an if/then clause and is represented as an expression (e.g. row - 1 >= 0)
        which is evaluated to either true or false. If it's true, the first value after
        the question mark is used, and if it's false, the second value is used instead.

        If you're on the first row and you move to the row above, this wraps the row
        around to the last row. This is done so that momentum that is pushed to the edge
        of the canvas is "wrapped" to the opposite side.
        */
        var row_up = (row - 1 >= 0) ? row - 1 : this.num_rows - 1;
        var col_left = (col - 1 >= 0) ? col - 1 : this.num_cols - 1;
        var col_right = (col + 1 < this.num_cols) ? col + 1 : 0;

        //Get the reference to the cell on the row above.
        var up = this.vec_cells[col][row_up];
        var left = this.vec_cells[col_left][row];
        var up_left = this.vec_cells[col_left][row_up];
        var up_right = this.vec_cells[col_right][row_up];

        /*
        Set the current cell's "up", "left", "up_left" and "up_right" attributes to the
        respective neighboring cells.
        */
        cell_data.up = up;
        cell_data.left = left;
        cell_data.up_left = up_left;
        cell_data.up_right = up_right;

        /*
        Set the neighboring cell's opposite attributes to point to the current cell.
        */
        up.down = this.vec_cells[col][row];
        left.right = this.vec_cells[col][row];
        up_left.down_right = this.vec_cells[col][row];
        up_right.down_left = this.vec_cells[col][row];

      }
    }


    /*
    These lines create triggers that fire when certain events happen. For
    instance, when you move your mouse, the mouse_move_handler() function
    will run and will be passed the event object reference into it's "e"
    variable. Something to note, the mousemove event doesn't necessarily
    fire for *every* mouse coordinate position; the mouse movement is
    sampled at a certain rate, meaning that it's checked periodically, and
    if the mouse has moved, the event is fired and the current coordinates
    are sent. That's why you'll see large jumps from one pair of coordinates
    to the next if you move your mouse very fast across the screen. That's
    also how I measure the mouse's velocity.
    */
    window.addEventListener("mousedown", this.mouse_down_handler.bind(this));
    window.addEventListener("touchstart", this.mouse_down_handler);

    window.addEventListener("mouseup", this.mouse_up_handler.bind(this));
    window.addEventListener("touchend", this.touch_end_handler.bind(this));

    window.addEventListener("mousemove", this.mouse_move_handler.bind(this));
    window.addEventListener("touchmove", this.touch_move_handler.bind(this));

    console.log('draw');
    //When the page is finished loading, run the draw() function.
    this.draw();

  }

  /*
  This function updates the position of the particles according to the velocity
  of the cells underneath, and also draws them to the canvas.
  */
  update_particle() {

    //Loops through all of the particles in the array
    for (var i = 0; i < this.particles.length; i++) {

      //Sets this variable to the current particle so we can refer to the particle easier.
      var p = this.particles[i];

      //If the particle's X and Y coordinates are within the bounds of the canvas...
      if (p.x >= 0 && p.x < this.canvas_width && p.y >= 0 && p.y < this.canvas_height) {

        /*
        These lines divide the X and Y values by the size of each cell. This number is
        then parsed to a whole number to determine which grid cell the particle is above.
        */
        var col = parseInt(p.x / this.resolution);
        var row = parseInt(p.y / this.resolution);

        //Same as above, store reference to cell
        var cell_data = this.vec_cells[col][row];

        /*
        These values are percentages. They represent the percentage of the distance across
        the cell (for each axis) that the particle is positioned. To give an example, if
        the particle is directly in the center of the cell, these values would both be "0.5"

        The modulus operator (%) is used to get the remainder from dividing the particle's
        coordinates by the resolution value. This number can only be smaller than the
        resolution, so we divide it by the resolution to get the percentage.
        */
        var ax = (p.x % this.resolution) / this.resolution;
        var ay = (p.y % this.resolution) / this.resolution;

        /*
        These lines subtract the decimal from 1 to reverse it (e.g. 100% - 75% = 25%), multiply
        that value by the cell's velocity, and then by 0.05 to greatly reduce the overall change in velocity
        per frame (this slows down the movement). Then they add that value to the particle's velocity
        in each axis. This is done so that the change in velocity is incrementally made as the
        particle reaches the end of it's path across the cell.
        */
        p.xv += (1 - ax) * cell_data.xv * 0.05;
        p.yv += (1 - ay) * cell_data.yv * 0.05;

        /*
        These next four lines are are pretty much the same, except the neighboring cell's
        velocities are being used to affect the particle's movement. If you were to comment
        them out, the particles would begin grouping at the boundary between cells because
        the neighboring cells wouldn't be able to pull the particle into their boundaries.
        */
        p.xv += ax * cell_data.right.xv * 0.05;
        p.yv += ax * cell_data.right.yv * 0.05;

        p.xv += ay * cell_data.down.xv * 0.05;
        p.yv += ay * cell_data.down.yv * 0.05;

        //This adds the calculated velocity to the position coordinates of the particle.
        p.x += p.xv;
        p.y += p.yv;

        //For each axis, this gets the distance between the old position of the particle and it's new position.
        var dx = p.px - p.x;
        var dy = p.py - p.y;

        //Using the Pythagorean theorum (A^2 + B^2 = C^2), this determines the distance the particle travelled.
        var dist = Math.sqrt(dx * dx + dy * dy);

        //This line generates a random value between 0 and 0.5
        var limit = Math.random() * 0.5;

        //If the distance the particle has travelled this frame is greater than the random value...
        if (dist > limit) {
          this.ctx.lineWidth = 1;
          this.ctx.lineCap = this.ctx.lineJoin = 'round'
          this.ctx.beginPath(); //Begin a new path on the canvas
          this.ctx.moveTo(p.x, p.y); //Move the drawing cursor to the starting point
          this.ctx.lineTo(p.px, p.py); //Describe a line from the particle's old coordinates to the new ones
          this.ctx.stroke(); //Draw the path to the canvas
        }else{
          //If the particle hasn't moved further than the random limit...

          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);

          /*
          Describe a line from the particle's current coordinates to those same coordinates
          plus the random value. This is what creates the shimmering effect while the particles
          aren't moving.
          */
          this.ctx.lineTo(p.x + limit, p.y + limit);

          this.ctx.stroke();
        }

        //This updates the previous X and Y coordinates of the particle to the new ones for the next loop.
        p.px = p.x;
        p.py = p.y;
      }
      else {
        //If the particle's X and Y coordinates are outside the bounds of the canvas...

        //Place the particle at a random location on the canvas
        p.x = p.px = Math.random() * this.canvas_width;
        p.y = p.py = Math.random() * this.canvas_height;

        //Set the particles velocity to zero.
        p.xv = 0;
        p.yv = 0;
      }

      //These lines divide the particle's velocity in half everytime it loops, slowing them over time.
      p.xv *= 0.5;
      p.yv *= 0.5;
    }
  }

  /*
  This is the main animation loop. It is run once from the init() function when the page is fully loaded and
  uses RequestAnimationFrame to run itself again and again.
  */
  draw() {
    /*
    This calculates the velocity of the mouse by getting the distance between the last coordinates and the new ones. The coordinates will be further apart depending on how fast the mouse is moving.
    */
    var mouse_xv = this.mouse.x - this.mouse.px;
    var mouse_yv = this.mouse.y - this.mouse.py;

    //Loops through all of the columns
    for (var i = 0; i < this.vec_cells.length; i++) {
      var cell_datas = this.vec_cells[i];

      //Loops through all of the rows
      for (var j = 0; j < cell_datas.length; j++) {

        //References the current cell
        var cell_data = cell_datas[j];

        //If the mouse button is down, updates the cell velocity using the mouse velocity
        if (this.mouse.down) {
          this.change_cell_velocity(cell_data, mouse_xv, mouse_yv, this.pen_size);
        }

        //This updates the pressure values for the cell.
        this.update_pressure(cell_data);
      }
    }

    /*
    This line clears the canvas. It needs to be cleared every time a new frame is drawn so the particles move. Otherwise, the particles would just look like long curvy lines.
    */
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //This sets the color to draw with.
    this.ctx.strokeStyle = "#000000";

    //This calls the function to update the particle positions.
    this.update_particle();

    /*
    This calls the function to update the cell velocity for every cell by looping through all of the rows and columns.
    */
    for (var i = 0; i < this.vec_cells.length; i++) {
      var cell_datas = this.vec_cells[i];

      for (var j = 0; j < cell_datas.length; j++) {
        var cell_data = cell_datas[j];

        this.update_velocity(cell_data);

      }
    }

    // This replaces the previous mouse coordinates values with the current ones for the next frame.
    this.mouse.px = this.mouse.x;
    this.mouse.py = this.mouse.y;

    // This requests the next animation frame which runs the draw() function again.
    requestAnimationFrame(this.draw.bind(this));

  }

  /*
  This function changes the cell velocity of an individual cell by first determining whether the cell is
  close enough to the mouse cursor to be affected, and then if it is, by calculating the effect that mouse velocity
  has on the cell's velocity.
  */
  change_cell_velocity(cell_data, mvelX, mvelY, pen_size) {
    //This gets the distance between the cell and the mouse cursor.
    var dx = cell_data.x - this.mouse.x;
    var dy = cell_data.y - this.mouse.y;
    var dist = Math.sqrt(dy * dy + dx * dx);

    //If the distance is less than the radius...
    if (dist < pen_size) {

      //If the distance is very small, set it to the pen_size.
      if (dist < 4) {
        dist = pen_size;
      }

      //Calculate the magnitude of the mouse's effect (closer is stronger)
      var power = pen_size / dist;

      /*
      Apply the velocity to the cell by multiplying the power by the mouse velocity and adding it to the cell velocity
      */
      cell_data.xv += mvelX * power;
      cell_data.yv += mvelY * power;
    }
  }

  /*
  This function updates the pressure value for an individual cell using the
  pressures of neighboring cells.
  */
  update_pressure(cell_data) {

    //This calculates the collective pressure on the X axis by summing the surrounding velocities
    var pressure_x = (
      cell_data.up_left.xv * 0.5 //Divided in half because it's diagonal
      + cell_data.left.xv
      + cell_data.down_left.xv * 0.5 //Same
      - cell_data.up_right.xv * 0.5 //Same
      - cell_data.right.xv
      - cell_data.down_right.xv * 0.5 //Same
    );

    //This does the same for the Y axis.
    var pressure_y = (
      cell_data.up_left.yv * 0.5
      + cell_data.up.yv
      + cell_data.up_right.yv * 0.5
      - cell_data.down_left.yv * 0.5
      - cell_data.down.yv
      - cell_data.down_right.yv * 0.5
    );

    //This sets the cell pressure to one-fourth the sum of both axis pressure.
    cell_data.pressure = (pressure_x + pressure_y) * 0.25;
  }

  /*
  This function updates the velocity value for an individual cell using the
  velocities of neighboring cells.
  */
  update_velocity(cell_data) {

    /*
    This adds one-fourth of the collective pressure from surrounding cells to the
    cell's X axis velocity.
    */
    cell_data.xv += (
      cell_data.up_left.pressure * 0.5
      + cell_data.left.pressure
      + cell_data.down_left.pressure * 0.5
      - cell_data.up_right.pressure * 0.5
      - cell_data.right.pressure
      - cell_data.down_right.pressure * 0.5
    ) * 0.25;

    //This does the same for the Y axis.
    cell_data.yv += (
      cell_data.up_left.pressure * 0.5
      + cell_data.up.pressure
      + cell_data.up_right.pressure * 0.5
      - cell_data.down_left.pressure * 0.5
      - cell_data.down.pressure
      - cell_data.down_right.pressure * 0.5
    ) * 0.25;

    /*
    This slowly decreases the cell's velocity over time so that the fluid stops
    if it's left alone.
    */
    cell_data.xv *= 0.99;
    cell_data.yv *= 0.99;
  }

  //This function is used to create a cell object.
  cell(x, y, res) {

    //This stores the position to place the cell on the canvas
    this.x = x;
    this.y = y;

    //This is the width and height of the cell
    this.r = res;

    //These are the attributes that will hold the row and column values
    this.col = 0;
    this.row = 0;

    //This stores the cell's velocity
    this.xv = 0;
    this.yv = 0;

    //This is the pressure attribute
    this.pressure = 0;
  }


  //This function is used to create a particle object.
  particle(x, y) {
    this.x = this.px = x;
    this.y = this.py = y;
    this.xv = this.yv = 0;
  }


  /*
  This function is called whenever the mouse button is pressed. The event object is passed to
  this function when it's called.
  */
  mouse_down_handler(e) {
    e.preventDefault(); //Prevents the default action from happening (e.g. navigation)
    this.mouse.down = true; //Sets the mouse object's "down" value to true
  }


  //This function is called whenever the mouse button is released.
  mouse_up_handler() {
    //this.mouse.down = false; // TODO
  }


  //This function is called whenever a touch point is removed from the screen.
  touch_end_handler(e) { // TODO
    if (!e.touches) this.mouse.down = false; //If there are no more touches on the screen, sets "down" to false.
  }


  /*
  This function is called whenever the mouse coordinates have changed. The coordinates are checked by the
  browser at intervals.
  */
  mouse_move_handler(e) {
    //Saves the previous coordinates
    this.mouse.px = this.mouse.x;
    this.mouse.py = this.mouse.y;

    //Sets the new coordinates
    //this.mouse.x = e.offsetX || e.layerX; // absolute positioned canvas
    //this.mouse.y = e.offsetY || e.layerY; // absolute positioned canvas
    this.mouse.x = e.clientX; // fixed positioned canvas
    this.mouse.y = e.clientY; // fixed positioned canvas
  }


  /*
  This function is called whenever one of the coordinates have changed. The coordinates are checked by the
  browser at intervals.
  */
  touch_move_handler(e) { // TODO
    this.mouse.px = this.mouse.x;
    this.mouse.py = this.mouse.y;

    //This line gets the coordinates for where the canvas is positioned on the screen.
    var rect = this.canvas.getBoundingClientRect();

    /*
    And this sets the mouse coordinates to where the first touch is. Since we're using pageX
    and pageY, we need to subtract the top and left offset of the canvas so the values are correct.
    */
    this.mouse.x = e.touches[0].pageX - rect.left;
    this.mouse.y = e.touches[0].pageY - rect.top;
  }

}

export default Particle;
