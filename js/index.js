const tabBarBtns = document.querySelectorAll('.tab-bar__navigator');

if (tabBarBtns.length) {
    tabBarBtns.forEach(b => {
        b.addEventListener('click', function () {
            if (!this.classList.contains('active')) {
                document.querySelector('.tab-bar__navigator.active').classList.remove('active');
                this.classList.add('active');

                const targetElementSelector = this.getAttribute('data-target');

                document.querySelector('.tab-bar__item.active').classList.remove('active');
                document.querySelector(targetElementSelector).classList.add('active');
            }
        });
    });

    document.addEventListener('keyup', (e) => {
        const currentlyActiveBtn = document.querySelector('.tab-bar__navigator.active');

        switch (e.keyCode) {
            case 37:
                currentlyActiveBtn.classList.remove('active');
                document.querySelector(currentlyActiveBtn.getAttribute('data-target')).classList.remove('active');

                const prevElement = currentlyActiveBtn.previousElementSibling;

                if (prevElement) {
                    prevElement.classList.add('active');
                    document.querySelector(prevElement.getAttribute('data-target')).classList.add('active');
                } else {
                    const lastBtn = tabBarBtns[tabBarBtns.length - 1];
                    lastBtn.classList.add('active');
                    document.querySelector(lastBtn.getAttribute('data-target')).classList.add('active');
                }
                break;
            case 39:
                currentlyActiveBtn.classList.remove('active');
                document.querySelector(currentlyActiveBtn.getAttribute('data-target')).classList.remove('active');

                const nextElement = currentlyActiveBtn.nextElementSibling;

                if (nextElement) {
                    nextElement.classList.add('active');
                    document.querySelector(nextElement.getAttribute('data-target')).classList.add('active');
                } else {
                    const firstElem = tabBarBtns[0];

                    firstElem.classList.add('active');
                    document.querySelector(firstElem.getAttribute('data-target')).classList.add('active');
                }
                break;
            default:
                break;
        }
    });
}

// setTimeout(() => {
//     document.querySelector('#test-form').submit();
// }, 2000);

// setTimeout(() => {
//     const d = new Date();
//     console.log(d.getSeconds());
// }, 1000);

const successColor = '#2BBB3F';
const errorColor = '#E84612';

const myForm = document.querySelector('#test-form');
const passwordInput = document.querySelector('[name="password"]');
const passwordConfirmationInput = document.querySelector('[name="password-confirmation"]');

const passChecker = (p = '') => {
    let message = '';

    if (p !== p.toLowerCase()) {
        if (p !== p.toUpperCase()) {
            let containsNumber = false;

            for (let i = 0; i < p.length; i++) {
                if (!isNaN(p[i])) {
                    containsNumber = true;
                }
            }

            if (!containsNumber) {
                message = 'Eded daxil et';
            }
        } else {
            message = 'Kicik herf daxil et';
        }
    } else {
        message = 'Boyuk herf daxil et';
    }

    return message.length ? message : true;
};

console.log(passChecker('testerString1'), 'result from passChecker');

const formSubmitter = document.querySelector('#form-submitter');

passwordInput.addEventListener('input', function (e) {
    const res = passChecker(e.target.value);

    if (res === true) {
        this.style.borderColor = successColor;
        formSubmitter.removeAttribute('disabled');
        formSubmitter.removeAttribute('title');
        passwordConfirmationInput.removeAttribute('disabled');
    } else {
        this.style.borderColor = errorColor;
        formSubmitter.setAttribute('disabled', true);
        formSubmitter.setAttribute('title', res);
        passwordConfirmationInput.setAttribute('disabled', true);
    }
});

passwordConfirmationInput.addEventListener('input', function (e) {
    if (e.target.value === passwordInput.value) {
        this.style.borderColor = successColor;
        formSubmitter.removeAttribute('title');
        formSubmitter.removeAttribute('disabled');
    } else {
        this.style.borderColor = errorColor;
        formSubmitter.setAttribute('disabled', true);
        formSubmitter.setAttribute('title', 'Sifreler eyni deyil');
    }
});

myForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const passInput = document.getElementsByName('password')[0];
    const passConfirmInput = document.getElementsByName('password-confirmation')[0];

    if (!passInput.value || !passConfirmInput.value) {
        alert('Please, fill password fields');
    } else if (passInput.value === passConfirmInput.value) {
        myForm.submit();
    } else {
        alert('Password confirmation failed');
    }
});

// 100 request

// 70 password OK

// 30 password confirmation failed
