const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


const showError = (input, message) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.textContent = message;

}

const showSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';

}

function checkEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(input.value.trim()).toLowerCase())) {
        showError(input, 'Invalid email')
    }
}


function checkRequired(inputArr) {
    inputArr.forEach(input => {
        if (input.value.trim() === "") {
            showError(input, `${getFieldName(input)} is required`)
        } else {
            showSuccess(input)
        }
    })

}

function checkLength(input, min, max) {
    if (input.value.length === 0) return
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be longer than ${min} characters`)
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be shorter ${max} characters`)
    }
}

function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

function checkPasswordsMatch(input1, input2) {

    if (input1.value !== input2.value) {
        showError(input2, `Paswwords are not the same`)
    }
}


form.addEventListener('submit', function (e) {
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    checkLength(username, 6, 15);
    checkLength(password, 6, 15);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
})