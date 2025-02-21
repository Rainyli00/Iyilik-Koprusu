/* BEGIN EXTERNAL SOURCE */

    document.getElementById('togglePassword').addEventListener('click', function () {
        const passwordField = document.getElementById('password');
        const passwordIcon = document.getElementById('togglePasswordIcon');
        const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordField.setAttribute('type', type);
        passwordIcon.classList.toggle('bi-eye');
        passwordIcon.classList.toggle('bi-eye-slash');
    });

/* END EXTERNAL SOURCE */
/* BEGIN EXTERNAL SOURCE */

    document.getElementById('togglePassword').addEventListener('click', function () {
        const passwordField = document.getElementById('password');
        const passwordIcon = document.getElementById('togglePasswordIcon');
        const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordField.setAttribute('type', type);
        passwordIcon.classList.toggle('bi-eye');
        passwordIcon.classList.toggle('bi-eye-slash');
    });

/* END EXTERNAL SOURCE */
