// Initialize applications array
let applications = JSON.parse(localStorage.getItem('applications')) || [];

// DOM elements
const form = document.getElementById('applicationForm');
const appNameInput = document.getElementById('appName');
const appTypeInput = document.getElementById('appType');
const contactInput = document.getElementById('contact');
const appNameError = document.getElementById('appNameError');
const appTypeError = document.getElementById('appTypeError');
const contactError = document.getElementById('contactError');
const cancelBtn = document.getElementById('cancelBtn');
const tableBody = document.getElementById('tableBody');
const successPopup = document.getElementById('successPopup');
const closePopup = document.querySelector('.close-popup');

// Form validation
function validateForm() {
    let isValid = true;
    
    // Validate Application Name
    const appName = appNameInput.value.trim();
    const nameRegex = /^[a-zA-Z0-9 ]{3,50}$/;
    
    if (appName === '') {
        appNameError.textContent = 'Please fill the Application Name';
        appNameError.style.display = 'block';
        appNameInput.classList.add('empty-field');
        isValid = false;
    } else if (!nameRegex.test(appName)) {
        appNameError.textContent = 'Application Name must be 3-50 characters long with no special characters';
        appNameError.style.display = 'block';
        appNameInput.classList.add('empty-field');
        isValid = false;
    } else {
        appNameError.style.display = 'none';
        appNameInput.classList.remove('empty-field');
    }
    
    // Validate Application Type
    const appType = appTypeInput.value;
    if (appType === '') {
        appTypeError.textContent = 'Please select an Application Type';
        appTypeError.style.display = 'block';
        appTypeInput.classList.add('empty-field');
        isValid = false;
    } else {
        appTypeError.style.display = 'none';
        appTypeInput.classList.remove('empty-field');
    }
    
    // Validate Email
    const email = contactInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email === '') {
        contactError.textContent = 'Please fill the Application Contact owner';
        contactError.style.display = 'block';
        contactInput.classList.add('empty-field');
        isValid = false;
    } else if (!emailRegex.test(email)) {
        contactError.textContent = 'Please enter a valid email address';
        contactError.style.display = 'block';
        contactInput.classList.add('empty-field');
        isValid = false;
    } else {
        contactError.style.display = 'none';
        contactInput.classList.remove('empty-field');
    }  
    
    return isValid;
}

// Show success popup
function showSuccessPopup() {
    successPopup.style.display = 'flex';
    setTimeout(() => {
        successPopup.style.display = 'none';
    }, 7000); // Auto-close after 7 seconds
}
// Show Reset popup
function showSuccessPopup1() {
    successPopup1.style.display = 'flex';
    setTimeout(() => {
        successPopup1.style.display = 'none';
    }, 7000); // Auto-close after 7 seconds
}

// Save application
function saveApplication(event) {
    event.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
    const newApplication = { 
        name: appNameInput.value.trim(),
        type: appTypeInput.value,
        contact: contactInput.value.trim()
    };
    
    applications.push(newApplication);
    localStorage.setItem('applications', JSON.stringify(applications));
    updateTable();
    form.reset();
    showSuccessPopup();
}

// Cancel form
function cancelForm() {
    form.reset();
     appNameError.style.display = 'none';
    appTypeError.style.display = 'none';
    contactError.style.display = 'none';
    appNameInput.classList.remove('empty-field');
    appTypeInput.classList.remove('empty-field');
    contactInput.classList.remove('empty-field');
    showSuccessPopup1();
}

// Update table with applications data
function updateTable() {
    tableBody.innerHTML = '';
    
    if (applications.length === 0) {  
        tableBody.innerHTML = '<tr><td colspan="3" style="text-align: center;">No applications found</td></tr>';
        return;
    }  
    
    applications.forEach(app => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${app.name}</td>
            <td>${app.type}</td>
            <td>${app.contact}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Event listeners
form.addEventListener('submit', saveApplication);
cancelBtn.addEventListener('click', cancelForm);
closePopup.addEventListener('click', () => {
    successPopup.style.display = 'none';
});

// Close popup when clicking outside
successPopup.addEventListener('click', (e) => {
    if (e.target === successPopup) {
        successPopup.style.display = 'none';
    }
});

// Initialize table on page load
document.addEventListener('DOMContentLoaded', updateTable);
