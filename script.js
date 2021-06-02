let value, category, payee, rows, expenseObjectArray = [];

let recurring = document.getElementsByClassName("recurring")
let categoryOpts = document.getElementsByClassName("categoryOpts")
let payeeOpts = document.getElementsByClassName("payeeOpts")
let getMonthly = document.getElementsByClassName("getMonthly")
let expensesTableBody = document.getElementById('expensesTbody')
let expensePost = document.getElementsByClassName('expensesPost')
let expensesTable = document.getElementsByClassName('expenses-table');


const GetPayees = () => {
    fetch('https://localhost:44337/api/Payee')      
    .then((respons) => { return respons.json() })            
    .then((data) => {                              
        // console.log(data)
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
    }).then(function(response){
      return response
    }).then(function(response){
      // console.log(response)
      let result = document.getElementById('payeeResult')
      result.innerHTML = `<p>${response} har nu sparats</p>`
    })
  }
  
  // Add expence -------------------------------------------------------

  let GetMonthly = (e) => {

      fetch('https://localhost:44337/api/Expense/GetMonthlyExpenses?id=' + 3, { // Hämtar Expenses där Recurring.ID = 3(Monthly) är sant
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }) 
      .then((response) => { return response.json() })
      .then((data) => {
        // console.log(data)
        expensesTableBody.innerHTML = ""
        const ids = expenseObjectArray.map(x => x.ID)
        for (i = 0; i < data.length; i++) {
          if (!ids.includes(data[i].ID)) {
            expenseObjectArray.push(data[i]);   // Lägger till utgifterna i en ObjectArray som sedan används när vi skickar till backend
          }
        }
        PopulateTable(expenseObjectArray)
      })
  }

  // Populerar expensestabellen ---------------------------------------------

  const PopulateTable = (data) => { // Data är listan av objekt som hämtas från backend
    for (const objects of data) {
      rows = document.createElement('tr')
      rows.dataset.expenseID = objects.ID
      expensesTableBody.appendChild(rows)

      rows.appendChild(CreateCell(objects.Payee))
      rows.appendChild(CreateCell(objects.ExpenseCategory))
      rows.appendChild(CreateCell(objects.Date.split("T")[0]))
      rows.appendChild(CreateCell(objects.Amount))
      rows.appendChild(CreateCell(objects.Recurring))
    }
  }
  

  // Lägg till celler --------------------------------------------------

  CreateCell = (data) => {
    const cell = document.createElement('td')
    cell.textContent = data
    return cell
  }

  // Postar expenses till backend --------------------------------------------------
  
  expensesPost = () => {
    debugger
    fetch('https://localhost:44337/api/Expense', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(expenseObjectArray)
    }).then((response) => {
      if (response.ok) {        // Tar bort raden ur listan när posten har gått igenom
        const length = expensesTableBody.children.length
        for (i = 0; i < length; i++) {
          const child = expensesTableBody.children
          child[0].remove()
        }
        expenseObjectArray = [] // Tömmer ObjectArray när posten har gått igenom
      } else {
        alert("Derp")
      }
    })
  }


// Add table ---------------------------------------------------

expenseForm.onsubmit = (e) => {
  e.preventDefault()


  // Loopar igenom återkommande och tittar vilken som är i-checkad
  for (let i = 0; i < recurring.length; i++) {
    if (recurring[i].checked == true) {
      value = recurring[i].value;
    }
  }

  // Loopar igenom selecten och tittar vilken option som är vald
  for (let i = 0; i < categoryOpts.length; i++) {
    if (categoryOpts[i].selected == true) {
      category = categoryOpts[i].textContent // Tar text istället för värde
    }
  }

  // Loopar igenom selecten och tittar vilken option som är vald
  for (let i = 0; i < payeeOpts.length; i++) {
    if (payeeOpts[i].selected == true) {
      payee = payeeOpts[i].textContent // Tar text istället för värde
    }
  }

  let expenseArray = [
    payee,
    category,       
    e.target[2].value,
    e.target[3].value,
    value
  ]
  let expenseArrayObject = {
    Payee: expenseArray[0],
    ExpenseCategory: expenseArray[1],
    Date: expenseArray[2],
    Amount: expenseArray[3],
    Recurring: expenseArray[4]
  }
  
  let rows = document.createElement('tr')
  expensesTableBody.appendChild(rows)

  for(let i = 0; i < expenseArray.length; i++) {
      let cell = document.createElement('td')
      rows.appendChild(cell)
      cell.textContent = expenseArray[i]
    }

  expenseObjectArray.push(expenseArrayObject); // Lägger till utgiften i en ObjectArray som sedan används när vi skickar till backend
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
