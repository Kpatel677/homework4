function updatefeelToday(val) {
    document.getElementById("feelToday").innerText = "" + Number(val).toLocaleString();
}

function validatePassword() {
    const userId = document.getElementById("userId").value.toLowerCase();
    const pwd = document.getElementById("password").value;
    const repwd = document.getElementById("repassword").value;
    const error = document.getElementById("password-error");

    let lowPwd = pwd.toLowerCase();
    let lowUserId = userId.toLowerCase();

    if (pwd.length < 8) {
        error.textContent = "Password must be at least 8 characters long.";
        return false;
    }

    if (lowPwd.includes(lowUserId)) {
        error.textContent = "Password cannot contain your User ID!";
        return false;
    }

    if (repwd.length > 0 && pwd !== repwd) {
        error.textContent = "Passwords do not match!";
        return false;
    }

    const pwdPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    if (!pwdPattern.test(pwd)) {
        error.textContent = "Must contain 1 uppercase, 1 lowercase, and 1 digit.";
        return false;
    }

    if(pwd.length == 0 || repwd.length == 0){
        error.textContent = "Password is required."
        return false;
    }

    error.textContent = "";
    return true;
}


function validateDOB() {
    let dobInput = document.getElementById("dob");
    let dobValue = new Date(dobInput.value);
    const error = document.getElementById('date-error');
    let today = new Date();

    if(dobInput.value == ""){
        error.textContent = "Date of Birth is required."
        return false;
    }

    today.setHours(0, 0, 0, 0);

    let pastDate = new Date();
    pastDate.setFullYear(today.getFullYear() - 120);
    pastDate.setHours(0, 0, 0, 0);

    if (dobValue > today) {
        alert("Date of Birth cannot be in the future!");
        return false;
    }

    if (dobValue < pastDate){
        alert("Date of Birth canot be more than 120 years old.")
        return false;
    }

    error.textContent = "";
    return true;
}

function firstNameCheck() {
    const firstName = document.getElementById('firstname');
    const error = document.getElementById('first-name-error');

    if (firstName.value.lenght == 0){
        error.textContent = "First name is required."
        return false;
    }

    if (firstName.value.length < 1 || firstName.value.length > 30) {
        error.textContent = "First Name must be between 1 and 30 characters.";
        return false;
    }

    if (!firstName.value.match(/^[A-Za-z'-]+$/)) {
        error.textContent = "First Name can only contain letters, apostrophes, and dashes.";
        return false;
    }
    
    error.textContent = "";
    return true;
}

function lastNameCheck() {
    const lastName = document.getElementById('lastname');
    const error = document.getElementById('last-name-error');

    if (lastName.value.lenght == 0){
        error.textContent = "Last name is required."
        return false;
    }

    if (lastName.value.length < 1 || lastName.value.length > 30) {
        error.textContent = "Last Name must be between 1 and 30 characters.";
        return false;
    }

    if (!lastName.value.match(/^[A-Za-z'-]+$/)) {
        error.textContent = "Last Name can only contain letters, apostrophes, and dashes.";
        return false;
    }

    error.textContent = "";
    return true;
}

function validateUserID() {
    const userField = document.getElementById("userId");
    const error = document.getElementById("userId-error");
    let userId = userField.value;

    if (userId.lenght == 0){
        error.textContent = "User ID is required."
        return false;
    }

    let userPattern = /^[A-Za-z][A-Za-z0-9_-]*$/;
    
    if (!userPattern.test(userId)) {
        error.textContent = "User ID must start with a letter. Use only letters, numbers, - and _";
        return false;
    }

    if (userId.length < 5 || userId.length > 20) {
        error.textContent = "ID must be between 5 and 20 characters.";
        return false;
    }

    error.textContent = "";
    userField.value = userId.toLowerCase();    
    return true;
}

function showReview() {
    const form = document.querySelector('form');
    const reviewArea = document.getElementById('reviewArea');
    const reviewContent = document.getElementById('reviewContent');
    let htmlOutput = "Review Your Information<ul>";
    const formData = new FormData(form);
    
const labels = {
        firstname: "First Name",
        mi: "Middle Initial",
        lastname: "Last Name",
        dob: "Date of Birth",
        email: "Email",
        phone: "Phone",
        addr1: "Address 1",
        addr2: "Address 2",
        city: "City",
        state: "State",
        zip: "Zip Code",
        gender: "Gender",
        vac: "Vaccinated",
        ins: "Insurance",
        salary: "Desired Salary",
        about: "About Yourself",
        userId: "User ID"
    };

    formData.forEach((value, key) => {
        const isCheckbox = key.startsWith('h') && !isNaN(key.substring(1));
        const isPassword = key.includes('Pwd');
        const isSSN = key === 'ssn';

        if (!isCheckbox && !isPassword && !isSSN && value) {
            let label = labels[key] || key;
            htmlOutput += `<li><strong>${label}:</strong> ${value}</li>`;
        }
    });

    htmlOutput += "</ul>";
    reviewContent.innerHTML = htmlOutput;
    reviewArea.style.display = "block";
}

function formatSSN() {
    const ssn = document.getElementById('ssn');
    const error = document.getElementById('ssn-error');
    
    let inputSSNValue = ssn.value;
    let ssnValue = "";

    for (let i = 0; i < inputSSNValue.length; i++) {
        let char = inputSSNValue[i];
        if (char >= '0' && char <= '9') {
            ssnValue += char;
        }
    }

    if (ssnValue.length > 9) {
        ssnValue = ssnValue.substring(0, 9);
    }

    let formatted = "";
    if (ssnValue.length > 0) {
        formatted = ssnValue.substring(0, 3);
        if (ssnValue.length > 3) {
            formatted += "-" + ssnValue.substring(3, 5);
        }
        if (ssnValue.length > 5) {
            formatted += "-" + ssnValue.substring(5, 9);
        }
    }

    ssn.value = formatted;

    if (ssnValue.length === 0) {
        error.textContent = "SSN is required.";
        return false;
    } else if (ssnValue.length < 9) {
        error.textContent = "SSN must be exactly 9 digits.";
        return false;
    } else {
        error.textContent = "";
        return true;
    }
}

function checkEmail() {
    const email = document.getElementById('email');
    const error = document.getElementById('email-error');

    if (email.value.lenght == 0){
        error.textContent = "Email is required."
        return false;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email.value.match(emailPattern)) {
        error.textContent = "Please enter a valid email (name@domain.tld).";
        return false;
    }

    error.textContent = "";
    return true;
}

function checkPhone() {
    const phone = document.getElementById('phone');
    const error = document.getElementById('phone-error');
    
    if (phone.value.lenght == 0){
        error.textContent = "Phone is required."
        return false;
    }

    if (phone.value.length !== 12 || !phone.value.match(/^\d{3}-\d{3}-\d{4}$/)) {
        error.textContent = "Phone number must be 10 digits and in 000-000-0000 format.";
        return false;
    }
    
    error.textContent = "";
    return true;
}

function checkAddress1(){
    const address = document.getElementById('addr1');
    const error = document.getElementById('address1-error');

    if(address.value.lenght == 0){
        error.textContent = "Address Line 1 is required."
        return false;
    }

    if (address.value.length < 2 || address.value.length > 30) {
        error.textContent = "Address Line 1 must be between 2 and 30 characters.";
        return false;
    }

    error.textContent = "";
    return true;
}

function checkAddress2(){
    const address = document.getElementById('addr2');
    const error = document.getElementById('address2-error');
    
    if(address.value == ""){
        error.textContent = ""
        return true;
    }

    if (address.value.length < 2 || address.value.length > 30) {
        error.textContent = "Address Line 2 must be between 2 and 30 characters.";
        return false;
    }

    error.textContent = "";
    return true;
}

function checkCity(){
    const city = document.getElementById('city');
    const error = document.getElementById('city-error');
    
    if(city.value.lenght == 0){
        error.textContent = "City is required."
        return true;
    }

    if (city.value.length < 2 || city.value.length > 30) {
        error.textContent = "City must be between 2 and 30 characters.";
        return false;
    }

    error.textContent = "";
    return true;
}

async function checkZipcode() {
    const city = document.getElementById('zipcode');
    const error = document.getElementById('zipcode-error');
    const cityInput = document.getElementById('city');
    const stateSelect = document.getElementById('state');

    if (city.value.length == 0) {
        error.textContent = "Zipcode is required.";
        cityInput.value = "";
        stateSelect.value = "";
        return;
    }

    if (city.value.length != 5) {
        error.textContent = "Zipcode must be 5 digit long.";
        return;
    }

    error.textContent = "";

    const response = await fetch("https://api.zippopotam.us/us/" + city.value);
    const data = await response.json();

    cityInput.value = data.places[0]['place name'];
    stateSelect.value = data.places[0]['state abbreviation'];
}

function validateFinal() {
    const firstName = firstNameCheck();
    const lastName = lastNameCheck();
    const dateOfBirth = validateDOB();
    const ssn = formatSSN();
    const email = checkEmail();
    const phone = checkPhone();
    const add1 = checkAddress1();
    const add2 = checkAddress2();
    const city = checkCity();
    const zipcode = checkZipcode();
    const userId = validateUserID();
    const password = validatePassword();
    
    if (firstName && lastName && dateOfBirth && ssn && email && phone && add1 && add2 && city && zipcode && userId && password){
        return true;
    } else{
        alert("Please fix the errors on the page before submitting.");
        return false;
    }
}
// reference from AI and w3school // 

function setCookie(cname, cvalue, exhours) {
    const d = new Date();
    d.setTime(d.getTime() + (exhours * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

window.onload = function() {
    checkUser();
};

function checkUser() {
    let user = getCookie("firstname");
    let headerTitle = document.querySelector("#header h3");
    let notUserDiv = document.getElementById("notUser");
    let nameSpan = document.getElementById("cookieName");

    if (user != "") {
        headerTitle.innerHTML = "Welcome Back, " + user + "!";
        nameSpan.innerHTML = user;
        notUserDiv.style.display = "block";
        document.getElementById("firstname").value = user;
        loadFromLocalStorage();
    } else {
        headerTitle.innerHTML = "Welcome New User";
        notUserDiv.style.display = "none";
    }
}

function saveData() {
    const checkbox = document.getElementById("rememberMe");
    const isChecked = checkbox.checked;

    localStorage.setItem("rememberMeStatus", isChecked);

    if (isChecked) {
        let fName = document.getElementById("firstname").value;
        let lName = document.getElementById("lastname").value;
        let email = document.getElementById("email").value;
        let phone = document.getElementById("phone").value;
        let addr1 = document.getElementById("addr1").value;
        let city  = document.getElementById("city").value;
        let state = document.getElementById("state").value;
        let zip   = document.getElementById("zipcode").value;

        if (fName !== "") setCookie("firstname", fName, 48);
        if (lName) localStorage.setItem("stored_lastname", lName);
        if (email) localStorage.setItem("stored_email", email);
        
        localStorage.setItem("stored_phone", phone);
        localStorage.setItem("stored_addr1", addr1);
        localStorage.setItem("stored_city", city);
        localStorage.setItem("stored_state", state);
        localStorage.setItem("stored_zip", zip);
    } else {
        localStorage.removeItem("stored_lastname");
        localStorage.removeItem("stored_email");
        localStorage.removeItem("stored_phone");
        localStorage.removeItem("stored_addr1");
        localStorage.removeItem("stored_city");
        localStorage.removeItem("stored_state");
        localStorage.removeItem("stored_zip");
        setCookie("firstname", "", -1); 
    }
}

// Used W3School as Reference// 
window.addEventListener('DOMContentLoaded', () => {
    const status = localStorage.getItem("rememberMeStatus");
    const checkbox = document.getElementById("rememberMe");

    if (status !== null) {
        checkbox.checked = (status === "true");
    } else {
        checkbox.checked = true;
    }

    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = new Date().toLocaleDateString(undefined, options);
    }
});
function loadFromLocalStorage() {
    if (localStorage.getItem("stored_lastname")) {
        document.getElementById("lastname").value = localStorage.getItem("stored_lastname");
        document.getElementById("email").value = localStorage.getItem("stored_email");
        document.getElementById("phone").value = localStorage.getItem("stored_phone");
        document.getElementById("addr1").value = localStorage.getItem("stored_addr1");
        document.getElementById("city").value = localStorage.getItem("stored_city");
        document.getElementById("state").value = localStorage.getItem("stored_state");
        document.getElementById("zipcode").value = localStorage.getItem("stored_zip");
    }
}

function expireUser() {
    document.cookie = "firstname=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.clear();
    document.querySelector("form").reset();
    checkUser();
}