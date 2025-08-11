import { auth, db } from '/Soil-Farming-Agent/scripts/firebase-config.js';
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Auth protection
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "user-auth.html";
    }
});

// Logout handler
document.getElementById('logoutBtn')?.addEventListener('click', async (e) => {
    e.preventDefault();
    await signOut(auth);
    window.location.href = "user-auth.html";
});

// Populate dropdown
async function loadSoilTypes() {
    const soilSelect = document.getElementById("soilSelect");
    try {
        const snapshot = await getDocs(collection(db, "soils"));
        if (snapshot.empty) {
            console.warn("No soil types found in database.");
            return;
        }
        snapshot.forEach(doc => {
            const data = doc.data();
            const type = data.soilType || data.type; // support both field names
            if (type) {
                const option = document.createElement("option");
                option.value = type;
                option.textContent = type;
                soilSelect.appendChild(option);
            }
        });
    } catch (error) {
        console.error("Error loading soil types:", error);
    }
}

// Search function
async function searchSoil(soilType) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.style.display = "block";
    resultsDiv.innerHTML = "Searching...";

    if (!soilType.trim()) {
        resultsDiv.innerHTML = "<p style='color:red;'>Please select a soil type.</p>";
        return;
    }

    try {
        const searchValue = soilType.trim().toLowerCase();
        let output = "";

        // Search soils
        const qSoils = query(collection(db, "soils"), where("soilTypeLower", "==", searchValue));
        const soilSnapshot = await getDocs(qSoils);

        output += "<h3>Soil Details:</h3>";
        if (soilSnapshot.empty) {
            output += "<p>No matching soil type found.</p>";
        } else {
            soilSnapshot.forEach(doc => {
                const data = doc.data();
                output += `
                    <div class="result-box">
                        <h4>${data.soilType || data.type}</h4>
                        <p><strong>Description:</strong> ${data.soilDescription || data.details || 'N/A'}</p>
                        <p><strong>Recommended Crops:</strong> ${data.cropRecommendation || 'N/A'}</p>
                    </div>
                `;
            });
        }

        // Search distributors
        const qDist = query(collection(db, "distributors"), where("soilTypeLower", "==", searchValue));
        const distSnapshot = await getDocs(qDist);

        output += "<h3>Distributors:</h3>";
        if (distSnapshot.empty) {
            output += "<p>No matching distributors found.</p>";
        } else {
            distSnapshot.forEach(doc => {
                const data = doc.data();
                output += `
                    <div class="result-box">
                        <h4>${data.distributorName || data.name}</h4>
                        <p><strong>Location:</strong> ${data.location || 'N/A'}</p>
                        <p><strong>Contact:</strong> ${data.contact || 'N/A'}</p>
                    </div>
                `;
            });
        }

        resultsDiv.innerHTML = output;
    } catch (error) {
        console.error("Error fetching soil data:", error);
        resultsDiv.innerHTML = "<p style='color:red;'>Error retrieving data. Please try again.</p>";
    }
}

// Bind search button
document.getElementById("searchBtn")?.addEventListener("click", () => {
    const soilType = document.getElementById("soilSelect").value;
    searchSoil(soilType);
});

// Load dropdown on page load
loadSoilTypes();
