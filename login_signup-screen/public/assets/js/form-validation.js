document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirm_password = document.getElementById("confirm_password");

  const email_inputbox = document.getElementById("email_inputbox");
  const password_inputbox = document.getElementById("password_inputbox");
  const confirm_password_inputbox = document.getElementById(
    "confirm_password_inputbox"
  );

  let pswd;

  emailInput.addEventListener("keyup", (e) => {
    validateEmail(e.target.value);
  });

  passwordInput.addEventListener("keyup", (e) => {
    validatePassword(e.target.value);
    pswd = e.target.value;
  });

  confirm_password.addEventListener("keyup", (e) => {
    validateConfirPassword(e.target.value);
  });

  const validateEmail = (value) => {
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    if (emailPattern.test(value)) {
      email_inputbox.style.border = "1px solid rgba(0,0,0,0.12)";
    } else {
      email_inputbox.style.border = "2px solid red";
    }
  };

  const validatePassword = (value) => {
    const passwordPattern = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;

    if (passwordPattern.test(value)) {
      password_inputbox.style.border = "1px solid rgba(0,0,0,0.12)";
    } else {
      password_inputbox.style.border = "2px solid red";
    }
  };

  const validateConfirPassword = (value) => {
    const passwordPattern = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;

    if (passwordPattern.test(value) && value === pswd) {
      confirm_password_inputbox.style.border = "1px solid rgba(0,0,0,0.12)";
    } else {
      confirm_password_inputbox.style.border = "2px solid red";
    }
  };
});
