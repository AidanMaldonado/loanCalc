//Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
    //Hide Results
    document.getElementById('results').style.display = 'none';
    
    //Show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

//Calculate results function
function calculateResults(e) {
    //UI Vars
    const amount = document.querySelector('#amount');
    const interest = document.querySelector('#interest');
    const years = document.querySelector('#years');
    const monthlyPayment = document.querySelector('#monthly-payment');
    const totalPayment = document.querySelector('#total-payment');
    const totalInterest = document.querySelector('#total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //Compute Monthly Payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest)/(x-1);

    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value  = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        //Show Results
        document.getElementById('results').style.display = 'block';

        //Hide Loader
        document.getElementById('loading').style.display = 'none';
    } else {
        showError('Please check your numbers');
    }

    e.preventDefault();
}

// Show Error 
function showError(error) {
    //Hide Results
    document.getElementById('results').style.display = 'none';

    //Hide Loader
    document.getElementById('loading').style.display = 'none';

    //Create a Div
    const errorDiv = document.createElement('div');

    //Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //Add class
    errorDiv.className = 'alert alert-danger';

    //Create Text Node and Append to Div
    errorDiv.appendChild(document.createTextNode(error));

    //Insert Error Above Heading
    card.insertBefore(errorDiv, heading);

    //Clear Error after 3 seconds
    setTimeout(clearError, 3000);
}

//Clear Error 
function clearError() {
    document.querySelector('.alert').remove();
}