document.getElementById('add_school_form').addEventListener('submit', async e => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const location = document.getElementById('location').value;
    const email = document.getElementById('email_form').value;
    const phone = document.getElementById('phone_form').value;
    const services = document.getElementById('Services').value;
    const website = document.getElementById('website').value;


    const response = await fetch('/add_school', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, location, email, phone, services, website })
    });

    const data = await response.json();
    alert(data.message);
    const {success} = data;
    if(success){
        getSchools();
    }
})

async function getSchools(){
    const response = await fetch('/get-schools')
    const data = await response.json();
    console.log(data.data)
    populateSchools(data.data);
}

getSchools();

async function deleteSchool(id,name){
    const flag = confirm(`Are you sure you want to delete ${name}`);
    if(!flag){
        return;
    }

    const response = await fetch('/delete-school/'+id, {
        method: 'DELETE',
    });

    const data = await response.json();
    alert(data.message);
    const {success} = data;
    if(success){
        getSchools();
    }
}

function populateSchools(schools){
    const table = document.getElementById('table_body');
    table.innerHTML = '';
    schools.forEach(school => {
        const row = document.createElement('tr');
        const name = document.createElement('td');
        name.textContent = school.name;

        const location = document.createElement('td');
        location.textContent = school.location;

        const email = document.createElement('td');
        email.textContent = school.email;

        const phone = document.createElement('td');
        phone.textContent = school.phone;

        const services = document.createElement('td');
        services.textContent = school.services;

        const website = document.createElement('td');
        website.textContent = school.website;

        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-outline-dark', 'ms-2')
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteSchool(school.ID, school.name));
        deleteCell.appendChild(deleteButton);

        row.appendChild(name);
        row.appendChild(location);
        row.appendChild(email);
        row.appendChild(phone);
        row.appendChild(services);
        row.appendChild(website);
        row.appendChild(deleteCell);

        table.appendChild(row);
        
    });
}