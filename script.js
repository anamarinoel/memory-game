/**
 * Game status object.
 *
 * @type {Object}
 */
var gameState = {
    numberOfAttempts: 0,
    timeStarted: null,
    timeFinished: null
};

/**
 *
 *
 * @param start
 * @param end
 * @param count
 *
 * @return {Array}
 */
function randomNumbers(start, end, count)
{
    if (end - start < 0) {
        throw 'Param "end" must be bigger than param "start"';
    }
    if ((end - start) < count - 1) {
        throw 'You can\'t generate ' + count + ' different numbers between ' + start + ' and ' + end;
    }
    var returnArray = [],
        randomNumber;
    for (var i = 0; i < count; i++) {
        randomNumber = Math.floor(Math.random() * (end + 1 - start)) + start;

        if (returnArray.indexOf(randomNumber) === -1) {
            returnArray.push(randomNumber);
        } else {
            --i;
        }
    }
    return returnArray;
}

/**
 *
 * @param redovi
 * @param kolone
 */
function tabela(redovi, kolone) {
    var brojevi = randomNumbers(1, 50, 50);
    var brojevi2 = randomNumbers(1, 50, 50);
    var brojac = 0;
    var html = "<table border=1>";
    for (var i = 0; i < redovi; i++) {
        html += "<tr>";
        for (var j = 0; j < kolone; j++) {
            html += `<td id="cell_${brojac}"> </td>`;
            brojac++;
        }
        html += "</tr>";
    }

    html += "</table>";
    document.body.innerHTML = html;
    var j = 0;
    for (var i = 0; i < 100; i += 2) {
        document.getElementById("cell_" + i).innerHTML = brojevi[j];
        document.getElementById("cell_" + (i + 1)).innerHTML = brojevi2[j];

        document.getElementById('cell_' + i).addEventListener('click', klikNaDugme);
        document.getElementById('cell_' + (i + 1)).addEventListener('click', klikNaDugme);

        ++j;
    }
}

tabela(10, 10);

/**
 *
 * @param e
 */
function klikNaDugme(e) {
    var element = e.target;

    checkedShowedNumbers();
    element.classList.add("showed");
}

/**
 *
 */
function checkedShowedNumbers() {
    var showedElements = document.getElementsByClassName("showed");

    if (showedElements.length === 2) {
        if (showedElements[0].innerHTML === showedElements[1].innerHTML) {
            for (var i = showedElements.length; i > 0; i--) {
                var elem = showedElements[i - 1];

                elem.classList.remove('showed');
                elem.classList.add('equal');
            }
        } else {
            for (var i = showedElements.length; i > 0; i--) {
                showedElements[i - 1].classList.remove('showed');
            }
        }
    }
}