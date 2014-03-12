var oper = "";
var opo = "";
var num = "";
var memory = "";
var numarr; //array for storing expression elements

//function for checking for a particular array element in an array
Array.prototype.contains = function(k) {
    for (var p in this)
        if (this[p] === k)
            return true;
    return false;
}

function displaynum(n)
{
    num = num + n;
    document.getElementById("input_box").value = num;
}
function displayres() {
    document.getElementById("input_box").value = num;
    return;
}
function operator(op)
{
    oper = op;
    num += oper;
    document.getElementById("input_box").value = num;
}


//now num has the input expression

function read_operand() {
    num1 = numarr.shift();

    //check for preceding '-'
    if (!(num1 === '-')) {
        if ((Math.floor(num1) - num1) === 0) {
            num1 = parseInt(num1);
            return num1;
        }
        else
        {
            num1 = parseFloat(num1); //handle float values too
            return num1;
        }

    }
    else if (num1 === '-') {
        //preceding '-' detected, now play the trick again
        num1 = numarr.shift();
        if ((Math.floor(num1) - num1) === 0) {
            num1 = parseInt(num1);
            return -num1; //return negation
        }
        else
        {
            num1 = parseFloat(num1);
            return -num1;
        }
    }
}

function read_term() {
    var arr_len = numarr.length;


    for (i = 0; i < arr_len; i++) {

        if (numarr[i] === '*' || numarr[i] === '/') {
            if (numarr[i] === '*') {
                numarr[i - 1] = numarr[i - 1] * numarr[i + 1];

            }
            else if (numarr[i] === '/') {
                numarr[i - 1] = numarr[i - 1] / numarr[i + 1];
            }
            for (j = i + 2, k = i; j < arr_len; j++, k++) {
                numarr[k] = numarr[j]; //shift array
            }
            i--;
            numarr[arr_len - 1] = "";
            numarr[arr_len - 2] = "";
            arr_len = arr_len - 2; //reduced array size
        }
    }
    numarr.length = arr_len;  //discard empty positions
}

function evaluate() {
    if (numarr.contains('*') || numarr.contains('/')) {
        read_term();
    }
    if (numarr.length === 1) {
        return numarr[0];
    }
    if (!(numarr.length > 0) || typeof numarr === 'undefined') {
        num = "Missing Operand";
        return num;
    }

    val1 = read_operand();
    //alert(val1);
    if (num === "Error") {
        return num;
    }
    var num2 = 0;
    while (numarr.length !== 0) {
        opo = numarr.shift();

        if (!(numarr.length > 0) || typeof numarr === 'undefined') {
            num = "Missing Operand";
            return num;
        }

//everything goes fine to evaluate now

        temp = read_operand(); //reading 2nd operand after operator

        //but it may be a space covering the operator, so need to check
        if (isNaN(temp)) {
            num = "Missing Operand";
            return num;
        }
        switch (opo) {
            case "+":
                {
                    num2 = val1 + temp;
                    num = num2;
                    break;
                }
            case "-":
                {
                    num2 = val1 - temp;
                    num = num2;
                    break;
                }
            default:
                {
                    num = "Unrecognized Operator";
                    return num;
                }
        }//end switch
        val1 = num; //previous result copied to val1, for expressions like a op b op c

    }//end while
    return num;
}

function calculate() {
    numarr = num.split(" ");
    if (numarr[0] === "") {
        numarr.shift();
    }
    if (numarr.length === 1) { //for people who press a number button and click equal!! :-P

        num = numarr[0];
        displayres();
        return;
    }
    num = "";
    try {
        num = evaluate();
        if (numarr.length > 0) {
            throw e;
        }
        displayres();
    }
    catch (e) {
        displayres();
    }
}

function negation()
{
    num = document.getElementById("input_box").value;
    num = num * -1;
    displayres(num);
}

function reset() {
    document.getElementById("input_box").value = "";
    num = "";
}

function memoryclear()
{
    memory = "";
}

function memoryrecall()
{
    document.getElementById("input_box").value = memory;
}

function memorysub()
{
    memory = parseInt(document.getElementById("input_box").value) - parseInt(memory);
}
function memoryadd()
{
    memory = parseInt(document.getElementById("input_box").value) + parseInt(memory);
}
