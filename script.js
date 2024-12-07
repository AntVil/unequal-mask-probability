/**
 * number of bits
 */
const n = 16;
const iterationStep = 1000;

window.addEventListener("load", () => {
    const yElement = document.getElementById("y");
    const zElement = document.getElementById("z");
    const xElement = document.getElementById("x");
    const iterationCountElement = document.getElementById("iterations");
    const probElement = document.getElementById("prob");

    const upperRandomLimit = Math.pow(2, n);

    let iterationCount = 0;
    let equalCount = 0;

    const loop = () => {
        let y;
        let z;
        let x;
        for (let i = 0; i < iterationStep; i++) {
            y = Math.floor(Math.random() * upperRandomLimit);
            z = Math.floor(Math.random() * upperRandomLimit);

            if (y !== z) {
                x = Math.floor(Math.random() * upperRandomLimit);

                if (binaryVectorSkalarProduct(x, y) === binaryVectorSkalarProduct(x, z)) {
                    equalCount++;
                }

                iterationCount++;
            } else {
                // console.info(`numbers were same: ${y}`);
            }
        }

        yElement.value = y.toString(2).padStart(n, "0");
        zElement.value = z.toString(2).padStart(n, "0");
        xElement.value = x.toString(2).padStart(n, "0");
        iterationCountElement.value = iterationCount;
        probElement.value = equalCount / iterationCount;

        requestAnimationFrame(loop);
    }

    loop();
});

function binaryVectorSkalarProduct(x, y) {
    let product = x & y;
    let sum = 0;
    while (product > 1) {
        sum ^= product & 1;
        product = product >> 1;
    }
    return sum
}
