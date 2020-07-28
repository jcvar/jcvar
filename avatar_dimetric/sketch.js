// Sketch params
let dims = 460; // Square canvas size
let tile = 8; // Tile radius
let size = 24; // grid size

// Perlin noise params
let ns_o = 0; // offset
let ns_a = 64; // amplitude
let ns_x = 1 / 16; // x-axis factor
let ns_y = 1 / 16; // y-axis factor
let ns_seed = 20200725;

function setup() {
  createCanvas(dims, dims);
  
  translate(width / 2, height / 2);
  noiseSeed(ns_seed);
  
  strokeWeight(0.2);
  //noStroke();
  //stroke(255)
  
  draw_grid(size);
} // END SETUP

function draw_grid(n) {
  for (let r = -n/2; r < n/2; r++) {
    for (let c = -n/2; c < n/2; c++) {
      let v = car_to_dim(createVector(c, r));
      let cor = get_cor(c+n/2, r+n/2);

      let ns_d = get_noise(c+n/2, r+n/2); // noise y-axis delta
      //let off_y = ns_d - ns_d % tile;

      draw_tile(tile * v.x, tile * v.y + ns_d, cor);
    } // for c
  } // for r
}

function draw_tile(x, y, c) {
  // TOP
  fill(0, 0, blue(c));
  beginShape();
  vertex(x + tile, y); // R
  vertex(x, y + tile / 2); // D
  vertex(x - tile, y); // L
  vertex(x, y - tile / 2); // U
  endShape(CLOSE);

  // FR
  fill(0, green(c), 0);
  beginShape();
  vertex(x + tile, y + tile); // RR
  vertex(x + tile, y); // R
  vertex(x, y + tile / 2); // D
  vertex(x, y + tile / 2 + tile); // DD
  endShape(CLOSE);

  // FL
  fill(red(c), 0, 0);
  beginShape();
  vertex(x, y + tile / 2 + tile); // DD
  vertex(x, y + tile / 2); // D
  vertex(x - tile, y); // L
  vertex(x - tile, y + tile); // LL
  endShape(CLOSE);
}

function car_to_dim(v) {
  return createVector(v.x - v.y, (v.x + v.y) / 2);
}

function get_noise(x, y) {
  return ns_o + ns_a * (2 * noise(x * ns_x, y * ns_y) - 1);
}

function get_cor(x, y) {
  return color(
    map(x, 0, size, 0, 256), // R
    map(y, 0, size, 0, 256), // G
    map(noise(x * ns_x, y * ns_y), 0, 1, 256, 0) // B
  );
}

function mousePressed() {
  saveCanvas('gh-avatar', 'png');
}
