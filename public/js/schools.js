// // Toggle form visibility
// function toggleForm() {
//     const form = document.getElementById('add-school-form');
//     form.style.display = form.style.display === 'none' || !form.style.display ? 'flex' : 'none';
// }

// // Add a new school to the schools section
// function addSchool(event) {
//     event.preventDefault();
    
//     // Retrieve form data
//     const schoolName = document.getElementById('school-name').value;
//     const location = document.getElementById('location').value;
//     const phone = document.getElementById('phone').value;
//     const email = document.getElementById('email').value;
//     const website = document.getElementById('website').value;
//     const services = document.getElementById('services').value;

//     // Create new school card element
//     const schoolCard = document.createElement('div');
//     schoolCard.className = 'school-card';
//     schoolCard.innerHTML = `
//         <img src="school_placeholder.jpg" alt="School Image" class="school-image">
//         <div class="school-info">
//             <h2>${schoolName}</h2>
//             <p class="location">Location: ${location}</p>
//             <p class="contacts">
//                 <strong>Contact:</strong><br>
//                 Phone: ${phone} <br>
//                 Email: <a href="mailto:${email}">${email}</a> <br>
//                 ${website ? `<a href="${website}" target="_blank">Website</a><br>` : ''}
//             </p>
//             <p class="services">
//                 <strong>Services Offered:</strong> ${services}
//             </p>
//             <a href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location)}" target="_blank" class="map-link">Get Directions on Google Maps</a>
//         </div>
//     `;

//     // Append new school card to container
//     document.getElementById('school-cards-container').appendChild(schoolCard);

//     // Reset and hide form
//     event.target.reset();
//     toggleForm();
// }



async function getSchools(){
    const response = await fetch('/get-schools')
    const data = await response.json();
    console.log(data.data)
    populateSchools(data.data);
}

getSchools();

function populateSchools(schools){
    const school_section = document.getElementById('school-section')
    school_section.innerHTML = '';
    schools.forEach(school => {
        school_section.innerHTML +=`
        <div class="cards">
        <div class="card">
        <img src="images/school.svg" alt="School Image" class="school-image">
                <h2>${school.name}</h2>
                <p class="location">Location: ${school.location}</p>
                <p class="contacts">
                    <strong>Contact:</strong><br>
                    Phone: ${school.phone} <br>
                    Email: ${school.email} <br>
                    <a href="${school.website}" target="_blank">Visit US</a>
                </p>
                <p class="services">
                    <strong>Services Offered:</strong> ${school.services}
                </p>
                <a href="https://www.google.com/maps/dir/?api=1&destination=${school.name}" target="_blank"
                    class="map-link">Get Directions on Google Maps</a>
            </div>
        </div>`
        
    });
}
