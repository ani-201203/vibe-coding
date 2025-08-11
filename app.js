document.getElementById('lookup-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('patient-name').value.trim();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    if (!name) {
        resultDiv.innerHTML = '<p class="error">Please enter a patient name.</p>';
        return;
    }
    try {
        const res = await fetch(`/api/patient?name=${encodeURIComponent(name)}`);
        if (!res.ok) {
            const err = await res.json();
            resultDiv.innerHTML = `<p class="error">${err.error}</p>`;
            return;
        }
        const data = await res.json();
        resultDiv.innerHTML = `
            <div class="patient-details">
                <h2>Details for ${data.name}</h2>
                <ul>
                    <li><strong>Age:</strong> ${data.age}</li>
                    <li><strong>Gender:</strong> ${data.gender}</li>
                    <li><strong>Diagnosis:</strong> ${data.diagnosis}</li>
                    <li><strong>Admission Date:</strong> ${data.admission_date}</li>
                </ul>
            </div>
        `;
    } catch (err) {
        resultDiv.innerHTML = '<p class="error">An error occurred while fetching patient details.</p>';
    }
});
