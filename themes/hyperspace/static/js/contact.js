/**
 * From https://stackoverflow.com/a/9204568/1767047
 */
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
    

$(function contactListeners() {
    let token;
    const form = document.getElementById('contact-form');
    const endpoint = form.getAttribute('action');
    const captchaKey = form.getAttribute('data-captcha-key');
    const labelErrorName = form.querySelector('label.error[for="name"]');
    const labelErrorEmail = form.querySelector('label.error[for="email"]');
    const labelErrorMessage = form.querySelector('label.error[for="message"]');
    const $name = form.querySelector('#name');
    const $email = form.querySelector('#email');
    const $message = form.querySelector('#message');
    function clearInputs() {
        $name.value = '';
        $email.value = '';
        $message.value = '';
        labelErrorEmail.textContent = '';
        labelErrorMessage.textContent = '';
        labelErrorName.textContent = '';
    }
    function onSubmitToken(myToken) {
        token = myToken;
        submit();
    }
    window.onSubmitToken = onSubmitToken;

    function submit() {
        const name = $name.value.trim();
        const email = $email.value.trim();
        const message = $message.value.trim();
        let hasError = false;
        if (name.length < 2) {
            labelErrorName.textContent = "Name should be longer than two characters"
            hasError = true;
        } else {
            labelErrorName.textContent = "";
        }
        if (!validateEmail(email)) {
            labelErrorEmail.textContent = "Email should be valid";
            hasError = true;
        } else {
            labelErrorEmail.textContent = "";
        }
        if (message.length < 5) {
            labelErrorMessage.textContent = "Message should be longer than five characters";
            hasError = true;
        } else {
            labelErrorMessage.textContent = "";
        }
        if (hasError) {
            swal('Oops','Contact form has errors, please check', 'error');
            return false;
        }
        fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify({
                name,
                email,
                content: message,
                token: token ? token : null,
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            console.log("status", res.status);
            if (res.status !== 200) {
                throw new Error('Error on sending');
            }
            return res
        })
        .then(res => res.json())
        .then(res => swal('Thank you', 'Thank you for your message, we\'ll review it shortly', 'success'))
        .then(clearInputs)
        .catch(() => swal('Ooops','There was a problem sending your message', 'error'))
    }
});