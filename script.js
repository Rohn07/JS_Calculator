// return history value
function getHistory(){
	return document.getElementById("history-value").innerText;
}

// to print history value
function printHistory(num){
	document.getElementById("history-value").innerText=num;
}

// to return the answer of the calculation
function getOutput(){
	return document.getElementById("output-value").innerText;
}

// to print the value of the answer 
function printOutput(num){
    // to check the value is empty not 0
	if(num==""){
		document.getElementById("output-value").innerText=num;
    }
    // if not the number would get converted in to comma seperated value
	else{
		document.getElementById("output-value").innerText=getFormattedNumber(num);
	}	
}

// to get the commas in between the number for better understanding
function getFormattedNumber(num){
	if(num=="-"){ // condition for negative number
		return "";
	}
	var n = Number(num);
	var value = n.toLocaleString("en"); // in-built function 
	return value;
}
// to get the orignal number back
function reverseNumberFormat(num){
	return Number(num.replace(/,/g,''));
}

var operator = document.getElementsByClassName("operator"); // list of operators 
for(var i =0;i<operator.length;i++){ // get the value of operator one by one
	operator[i].addEventListener('click',function(){
		if(this.id=="clear"){ //clear button function
			printHistory("");
			printOutput("");
		}
		else if(this.id=="backspace"){
			var output=reverseNumberFormat(getOutput()).toString();
			if(output){//if output has a value
				output= output.substr(0,output.length-1);
				printOutput(output);
			}
		}
		else{
			var output=getOutput();
			var history=getHistory(); // getting bith varaibles to get the numbers in history.
			if(output==""&&history!=""){ // to get the changing operator once entered wrong 
				if(isNaN(history[history.length-1])){ // if the last character is operator NaN 
					history= history.substr(0,history.length-1);
				}
			}
			if(output!="" || history!=""){
				output= output==""?output:reverseNumberFormat(output);
				history=history+output;
				if(this.id=="="){ // for the calculation 
					var result=eval(history);
					printOutput(result); // outout is stored
					printHistory(""); // done when output is generated
				}
				else{ // operator and number is added to the history for the calculation
					history=history+this.id;
					printHistory(history);
					printOutput("");
				}
			}
		}
		
	});
}

//list of number 
var number = document.getElementsByClassName("number");
for(var i =0;i<number.length;i++){
	number[i].addEventListener('click',function(){
		var output=reverseNumberFormat(getOutput());
		if(output!=NaN){ //if output is a number
			output=output+this.id;
			printOutput(output);
		}
	});
} 