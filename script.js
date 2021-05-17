let value;
let category;
let payee;

const GetPayees = () => {
    fetch('https://localhost:44337/api/Payee')      
    .then((respons) => { return respons.json() })            
    .then((data) => {                              
        console.log(data)
        return data
    })
    .then((data) => {                              
        addPayees(data)
    })
}
  
GetPayees()
  
const addPayees = (data) => {
   
let select = document.getElementById('Payees')
  
for (let payee of data){
  let opt = document.createElement('option')
  opt.className = "payeeOpts"
  opt.value = payee.ID
  opt.text = payee.Name
  select.appendChild(opt)
  }
}
  
  
  // Lägga till
  
  payeeForm.onsubmit = (e) => {
    e.preventDefault()
  
    let requestObject = {
        Name: e.target[0].value
    }
  
    fetch('https://localhost:44337/api/Payee', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestObject)
    })
    .then(function(response){
      return response
    })
    .then(function(response){
      console.log(response)
      let result = document.getElementById('payeeResult')
      result.innerHTML = `<p>${response} har nu sparats</p>`
    })
  }
  
  // Add expence -------------------------------------------------------


  // expenseFormPost.onsubmit = (e) => {
  //   e.preventDefault()
  //   let recurring = document.getElementsByClassName("recurring")

  //   for (var i = 0; i < recurring.length; i++){
  //     if (recurring[i].checked == true){
  //       value = recurring[i].value;
  //       console.log(value);
  //     }
  //   }
  //   let requestObject = {
  //     PayeeID: e.target[0].value,
  //     ExpenseCategoriesID: e.target[1].value,       
  //     Date: e.target[2].value,
  //     Amount: e.target[3].value,
  //     Recurring: { RecurringExpenses: value }
  //   }
    
  //   fetch('https://localhost:44337/api/Expense', {
  //       method: 'POST',
  //       headers: {
  //           'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(requestObject)
  //   })
  //   .then(console.log(`Payee; ${e.target[0].value} Category ${e.target[1].value} Date ${e.target[2].value} Amount ${e.target[3].value} Recurring ${value}`))
  // }



// Add table ---------------------------------------------------

expenseForm.onsubmit = (e) => {
  e.preventDefault()
  let recurring = document.getElementsByClassName("recurring")
  let categoryOpts = document.getElementsByClassName("categoryOpts")
  let payeeOpts = document.getElementsByClassName("payeeOpts")


  // Loopar igenom återkommande och tittar vilken som är i-checkad
  for (let i = 0; i < recurring.length; i++) {
    if (recurring[i].checked == true) {
      value = recurring[i].value;
      console.log(value);
    }
  }

  // Loopar igenom selecten och tittar vilken option som är selected
  for (let i = 0; i < categoryOpts.length; i++) {
    if (categoryOpts[i].selected == true) {
      category = categoryOpts[i].textContent // Tar texten istället för värdet
    }
  }

  // Loopar igenom selecten och tittar vilken option som är selected
  for (let i = 0; i < payeeOpts.length; i++) {
    if (payeeOpts[i].selected == true) {
      payee = payeeOpts[i].textContent // Tar texten istället för värdet
    }
  }

  let expenseArray = [
    payee,
    category,       
    e.target[2].value,
    e.target[3].value,
    value
  ]

  // debugger
  let tables = document.getElementById('expensesTbody')
  let rows = document.createElement('tr')
  tables.appendChild(rows)

  for(let i = 0; i < expenseArray.length; i++)
    {
      let cell = document.createElement('td')
      rows.appendChild(cell)
      cell.textContent = expenseArray[i]
    }
}


  // MODAL -------------------------------------------------------


var modal = document.getElementById("myModal");

// Icon för att starta modal
var btn = document.getElementById("myBtn");

// X för att stänga modal
var span = document.getElementsByClassName("close")[0];

//knappfunktionen för att öppna

btn.onclick = function() {
  modal.style.display = "block";
}

// knappfunktionen för att stänga
span.onclick = function() {
  modal.style.display = "none";

}
