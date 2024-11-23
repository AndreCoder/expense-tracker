/* 
/* Create an event listener: A callback function is a function that is passed 
   as an argument to another function and is executed after some event or 
   operation has occurred. In JavaScript, callbacks are often used for 
   asynchronous operations, such as handling events, making API calls, or 
   reading files.

For example, in the context of the `DOMContentLoaded` event listener:

Here, the arrow function `() => { console.log("DOM fully loaded and parsed"); }`
is the callback function. It will be executed once the `DOMContentLoaded` event 
is fired, indicating that the initial HTML document has been completely loaded 
and parsed. */

/* // With no parameters
const greet = () => console.log("Hello!"); */

document.addEventListener("DOMContentLoaded", () => {

    /*document.getElementById
    assigns a html element to a variable */
    const expenseForm = document.getElementById("expense-form");
    const expenseList = document.getElementById("expense-list");
    const totalAmount = document.getElementById("total-amount");
    const filterCategory = document.getElementById("filter-category");

    /* Line 28 initializes an empty array named expenses.This array
       is likely intended to store a list of expense items, which can be
       added to later in the script. This line sets up the expenses
       variable so that it can be used to collect and manage expense 
       data throughout the script.*/
    let expenses = [];

    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("expense-name").value;
        const amount = parseFloat(document.getElementById("expense-amount").value);
        const category = document.getElementById("expense-category").value;
        const date = document.getElementById("expense-date").value;

        /* Defines the Expense object */
        const expense = {
            id: Date.now(),
            name,
            amount,
            category,
            date
        };

        /* The push() method adds new items to the end of an 
            array, and returns the new length.
            Whate are these functions*/
        expenses.push(expense);
        displayExpenses(expenses);
        updateTotalAmount(expenses);

        /* Reset() method resets the values of all elements in a form */
        expenseForm.reset();
    });

    expenseList.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const id = parseInt(e.target.dataset.id);
            expenses = expenses.filter(expense => expense.id !== id);
            displayExpenses(expenses);
            updateTotalAmount();
        }

        if (e.target.classList.contains("edit-btn")) {
            const id = parseInt(e.target.dataset.id);
            const expense = expenses.find(expense => expense.id === id);

            document.getElementById("expense-name").value = expense.name;
            document.getElementById("expense-amount").value = expense.amount;
            document.getElementById("expense-category").value = expense.category;
            document.getElementById("expense-date").value = expense.date;

            expenses = expenses.filter(expense => expense.id !== id);
            displayExpenses(expenses);
            updateTotalAmount();
        }
    });

    filterCategory.addEventListener("change", (e) => {
        const category = e.target.value;
        if (category === "All") {
            displayExpenses(expenses);
        } else {
            const filteredExpenses = expenses.filter(expense => expense.category === category);
            displayExpenses(filteredExpenses);
        }
    });

    function displayExpenses(expenses) {
        expenseList.innerHTML = "";
        expenses.forEach(expense => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${expense.name}</td>
                <td>$${expense.amount.toFixed(2)}</td>
                <td>${expense.category}</td>
                <td>${expense.date}</td>
                <td>
                    <button class="edit-btn" data-id="${expense.id}">Edit</button>
                    <button class="delete-btn" data-id="${expense.id}">Delete</button>
                </td>
            `;

            expenseList.appendChild(row);
        });
    }

    function updateTotalAmount() {
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        totalAmount.textContent = total.toFixed(2);

        // Change color of total amount based on value
        if (total < 0) {
            totalAmount.style.color = "red";
        }
    }

}); 