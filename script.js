const calcBtn = document.querySelector('.calc_results_btn'),
    clearBtn = document.querySelector('.calc_clear_btn'),
    mainOutput = document.querySelector('.calc_result_output_main'),
    secondaryOutput = document.querySelector('.calc_result_output_secondary'),
    mortAmountInput = document.querySelector('.calc_mortgage_amount_input'),
    mortTermInput = document.querySelector('.calc_mortgage_term_input'),
    mortRateInput = document.querySelector('.calc_mortgage_rate_input');
let monthlyPayment,
    totalPayment;

function calcResults(){
    let mortAmount = parseFloat(document.querySelector('.calc_mortgage_amount_input').value),
        mortTerm = parseFloat(document.querySelector('.calc_mortgage_term_input').value),
        mortRate = parseFloat(document.querySelector('.calc_mortgage_rate_input').value)/100,
        selectedRadioInput = document.querySelector('input[type="radio"]:checked').value,
        ratePerMonth = mortRate / 12,
        numberOfPayments = mortTerm * 12;

    if (isNaN(mortAmount) || isNaN(mortTerm) || isNaN(mortRate)) {
        Swal.fire({
            title: 'Error!',
            text: 'Please enter valid numbers for all fields.',
            icon: 'warning',
            confirmButtonText: 'Ok'
          })
        return;
    }

    document.querySelector('.calc_result_unready').style.cssText = 'display: none;'
    document.querySelector('.calc_result_ready').style.cssText = 'display: flex;'
    document.querySelector('.calc_result').style.cssText = 'padding: 35px 25px 35px 25px; background:hsl(202, 55%, 16%);'
    
    if (selectedRadioInput === 'repayment') {
        monthlyPayment = (mortAmount * ratePerMonth * Math.pow((1 + ratePerMonth), numberOfPayments)) / (Math.pow((1 + ratePerMonth), numberOfPayments) - 1);
        totalPayment = monthlyPayment * numberOfPayments
    } else if (selectedRadioInput === 'interestOnly') {
        monthlyPayment = mortAmount * mortRate / 12;
        totalPayment = monthlyPayment * numberOfPayments + mortAmount
    }


    mainOutput.innerHTML = `£${monthlyPayment.toFixed(2)}`
    secondaryOutput.innerHTML = `£${totalPayment.toFixed(2)}`

}

function clearAll(){
    mortAmountInput.value = ""
    mortTermInput.value = ""
    mortRateInput.value = ""
    mainOutput.innerHTML = `£${0}`
    secondaryOutput.innerHTML = `£${0}`
}

function checkError(index){    
    if (document.querySelectorAll('input[type="number"]')[index].value == '') {
        showError(index)
    } else {
       hideError(index)
    }
    
}

function showError(index){
    const errorStates = document.querySelectorAll('.calc_error_state')
        errorStates[index].style.display = 'block'   
    document.querySelectorAll('.calc_input_sign')[index].style.cssText = 'background:hsl(4, 69%, 50%); color: white;'
    document.querySelectorAll('input[type="number"]')[index].style.cssText = 'border:1px solid hsl(4, 69%, 50%);'
}
function hideError(index){
    const errorStates = document.querySelectorAll('.calc_error_state')
        errorStates[index].style.display = 'none'   
    document.querySelectorAll('.calc_input_sign')[index].style.removeProperty('background')
    document.querySelectorAll('.calc_input_sign')[index].style.removeProperty('color')
    document.querySelectorAll('input[type="number"]')[index].style.removeProperty('border')
 
}

function changeSignColor(id){
    let index = parseInt(id)
    document.querySelectorAll('.calc_input_sign')[index].style.cssText = 'background:hsl(61, 70%, 52%);'
    document.querySelectorAll('input[type="number"]')[index].style.cssText = 'border:1px solid hsl(61, 70%, 52%);'
}

function returnSignColor(id){
    let index = parseInt(id)
    document.querySelectorAll('.calc_input_sign')[index].style.cssText = 'background:hsl(202, 86%, 94%);'
    checkError(index)
}

function checkRadioInput() {
    document.querySelectorAll('input[type="radio"]').forEach(el => {
        index = el.id
        if (el.checked) {
            document.querySelectorAll('.calc_input_radio_wrapper')[index].style.cssText = 'border:1px solid hsl(61, 70%, 52%); background:rgb(215 218 47 / 18%);'
        } else{
            document.querySelectorAll('.calc_input_radio_wrapper')[index].style.cssText = 'border: 1px solid hsl(200, 24%, 40%); background:none;'
        }
    });
    
}

checkRadioInput()