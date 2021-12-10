const UNIT = 100;
const MARGIN = 100;
const PADDING = 70;

function canvas_arrow(context, fromx, fromy, tox, toy, headlen) {
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.moveTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
}

const DUMMY = ""
document.querySelectorAll(".list").forEach(el => {
    const lines = el.innerHTML.trim().split("\n")
    const nodes = lines[0].split(",").map(l => l.trim()).filter(l => l.length > 0 && !l.includes("-"))
        .map(s => s.split(" ").map(l => l.trim()).filter(s => s.length > 0).map(s => parseInt(s)))
    const green = lines[1].split(" ").map(l => l.trim()).filter(l => l.length > 0).map(s => parseInt(s));
    const red = lines[2].split(" ").map(l => l.trim()).filter(l => l.length > 0).map(s => parseInt(s));

    const height = Math.max(1, ...nodes.map(n => n[1]));
    nodes.push([DUMMY, height])
    nodes.splice(0, 0, [DUMMY, height])

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 2 * MARGIN + UNIT * nodes.length + PADDING * (nodes.length - 1);
    canvas.height = 2 * MARGIN + (height + 1) * UNIT;

    let x = MARGIN;
    for (const node of nodes) {
        ctx.fillStyle = "white";
        if (green.includes(node[0])) {
            ctx.fillStyle = "#7fcfff";
        }
        if (red.includes(node[0])) {
            ctx.fillStyle = "#ff7f7f";
        }
        if (red.includes(node[0]) && green.includes(node[0])) {
            ctx.fillStyle = "#fbff7f";
        }
        ctx.strokeStyle = "black";
        ctx.lineWidth = UNIT / 20;

        for (let i = 0; i <= node[1]; i++) {
            if (node[0] === DUMMY && i === 0) {
                continue
            }
            const y = canvas.height - MARGIN - (i + 1) * UNIT;
            ctx.fillRect(x, y, UNIT, UNIT);
            ctx.strokeRect(x, y, UNIT, UNIT);
        }

        ctx.font = `${UNIT / 2}px Arial`
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "black"
        ctx.fillText(node[0], x + UNIT / 2, canvas.height - MARGIN - UNIT / 2);

        x += UNIT + PADDING;
    }

    x = MARGIN;
    for (const [i, [_, height]] of nodes.slice(0, nodes.length - 1).entries()) {
        ctx.strokeStyle = "black";
        for (let j = 0; j < height; j++) {
            const y = canvas.height - MARGIN - (j + 1.5) * UNIT;
            const next = nodes.indexOf(nodes.slice(i + 1).find(node => node[1] >= j + 1));
            ctx.beginPath();
            canvas_arrow(ctx, x + UNIT / 2, y, x + (next - i) * (UNIT + PADDING) - UNIT / 20, y, UNIT / 3);
            ctx.stroke();
        }

        x += UNIT + PADDING;
    }

    el.innerHTML = "";
    el.appendChild(canvas)
})

const trees = document.querySelectorAll("canvas")
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