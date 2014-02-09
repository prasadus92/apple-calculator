var oper = "";
var opo = "";
var num = "";
var x;
var memory = "";
var res = 0;
var numarr;
function displaynum(n)
{
    //document.getElementById("input_box").value = document.getElementById("input_box").value + n
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
    //num = document.getElementById("input_box").value
    num += oper;
    document.getElementById("input_box").value = num;
}
//code for equals starts here
//now num has the input expression

function read_operand() {
    num1 = numarr.shift();
    //alert(numarr.length);
    /*for (i = 0; i < numarr.length; i++) {
     alert(numarr[i]);
     }*/
    //alert(num1);
    if (isNaN(num1)) {
        if (num1 === "-") {
            tmp = numarr.shift();
            //alert(tmp);
            tmp = parseInt(tmp);
            return -tmp;
        }
        num = "Error";
        return;
    }
    num1 = parseInt(num1);
    return num1;
}

function read_term() {
    if (!(numarr.length > 0) || typeof numarr === 'undefined') {
        numi = "Missing Operand";
        return numi;
    }

}

function evaluate() {
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
        //alert(opo);
        /*if ((opo !== "+") & (opo !== "-") & (opo !== "*") & (opo !== "/")) {
         num = "Unrecognized Operator";
         return num;
         }*/
        if (!(numarr.length > 0) || typeof numarr === 'undefined') {
            num = "Missing Operand";
            return num;
        }

//everything goes fine to evaluate now

        temp = parseInt(numarr.shift());
        //alert(numarr.length);
        //but it may be a space covering the operator, so need to check
        if (isNaN(temp)) {
            num = "Missing Operand";
            return num;
        }
//alert(temp);

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
            case "*":
                {
                    num2 = val1 * temp;
                    num = num2;
                    break;
                }
            case "/":
                {
                    num2 = val1 / temp;
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
//alert(num);
    return num;
}

function calculate() {
    numarr = num.split(" ");
    //alert(numarr.length);
    /*for(i=0;i<numarr.length;i++){
     alert(numarr[i]);
     }*/
    if (numarr[0] === "") {
        numarr.shift();
    }
    if (numarr.length === 1) {
//alert(numarr[0]);
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
//alert(num);
        displayres();
    }
    catch (e) {
        displayres();
    }
}

/*function equals()
 {
 numarr = split(num);
 //doesthejob(eval(num), eval(document.getElementById("input_box").value), oper)
 }
 //a sub-function of equals 
 function doesthejob(n1, n2, op)
 {
 if (op == "+")
 document.getElementById("input_box").value = n1 + n2
 else if (op == "-")
 document.getElementById("input_box").value = n1 - n2
 else if (op == "*")
 document.getElementById("input_box").value = n1 * n2
 else if (op == "/")
 document.getElementById("input_box").value = n1 / n2
 }
 
 //code for equals ends here
 */
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
