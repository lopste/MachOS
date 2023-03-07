interface Point {
    x: number
    y: number
}

class vec2 {
    static new(x: number, y: number): Point {
        return { x, y };
    }

    static add(a: Point, b: Point): Point {
        return { x: a.x + b.x, y: a.y + b.y };
    }

    static sub(a: Point, b: Point): Point {
        return { x: a.x - b.x, y: a.y - b.y };
    }
    static mul(a: Point, b: Point): Point {
        return { x: a.x * b.x, y: a.y * b.y };
    }

    static singleMul(a: Point, b: number): Point {
        return { x: a.x * b, y: a.y * b };
    }

    static doubleMul(a: Point, x: number, y: number): Point {
        return { x: a.x * x, y: a.y * y };
    }

    static div(a: Point, b: Point): Point {
        return { x: a.x / b.x, y: a.y / b.y };
    }

    static singleDiv(a: Point, b: number): Point {
        return { x: a.x / b, y: a.y / b };
    }

    static doubleDiv(a: Point, x: number, y: number): Point {
        return { x: a.x / x, y: a.y / y };
    }

    static dot(a: Point, b: Point): number {
        return a.x * b.x + a.y * b.y;
    }
}

export { Point, vec2 };

class Shape {
    public position: Point = { x: 0, y: 0 };

    constructor(pos: Point = { x: 0, y: 0 }) {
        this.position = pos;
    }
}

// Rendering Shapes

class RenderShape extends Shape {
    constructor(pos: Point) {
        super(pos)
    }

    render(): void {
        throw new Error("Method not implemented in base RenderShape class");
    }
}

class Rectangle extends RenderShape {
    public size: Point = { x: 0, y: 0 };

    constructor(pos: Point, size: Point = { x: 0, y: 0 }) {
        super(pos);
        this.size = size;
    }

    render(): void {
        console.log("Rendering a rectangle");
    }
}

class Ellipse extends RenderShape {
    public radius: Point = { x: 0, y: 0 };

    constructor(pos: Point, radius: Point = { x: 0, y: 0 }) {
        super(pos);
        this.radius = radius;
    }

    render(): void {
        console.log("Rendering a circle");
    }
}

// Collision Shapes

class CollisionShape extends Shape {
    constructor(pos: Point) {
        super(pos);
    }

    collides(other: CollisionShape): boolean {
        throw new Error("Method not implemented in base CollisionShape class");
    }

    pointCollides(other: Point): boolean {
        throw new Error("Method not implemented in base CollisionShape class");
    }
}

class RectangleCollision extends CollisionShape {
    public size: Point = { x: 0, y: 0 };
    
    constructor(pos: Point, size: Point = { x: 0, y: 0 }) {
        super(pos);
        this.size = size;
    }

    collides(other: CollisionShape): boolean {
        return false; // TODO: Implement
    }

    pointCollides(other: Point): boolean {
        return false; // TODO: Implement
    }
}


export { RenderShape, Rectangle, Ellipse };