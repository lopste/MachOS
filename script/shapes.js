import render from './render.js';

class Shape {
  constructor(options) {
    let defaultOptions = {
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      color: "#f00",
      stroke: "#00f",
      strokeWidth: 1,
      strokeEnabled: true
    }
    
    this.options = Object.assign({}, defaultOptions, options);
  }

  relativeTo(x,y) {
    return {
      x: x - this.options.x,
      y: y - this.options.y
    }
  }

  render() {
    return this;
  }
}

class Rectangle extends Shape {
  constructor(options) {
    super(options);
  }

  isInside(x, y, edges = false) {
    if(edges) {
      return x >= this.options.x && 
             x <= this.options.x + this.options.width && 
             y >= this.options.y 
             && y <= this.options.y + this.options.height;
    } else {
      return x > this.options.x && 
             x < this.options.x + this.options.width && 
             y > this.options.y 
             && y < this.options.y + this.options.height;
    }
  }

  render() {
    render.rect(this.options);
    return this;
  }

  clear() {
    render.clear(this.options);
    return this;
  }
}

class Ellipse extends Shape {
  constructor(options) {
    super(options);
  }

  isInside(x, y, edges = false) {
    let radX = this.options.width / 2,
        radY = this.options.height / 2;
    let cenX = this.options.x + radX,
        cenY = this.options.y + radY;

    let distance = (x - cenX)**2 / radX**2 +
                    (y - cenY)**2 / radY**2;

    return edges ? distance <= 1 : distance < 1;
  }

  render() {
    let modifiedPos = {
      x: this.options.x + this.options.width / 2,
      y: this.options.y + this.options.height / 2
    }
    
    render.ellipse(Object.assign({}, this.options, modifiedPos));
    return this;
  }

  clear() {
    render.clear(this.options);
    return this;
  }
}

export {
  Rectangle,
  Ellipse
}