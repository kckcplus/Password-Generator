const resultF = document.getElementById('result');
const lengthF = document.getElementById('length');
const uppercaseF = document.getElementById('uppercase');
const lowercaseF = document.getElementById('lowercase');
const numbersF = document.getElementById('numbers');
const symbolsF= document.getElementById('symbols');
const clipboard = document.getElementById('clipboard');
const generate = document.getElementById('generate');


const randomFunction = {
    uppercase: getRandomUppercase,
    lowercase: getRandomLowercase,
    number: getRandomNumber,
    symbol: getRandomSymbol
}


clipboard.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultF.innerText;

    if(!password) { return; }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('Copy');
    textarea.remove();
    alert('Password Copied');
});


generate.addEventListener('click', () => {
    const length = +lengthF.value;
    const upperClicked = uppercaseF.checked;
    const lowerClicked = lowercaseF.checked;
    const numberClicked = numbersF.checked;
    const symbolClicked = symbolsF.checked;

    resultF.innerText = generatePassword(
        length, upperClicked, lowerClicked, numberClicked, symbolClicked
    );
});

function generatePassword(length, uppercase, lowercase, number, symbol){
    let generatedPassword = '';
    const typesCount = uppercase + lowercase + number + symbol;
    const typesArray = [{uppercase}, {lowercase}, {number}, {symbol}].filter(
        item => Object.values(item)[0]);
    
    if(typesCount == 0){
        return " Select at least 1 option";
    }

    for(let i=0; i<length; i+=typesCount){
		typesArray.forEach(type => {
			const functionName = Object.keys(type)[0];
			generatedPassword += randomFunction[functionName]();
		});
	}
    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
}



function getRandomUppercase(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomLowercase(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol(){
    const symbols = '!@#$%^&*()[];,.<>'
    return symbols[Math.floor(Math.random() * symbols.length)];
}