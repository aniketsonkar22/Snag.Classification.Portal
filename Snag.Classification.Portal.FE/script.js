// Get DOM elements
const submitBtn = document.getElementById('submitBtn');
const apiInput = document.getElementById('apiInput');
const loading = document.getElementById('loading');
const outputSection = document.getElementById('outputSection');
const output = document.getElementById('output');
const errorSection = document.getElementById('errorSection');
const errorMessage = document.getElementById('errorMessage');

// Main submit handler
submitBtn.addEventListener('click', async () => {
    const inputValue = apiInput.value.trim();
    
    if (!inputValue) {
        showError('Please enter some input');
        return;
    }

    // Hide previous results and show loading
    outputSection.classList.add('hidden');
    errorSection.classList.add('hidden');
    loading.classList.remove('hidden');
    submitBtn.disabled = true;

    try {
        // Call the API
        const data = await callAPI(inputValue);
        showOutput(data);

    } catch (error) {
        showError(error.message);
    } finally {
        loading.classList.add('hidden');
        submitBtn.disabled = false;
    }
});

const cancelBtn = document.getElementById('cancelBtn');
cancelBtn.addEventListener('click', () => {
    apiInput.value = '';
    outputSection.classList.add('hidden');
    errorSection.classList.add('hidden');
    loading.classList.add('hidden');
});

// API call function - Replace with your actual API
async function callAPI(inputValue) {
    // Replace this URL with your actual API endpoint
    const API_URL = 'https://jsonplaceholder.typicode.com/posts';
    
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: inputValue,
            body: inputValue,
            userId: 1
        })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return "Classification A";
}

// Display output
function showOutput(data) {
    output.textContent = JSON.stringify(data, null, 2);
    outputSection.classList.remove('hidden');
}

// Display error
function showError(message) {
    errorMessage.textContent = message;
    errorSection.classList.remove('hidden');
}

// Allow Enter key to submit
apiInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        submitBtn.click();
    }
});

// Clear error on input change
apiInput.addEventListener('input', () => {
    errorSection.classList.add('hidden');
});