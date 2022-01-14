class Point {
    constructor(x, y = x) {
        this.x = x;
        this.y = y;
        Object.freeze(this);
    }
    add({ x, y }) {
        return new Point(this.x + x, this.y + y);
    }
    sub({ x, y }) {
        return new Point(this.x - x, this.y - y);
    }
    mul(scalar) {
        return new Point(this.x * scalar, this.y * scalar);
    }
    absSquared() {
        return this.x ** 2 + this.y ** 2;
    }
    abs() {
        return Math.sqrt(this.absSquared());
    }
    normalize() {
        return this.mul(1 / this.abs());
    }

    static ZERO = new Point(0, 0);
}

class Node {
    constructor(values = []) {
        this.values = values.map(v => v[0]);
        this.marked = values.map(v => v[1]);
        this.succ = new Array(values.length + 1);
        this.succ.fill(null);
        this.isLeaf = false;
        this.dim = null;
        this.pos = null;
    }
    preorder(fn = () => { }) {
        fn(this);
        if (!this.isLeaf) {
            this.succ.forEach(s => s.preorder(fn));
        }
    }

    getHeight() {
        let h = 0;
        let n = this;
        while (!n.isLeaf) {
            h += 1;
            n = n.succ[0];
        }

        return h;
    }
    getLeaves() {
        const l = [];
        const rec = node => {
            if (node.isLeaf) {
                l.push(node);
            } else {
                for (const s of node.succ) {
                    rec(s);
                }
            }
        }
        rec(this);

        return l;
    }
    calcPositions(offset = Point.ZERO) {
        const dim = this.getDimensions();
        if (this.isLeaf) {
            this.pos = offset;
            return;
        }
        this.pos = offset.add(new Point(
            (dim.x - this.values.length * VALUE_SIZE) / 2, 0
        ));
        let succOffset = offset.add(new Point(0, VALUE_SIZE + Y_MARGIN));
        for (const s of this.succ) {
            s.calcPositions(succOffset);
            succOffset = succOffset.add(new Point(s.dim.x + X_MARGIN, 0));
        }
    }
    getDimensions() {
        if (this.dim !== null) {
            return this.dim;
        }
        if (this.isLeaf) {
            this.dim = new Point(this.values.length * VALUE_SIZE, VALUE_SIZE);
            return this.dim;
        }

        this.dim = new Point(
            this.succ
                .map(s => s.getDimensions().x)
                .reduce((a, b) => a + b, 0) +
            (this.succ.length - 1) * X_MARGIN,
            this.succ[0].getDimensions().y + VALUE_SIZE + Y_MARGIN
        );

        return this.dim;
        // const height = this.getHeight();
        // const leaves = this.getLeaves();
        // this.dim = new Point(
        //     X_MARGIN * (leaves.length - 1) +
        //     VALUE_SIZE * leaves
        //         .map(l => l.values.length)
        //         .reduce((a, b) => a + b, 0),
        //     height * Y_MARGIN + (height + 1) * VALUE_SIZE
        // );
        // return this.dim;
    }
}

const textToTree = text => {
    const values = text.split("\n")
        .map(l => l.trim())
        .filter(l => l.length > 0)
        .map(l => l.replaceAll("-", ""))
        .map(
            l => l.split(",").map(
                p => p.split(" ")
                    .filter(w => w.length > 0)
                    .map(w =>
                        w.charAt(0) === "*" ?
                            [w.substring(1), true] :
                            [w, false]
                    )
            )
        )
    const offset = new Array(values.length);
    offset.fill(0);

    const rec = layer => {
        const node = new Node(values[layer][offset[layer]]);
        if (layer < values.length - 1) {
            for (let i = 0; i < node.succ.length; i++) {
                node.succ[i] = rec(layer + 1);
                offset[layer + 1] += 1;
            }
        } else {
            node.isLeaf = true;
        }
        return node;
    }

    return rec(0);
}

const UNIT = 100;
const VALUE_SIZE = 1;
const X_MARGIN = 0.7;
const Y_MARGIN = 1;
const CANVAS_MARGIN = 0.5;

document.querySelectorAll(".tree").forEach(el => {
    const tree = textToTree(el.innerHTML);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const canvasSize = tree.getDimensions()
        .add(new Point(CANVAS_MARGIN * 2)).mul(UNIT);
    tree.calcPositions();

    canvas.width = canvasSize.x;
    canvas.height = canvasSize.y;

    ctx.font = `${UNIT / 2}px "Times New Roman"`
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const canvasOffset = new Point(CANVAS_MARGIN);
    const squareSize = VALUE_SIZE * UNIT;
    ctx.strokeStyle = "black";
    ctx.lineWidth = UNIT / 20;

    tree.preorder(node => {
        let pos = node.pos;
        if (node.values.length === 0) {
            const canvasPos = pos.add(canvasOffset).mul(UNIT);
            ctx.fillStyle = "white";
            const args = [canvasPos.x - squareSize / 8, canvasPos.y, squareSize / 4, squareSize];
            ctx.fillRect(...args);
            ctx.strokeRect(...args);
        }
        for (let i = 0; i < node.succ.length; i++) {
            const canvasPos = pos.add(canvasOffset).mul(UNIT);

            if (i < node.values.length && node.values[i] !== "_") {
                ctx.fillStyle = node.marked[i] ? "rgb(255, 150, 150)" : "white";
                const rectParams = [canvasPos.x, canvasPos.y, squareSize, squareSize];
                ctx.fillRect(...rectParams);
                ctx.strokeRect(...rectParams);

                ctx.fillStyle = "black";
                ctx.fillText(node.values[i], canvasPos.x + squareSize / 2, canvasPos.y + squareSize / 2);
            }

            if (!node.isLeaf) {
                const s = node.succ[i];
                ctx.beginPath();
                ctx.moveTo(canvasPos.x, canvasPos.y + UNIT * VALUE_SIZE);
                const destCanvasPos = s.pos
                    .add(new Point(VALUE_SIZE * s.values.length / 2, 0))
                    .add(canvasOffset).mul(UNIT);
                ctx.lineTo(destCanvasPos.x, destCanvasPos.y);
                ctx.stroke();
            }

            pos = pos.add(new Point(VALUE_SIZE, 0));
        }
    })
    console.log(tree);

    el.innerHTML = "";
    // el.appendChild(canvas);
    document.querySelector(".output").appendChild(canvas);
});
const trees = document.querySelectorAll(".output canvas")
trees.forEach(el => {
    el.style.display = "none";
});
let index = 0;
trees[index].style.display = "block";
window.addEventListener("keydown", evt => {
    trees[index].style.display = "none";
    if (evt.key === "ArrowLeft") {
        index = Math.max(index - 1, 0);
    } else if (evt.key === "ArrowRight") {
        index = Math.min(index + 1, trees.length - 1);
    }
    trees[index].style.display = "block";
})

document.querySelector("button").addEventListener("click", evt => {
    const link = document.createElement("a");
    document.body.appendChild(link);
    let i = 1;
    document.querySelectorAll("canvas").forEach(c => {
        link.setAttribute("download", `${i}.png`);
        link.setAttribute("href", c.toDataURL("image/png").replace("image/png", "image/octet-stream"))
        link.click();
        i += 1;
    })
    document.body.removeChild(link);
})