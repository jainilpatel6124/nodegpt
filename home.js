let table = document.getElementById("table");
let datarr = [];
let tablebody = document.getElementById("tablebody");

async function showtb() {
  try {
    table.classList.remove("d-none");

    const response = await fetch("/getdata/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    var result = await response.json();

    console.log(result);

    let str = ``;

    result.forEach((element) => {
      str += `
            <tr>
                <td>${element.emp_id}</td>
                <td>${element.emp_email}</td>
                <td>${element.emp_pass}</td>
                <td>
                <button type="button" class="btn btn-danger btn-sm delete-btn">Delete</button>
            </td>
            </tr>         
        `;
    });
    tablebody.innerHTML = str;
  } catch (err) {
    alert(err.message);
  }
}

async function deleteData(emp_id) {

  try {
    table.classList.remove("d-none");

    const response = await fetch("/deleteData/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ emialID: emp_id })

    }); 
    window.location.reload();

    var result = await response.json();

    
    
   
  } catch (err) {
    alert(err.message);
  }
}

async function insertData(emp_id, emp_email, emp_pass) {
    try {
      const response = await fetch("/insertData/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emp_id, emp_email, emp_pass })
      });
  
      const result = await response.json();
  
      // Handle the result if needed
    } catch (error) {
      alert(error.message);
    }
  }
  
