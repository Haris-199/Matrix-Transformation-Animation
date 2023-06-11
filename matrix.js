class Matrix {
    constructor(a, b, c, d) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.rep = [[a, b], [c, d]];
        this.det = a * d - b * c;

        this.col1 = createVector(a, c);
        this.col2 = createVector(b, d);
        this.row1 = createVector(a, b);
        this.row2 = createVector(c, d);
    }

    mult(B) {
        if (B instanceof p5.Vector) {
            return createVector(this.a * B.x + this.b * B.y, this.c * B.x + this.d * B.y);
        }
        if (B instanceof Matrix) {
            let a = p5.Vector.dot(this.row1, B.col1);
            let b = p5.Vector.dot(this.row1, B.col2);
            let c = p5.Vector.dot(this.row2, B.col1);
            let d = p5.Vector.dot(this.row2, B.col2);
            return new Matrix(a, b, c, d);
        }
    }

    eigenValues() {
        let u = -(this.a + this.d);
        let v = this.det;

        let discriminant = u * u - 4 * v;

        if (discriminant < 0) return [];
        if (discriminant == 0) return [-u / 2];

        let v1 = (-u - sqrt(discriminant)) / 2;
        let v2 = (-u + sqrt(discriminant)) / 2;
        return [v1, v2];
    }
}