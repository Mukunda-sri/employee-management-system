const apiUrl = "http://localhost:5000/employees";

async function loadEmployees() {
    const response = await fetch(apiUrl);
    const employees = await response.json();
    document.getElementById("employeeCount").innerText =
    `Total Employees: ${employees.length}`;
    const table = document.getElementById("employeeTable");
    table.innerHTML = "";

    employees.forEach(emp => {
        table.innerHTML += `
            <tr>
                <td>${emp.id}</td>
                <td>${emp.name}</td>
                <td>${emp.email}</td>
                <td>${emp.department}</td>
                <td>${emp.salary}</td>
                <td>
    
    <button style="background:orange;color:white;"
onclick="updateEmployee(${emp.id})">
Update
</button>

<button style="background:red;color:white;"
onclick="deleteEmployee(${emp.id})">
Delete
</button>
</td>
            </tr>
        `;
    });
}

document.getElementById("employeeForm")
.addEventListener("submit", async (e) => {

    e.preventDefault();

    const employee = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        department: document.getElementById("department").value,
        salary: document.getElementById("salary").value
    };

    await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(employee)
    });
    alert("Employee Added Successfully!");

    loadEmployees();
});

async function deleteEmployee(id) {
    alert("Employee Deleted Successfully!");

    await fetch(`${apiUrl}/${id}`, {
        method: "DELETE"
    });

    loadEmployees();
}
async function updateEmployee(id) {

    const name = prompt("Enter new name:");
    const email = prompt("Enter new email:");
    const department = prompt("Enter new department:");
    const salary = prompt("Enter new salary:");

    const employee = {
        name,
        email,
        department,
        salary
    };

    await fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(employee)
    });

    loadEmployees();
}

loadEmployees();
function searchEmployee() {

    const input =
    document.getElementById("search").value.toLowerCase();

    const rows =
    document.querySelectorAll("#employeeTable tr");

    rows.forEach(row => {

        const text =
        row.innerText.toLowerCase();

        row.style.display =
        text.includes(input)
        ? ""
        : "none";
    });
}