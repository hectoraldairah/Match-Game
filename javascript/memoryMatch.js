let clickedArray = [];
let interval;
let started = false;
let time = 0;
let ready = true;
let numComplete = 0;

setUp();

function randomAnswers() {
    let answers = [1, 1, 2, 2, 3, 3, 4, 4, 5];
    answers.sort((item) => {
        return .5 - Math.random();
    });

    return answers;
}

function hide(cell) {
    cell.style.background = "orange";
    cell.innerHTML = "";
    cell.clicked = false;

}

function complete(cell) {
    cell.style.background = "green";
    cell.completed = true;
    numComplete++;
}

function startTimer() {
    if (started == false) {
        interval = setInterval(() => {
            time++;
            document.getElementById("timer").innerHTML = "Time Elapsed: " + time;

        }, 1000)
        started = true;
    }
}



function reveal(cell) {
    cell.style.background = "red";
    cell.innerHTML = cell.value;
    cell.clicked = true;
}

function setUp() {
    let grid = document.getElementsByTagName("td");
    let answers = randomAnswers();

    for (let i = 0; i < grid.length; i++) {
        let cell = grid[i];
        cell.completed = false;
        cell.clicked = false;
        cell.value = answers[i];

        cell.addEventListener("mouseenter", function () {
            if (this.completed === false && this.clicked === false) {
                this.style.background = "blue";
            }
        });

        cell.addEventListener("mouseleave", function () {
            if (this.completed === false && this.clicked === false) {
                this.style.background = "orange"
            }
        });

        cell.addEventListener("click", function () {
            if (ready == false)
                return;
            startTimer();
            if (this.clicked === false && this.completed == false) {
                clickedArray.push(this);
                reveal(this);
            }

            if (clickedArray.length == 2) {
                if (clickedArray[0].value == clickedArray[1].value) {
                    complete(clickedArray[0]);
                    complete(clickedArray[1]);

                    clickedArray = [];
                    if (numComplete === 8) {
                        alert("You win in " + time + " seconds.");
                        clearInterval(interval);
                    }
                } else {
                    ready = false;
                    document.getElementById("gridTable").style.border = "5px solid red";
                    setTimeout(() => {
                        hide(clickedArray[0]);
                        hide(clickedArray[1]);

                        clickedArray = [];

                        ready = true;
                        document.getElementById("gridTable").style.border = "5px solid black";

                    }, 500);
                }
            }

        });


    }


    document.addEventListener('keydown', function (event) {
        if (evet.key > 0 && event.key < 10) {
            grid[event.key - 1].click();
        }
    });

    document.getElementById('restart').addEventListener('click', function () {
        location.reload();
    });
}