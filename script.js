$(document).ready(function () {
    start();
});

function start() {
    // Get n size grid
    const slider = $("#myRange");
    const n = slider.val();
    $("#ndisp").html(n); // set text of n
    createGrid(n); // create grid
    slider.on("input", function () { 
        $("#ndisp").html(this.value);
        createGrid(this.value);
    });
}

function createGrid(n){
    const grid = $("#girdinteract");
    grid.empty();
    // Generate table (grid)
    let table = $("<table>");
    for (let i = 0; i < Math.pow(2, n); i++) {
        let row = $("<tr>");
        for (let j = 0; j < Math.pow(2, n); j++) {
            row.append($("<td>", {
                id: 'R' + i + 'C' + j,
                onclick: `setFillSpace(${n}, ${i}, ${j})`
            }))
        }
        table.append(row);
    }
    grid.append(table);
}

function setFillSpace(nInit, row, column) {
    (function() { // Begin scoped function
        let filledSpaces = [];
        let fillSpace = [row, column]; // space user clicked on
        const startColor = "#ffffff";
        // Set filled square
        fillColor(fillSpace, startColor);

        filledSpaces.push(fillSpace);
        let center = Math.pow(2, nInit) / 2;
        fill(nInit, center-1, center-1);

        function fill(n, center_r, center_c) {
            // Calculate positions of center four squares
            let s1 = [center_r, center_c];
            let s2 = [center_r, center_c + 1];
            let s3 = [center_r + 1, center_c];
            let s4 = [center_r + 1, center_c + 1];
        
            let fillsquares = []; // array to hold squares to fill
            // Calculate number of squares from center to edge of current (sub)square
            let dist = (Math.pow(2, n) / 2)-1;
            
            // Get the starting positions for the first three sub squares
            let q1start = [center_r - dist, center_c - dist];
            let q2start = [center_r - dist, center_c + 1];
            let q3start = [center_r + 1, center_c - dist];
            
            // Get the ending position for the first three sub squares
            let q1end = [center_r, center_c];
            let q2end = [center_r, center_c + dist + 1];
            let q3end = [center_r + dist + 1, center_c];
        
            if (checkQuad(q1start, q1end)) {
                // 1st sub square has the fills space
                fillsquares = [s2, s3, s4];
            }
            else if(checkQuad(q2start, q2end)) {
                // 2nd sub square has the fills space
                fillsquares = [s1, s3, s4];
            }
            else if(checkQuad(q3start, q3end)) {
                // 3rd sub square has the fills space
                fillsquares = [s1, s2, s4];
            }
            else { // 4th sub square has the fills space
                fillsquares = [s1, s2, s3];
            }
        
            // Fill in squares
            const color = randomColor();
            fillsquares.forEach(element => {
                filledSpaces.push(element);
                fillColor(element, color);
            });
            
            if (n == 1) { return; }
            else {
                // fill quad1
                let dist = (Math.pow(2, n-1)/2)
                let center = [center_r - dist, center_c - dist]
                fill(n-1, center[0], center[1])
                // fill quad2
                center = [center_r - dist, center_c + dist]
                fill(n-1, center[0], center[1])
                // fill quad3
                center = [center_r + dist, center_c - dist]
                fill(n-1, center[0], center[1])
                // fill quad4
                center = [center_r + dist, center_c + dist]
                fill(n-1, center[0], center[1])
            }
        }
        
        function fillColor(cord, color) {
            $(`#R${cord[0]}C${cord[1]}`).css('background-color', color);
        }
        
        function checkQuad(startCord, endCord) {
            found = false
            filledSpaces.forEach(element => {
                if (element[0] >= startCord[0] && element[0] <= endCord[0]) {
                    if (element[1] >= startCord[1] && element[1] <= endCord[1]) { 
                        found = true;
                    }
                }
            });
            return found;
        }
        
        function randomColor() {
            let letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
              color += letters[Math.floor(Math.random() * letters.length)];
            }
            return color;
        }
    })();
}
