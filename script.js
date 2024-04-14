const form = document.getElementById('tax-form');
const modal = document.getElementById('modal');
const taxResult = document.getElementById('tax-result');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const grossAnnualIncome = form.elements['gross-annual-income'].value;
  const extraIncome = form.elements['extra-income'].value;
  const deductions = form.elements['deductions'].value;
  const age = form.elements['age'].value;

  if (!grossAnnualIncome || !extraIncome || !deductions || !age) {
    showError('All fields are required');
    return;
  }

  const totalIncome = parseFloat(grossAnnualIncome) + parseFloat(extraIncome) - parseFloat(deductions);

  if (totalIncome <= 800000) {
    taxResult.textContent = 'No tax';
  } else {
    const tax = (totalIncome - 800000) * ({
      'less-than-40': 0.3,
      'greater-than-or-equal-to-40-and-less-than-60': 0.4,
      'greater-than-or-equal-to-60': 0.1
    }[age] || 0);
    taxResult.textContent = `₹ ${tax.toFixed(2)}`;
  }

  modal.style.display = 'block';
});

const showError = (message) => {
  const errorIcons = document.getElementsByClassName('error-icon');
  for (let i = 0; i < errorIcons.length; i++) {
    errorIcons[i].style.display = 'inline-block';
  }

  taxResult.textContent = '';
  modal.style.display = 'none';

  alert(message);
};

document.addEventListener('click', (e) => {
  if (e.target.className === 'close') {
    modal.style.display = 'none';
  }
});  

// Source: https://css-tricks.com/snippets/javascript/javascript-tooltips/
[].slice.call(document.querySelectorAll('div.tooltip')).forEach(function(div) {
    var arrow = div.querySelector('div.arrow');

    var tooltip = new Tooltip(div, {
        title:div.getAttribute('data-title'),
        placement:div.getAttribute('data-placement')||'top',
        trigger:div.getAttribute('data-trigger')||'hover',
        arrow: arrow
    });
});