"use strict"
//elements
let tipsElement = document.getElementsByClassName("tip");
let customTipElement = document.getElementsByClassName("custom-tip");
let billAmountElement = document.getElementById("bill-amount");
let peopleNumberElement = document.getElementById("people-number");
let peopleErrorElement = document.getElementById("people-error");
let totalAmountElement = document.getElementById("total-amount");
let activeTipElement = document.getElementsByClassName("active-tip");
let activeCustomTipElement = document.getElementsByClassName("active-custom-tip");
let tipAmountElement = document.getElementById("tip");
let resetButton = document.getElementsByClassName("reset");

//values
let billAmount = 0;  //the bill amount
let tipPercent = 0;  //the percent of the tip selected
let tipAmount = 0;   //the tip amount that is been calculated from the totalAmount*(tipPercent/100)
let totalAmount = 0; //the total amount that a person have to pay without the tip

function updateTotalAmount() {
	// totalAmount = (Math.round(((billAmountElement.value/peopleNumberElement.value) 
	// 	+ Number.EPSILON) * 100) / 100);
	// console.log('totalAmount' + totalAmount);
	totalAmount = Number((billAmountElement.value/peopleNumberElement.value).toFixed(2));
	// console.log(totalAmount);
	// console.log("totalAmount");
	totalAmountElement.innerHTML = totalAmount + Number((totalAmount * (tipPercent/100)).toFixed(2));
}

function updateTipAmount() {
	tipAmount = Math.round(((totalAmount *(tipPercent/100)) 
		+ Number.EPSILON) * 100) / 100;
	tipAmountElement.innerHTML = tipAmount;
}

function ifValue() {
	if(billAmountElement.value != 0 || 
		peopleNumberElement.value !=0 ||
		activeTipElement.length ||
		customTipElement.value !=0
	) {
		resetButton[0].classList.add('active-reset');
	}
}

//For the tips elements
for(let i=0;i<tipsElement.length;i++) {
	tipsElement[i].addEventListener("click", () => {
		if(customTipElement[0].classList.contains('active-custom-tip')) {
			customTipElement[0].classList.remove('active-custom-tip');
			tipPercent = 0;
		}

		if(activeTipElement.length) {
			if(tipsElement[i].classList.contains("active-tip")) {
				tipsElement[i].classList.remove("active-tip");
				tipAmount = 0;
				tipPercent = 0;
				tipAmountElement.innerHTML = '0.00';
				updateTotalAmount();
			}else {
				activeTipElement[0].classList.remove("active-tip");
				tipsElement[i].classList.add("active-tip");
				tipPercent = 0;
				tipPercent = tipsElement[i].innerHTML.replace(/%/g,'');
				tipAmount = 0;
				updateTipAmount();
				updateTotalAmount();
			}
		}else{
			tipsElement[i].classList.add("active-tip");
			tipPercent = 0;
			tipPercent = tipsElement[i].innerHTML.replace(/%/g,'');
			tipAmount = 0;
			updateTipAmount();
			updateTotalAmount();
		}
		console.log(tipAmountElement);
	});
}

//For the custom tip
customTipElement[0].addEventListener("click", (event) => {
	if(activeTipElement.length) {
		activeTipElement[0].classList.remove("active-tip");
		tipPercent = event.target.value;
	}

	if(customTipElement[0].classList.contains('active-custom-tip')) {
		customTipElement[0].classList.remove('active-custom-tip');
		tipPercent = 0;
		tipAmountElement.innerHTML = '0.00';
		updateTotalAmount();
	}else {
		customTipElement[0].classList.add('active-custom-tip');
		tipPercent = event.target.value;
		updateTipAmount();
		updateTotalAmount();
	}
});

customTipElement[0].addEventListener("input", (event) => {
	console.log(tipPercent);
	if(customTipElement[0].classList.contains('active-custom-tip')) {
		tipPercent = event.target.value;
		updateTipAmount();
		updateTotalAmount();
	}
	ifValue();
});

//For the bill amount
billAmountElement.addEventListener("input", (event) => {
	if(peopleNumberElement.value == '' || peopleNumberElement.value == 0) {
		peopleErrorElement.style.display = 'inline-block';
	}else{
		peopleErrorElement.style.display = 'none';
		updateTotalAmount();
	}

	ifValue();

})

//For the number of peoples
peopleNumberElement.addEventListener("input", (event) => {
	if(event.target.value == '' || event.target.value == 0) {
		peopleErrorElement.style.display = 'inline-block';
	}else{
		peopleErrorElement.style.display = 'none';
		updateTotalAmount();
	}
	ifValue();
})

resetButton[0].addEventListener("click", (event) => {
	billAmount = 0;
	tipPercent = 0;
	tipAmount = 0;
	totalAmount = 0;
	billAmountElement.value = '';
	tipAmountElement.innerHTML = '0.00';
	totalAmountElement.innerHTML = '0.00';
	peopleNumberElement.value = '';
	customTipElement[0].value = '';

	if(activeCustomTipElement.length) {
		activeCustomTipElement[0].classList.remove("active-tip");
	}else if(activeTipElement.length) {
		activeTipElement[0].classList.remove("active-tip");
	}

	if(resetButton[0].classList.contains('active-reset')) {
		resetButton[0].classList.remove('active-reset');
	}
});