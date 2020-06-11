$(function contactListeners() {
    const $form = document.getElementById('contact-form');
    const endpoint = $form.getAttribute('action');
    $form.querySelector(".submit").addEventListener('click', function (e) {
        e.preventDefault();
        fetch(endpoint, {
            method: 'POST',
            body: {
                name: $form.querySelector('#name').value,
                email: $form.querySelector('#email').value,
                message: $form.querySelector('#message').value,
            }
        })
        .then(res => res.json())
        .then(res => alert('Message sent'))
        .catch(() => alert('message not sent'))
    })
});