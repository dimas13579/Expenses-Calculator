let startCalc = document.getElementById('start'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    daybudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalexpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthsavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearsavingsValue = document.getElementsByClassName('yearsavings-value')[0],
    inputValueExp = document.getElementsByClassName('expenses-item'),

    TagExpenses = document.getElementsByClassName('expenses-item-btn')[0],
    TagOptional = document.getElementsByClassName('optionalexpenses-btn')[0],
    TagBudgetCount = document.getElementsByClassName('count-budget-btn')[0],
    inputValueOpt = document.getElementsByClassName('optionalexpenses-item'),
    MaybeIncome = document.getElementsByClassName('choose-income')[0],
    savings = document.getElementById('savings'),
    sumValue = document.getElementsByClassName('choose-sum')[0],
    percentValue = document.getElementsByClassName('choose-percent')[0],
    yearValue = document.getElementsByClassName('year-value')[0],
    monthValue = document.getElementsByClassName('month-value')[0],
    dayValue = document.getElementsByClassName('day-value')[0];


let money, time;

TagExpenses.disabled = true;
TagOptional.disabled = true;
TagBudgetCount.disabled = true;

startCalc.addEventListener('click', function(){
    
    time = prompt ("Введите дату в формате YYYY-MM-DD", "");
    money = +prompt ("Ваш бюджет на месяц?", "");

    while (isNaN(money) || money == "" || money == null) {
        money = +prompt ("Ваш бюджет на месяц?", ""); 
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();

    TagExpenses.disabled = false;
    TagOptional.disabled = false;
    TagBudgetCount.disabled = false; 
});

TagExpenses.addEventListener('click', function() {
        let sum = 0;
        for (let i = 0; i < inputValueExp.length; i++) {
            let a = inputValueExp[i].value,
                b = inputValueExp[++i].value;
        
            if ( typeof(a)==='string' && typeof(a) != null && typeof(b) != null && a != "" && b != "" && a.length < 50) {
        
                console.log ("done");
        
                appData.expenses[a] = b;
                sum += +b;
            } else {
                console.log ("bad result");
                i--;
            }
        }  
    expensesValue.textContent = sum;
});

TagOptional.addEventListener('click', function(){
    for (let i = 0; i <= inputValueOpt.length; i++) {
        let opt = inputValueOpt[i].value;
        appData.optionalExpenses[i] = opt;
        optionalexpensesValue.textContent += appData.optionalExpenses[i] + ' ';
    }

});
TagBudgetCount.addEventListener('click',function(){

    if(appData.budget != undefined){
        appData.moneyPerDay = ((appData.budget - +expensesValue.textContent) / 30).toFixed();
        daybudgetValue.textContent = appData.moneyPerDay + " ";
        if (appData.moneyPerDay < 100) {
            levelValue.textContent ="Это минимальный уровень достатка!";
        }   else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            levelValue.textContent = "Это средний уровень достатка!";
        }   else if (appData.moneyPerDay > 2000) {
            levelValue.textContent = "Это высокий уровень достатка!";
        }   else {
            levelValue.textContent = "Ошибоч"
        }  }
            else{
            daybudgetValue.textContent = "Произошла ошddddибка"
            } 
});

MaybeIncome.addEventListener('input', function(){
    let items = MaybeIncome.value;
    appData.income = items.split(", ");
    incomeValue.textContent = appData.income;

});
savings.addEventListener('click', function(){
    if(appData.savings == true){
        appData.savings = false;
    } else{
        appData.savings = true;
    }
});

sumValue.addEventListener('input', function(){
    if(appData.savings == true){
        let sum = +sumValue.value,
            percent = +percentValue.value;
            appData.monthIncome = sum/100/12*percent;
            appData.yearIncome = sum/100*percent;
            monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
            yearsavingsValue.textContent = appData.yearIncome.toFixed(1);

    }
});

percentValue.addEventListener('input', function(){
    if(appData.savings == true){
            let sum = +sumValue.value,
            percent = +percentValue.value;
            appData.monthIncome = sum/100/12*percent;
            appData.yearIncome = sum/100*percent;
            monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
            yearsavingsValue.textContent = appData.yearIncome.toFixed(1);

    }
});

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
};