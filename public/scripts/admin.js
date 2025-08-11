import { db } from '/Soil-Farming-Agent/scripts/firebase-config.js';
import {
    collection,
    addDoc,
    getDocs
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// References to collections
const soilCollection = collection(db, 'soils');
const distributorCollection = collection(db, 'distributors');

// Load soil types for distributor dropdown
async function loadSoilTypes() {
    try {
        const soilSnapshot = await getDocs(soilCollection);
        const select = document.getElementById('distributorSoilType');
        select.innerHTML = '<option value="">Select Soil Type</option>';

        soilSnapshot.forEach(doc => {
            const data = doc.data();
            const option = document.createElement('option');
            option.value = data.soilType; // original case for display
            option.textContent = data.soilType;
            select.appendChild(option);
        });
    } catch (error) {
        console.error("Error loading soil types:", error);
    }
}

// Soil form submission
document.getElementById('soilForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const soilType = document.getElementById('soilType').value.trim();
    const soilDescription = document.getElementById('soilDescription').value.trim();
    const cropRecommendation = document.getElementById('cropRecommendation').value.trim();

    if (!soilType || !soilDescription || !cropRecommendation) {
        alert('Please fill out all soil fields.');
        return;
    }

    try {
        await addDoc(soilCollection, {
            soilType: soilType,
            soilTypeLower: soilType.toLowerCase(),
            soilDescription: soilDescription, // match key expected in user.js
            cropRecommendation: cropRecommendation
        });
        alert('Soil details added successfully.');
        document.getElementById('soilForm').reset();
        loadSoilTypes(); // refresh dropdown after new soil
    } catch (error) {
        console.error('Error adding soil:', error);
        alert('Error adding soil details.');
    }
});

// Distributor form submission
document.getElementById('distributorForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const distributorName = document.getElementById('distributorName').value.trim();
    const location = document.getElementById('location').value.trim();
    const contactInfo = document.getElementById('contact').value.trim();
    const distributorSoilType = document.getElementById('distributorSoilType').value.trim();

    if (!distributorName || !location || !contactInfo || !distributorSoilType) {
        alert('Please fill out all distributor fields.');
        return;
    }

    try {
        await addDoc(distributorCollection, {
            distributorName: distributorName,
            location: location,
            contact: contactInfo, // match key expected in user.js
            soilType: distributorSoilType,
            soilTypeLower: distributorSoilType.toLowerCase()
        });
        alert('Distributor details added successfully.');
        document.getElementById('distributorForm').reset();
    } catch (error) {
        console.error('Error adding distributor:', error);
        alert('Error adding distributor details.');
    }
});

// Initial load
loadSoilTypes();
