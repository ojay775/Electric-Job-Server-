document.addEventListener("DOMContentLoaded", function() {
  
    
    const form = document.getElementById("job-form");
    const applicantsList = document.getElementById("Applicants-list").querySelector("ul"); 

  
    function loadApplicants() {
        fetch("https://my-json-server.typicode.com/ojay775/Electric-job-server-/applicants")
            .then((res) => res.json())
            .then((applicants) => {
                applicantsList.innerHTML = ''; 
                applicants.forEach((applicant) => {
                    addApplicantToDOM(applicant);
                });
            })
            .catch(error => console.error("Error loading applicants:", error));
    }

   
    function addApplicantToDOM(applicant) {
        const listItem = document.createElement("li");
        listItem.className = "applicant-item";
        listItem.innerHTML = `
            <div class="applicant-card">
                <h3>${applicant.name}</h3>
                <div class="applicant-details">
                    <p><span class="detail-label">Location:</span> ${applicant.location}</p>
                    <p><span class="detail-label">Age:</span> ${applicant.age}</p>
                    <p><span class="detail-label">ID Number:</span> ${applicant.idNumber}</p>
                    <p><span class="detail-label">Next of Kin:</span> ${applicant.nextOfKin}</p>
                    <p><span class="detail-label">Status:</span> 
                        <span class="status-badge ${applicant.status.toLowerCase().replace(' ', '-')}">${applicant.status}</span>
                    </p>
                </div>
                <button class="delete-btn">×</button>
            </div>
        `;
        
        listItem.querySelector(".delete-btn").addEventListener("click", function() {
            listItem.remove();
        });
        
        applicantsList.prepend(listItem);
    }

    
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const age = parseInt(document.getElementById("age").value);
        
        if (age < 18 || age > 60) {
            document.getElementById("age-error").style.display = "block";
            return;
        } else {
            document.getElementById("age-error").style.display = "none";
        }
        
        const formData = {
            name: document.getElementById("name").value,
            location: document.getElementById("location").value,
            age: document.getElementById("age").value,
            idNumber: document.getElementById("id-number").value,
            nextOfKin: document.getElementById("next-of-kin").value,
            status: document.getElementById("status").value
        };

        
        addApplicantToDOM(formData);
        form.reset();

       
        console.log("Form Data:", formData);
        
       
    });

    
    loadApplicants();
});