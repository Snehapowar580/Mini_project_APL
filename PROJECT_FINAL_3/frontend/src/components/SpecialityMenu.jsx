import React, { useState } from 'react';
import { specialityData } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';

const SpecialityMenu = () => {
    const [symptom, setSymptom] = useState("");
    const navigate = useNavigate();

    // Symptom → Specialization mapping
   // Symptom → Lab Test Category mapping
const symptomMap = {
    // Blood Test
    anemia: "Blood Test",
    lowhemoglobin: "Blood Test",
    vitaminb12deficiency: "Blood Test",
    cholesterol: "Blood Test",
    lipidprofile: "Blood Test",

    // Urine Test
    frequenturination: "Urine Test",
    burningurination: "Urine Test",
    cloudyurine: "Urine Test",
    proteinuria: "Urine Test",
    hematuria: "Urine Test",

    // Diabetes Test
    excessiveThirst: "Diabetes Test",
    highbloodsugar: "Diabetes Test",
    fatigue: "Diabetes Test",
    blurredvision: "Diabetes Test",
    unexplainedweightloss: "Diabetes Test",

    // Thyroid Test
    weightchange: "Thyroid Test",
    hairloss: "Thyroid Test",
    moodswings: "Thyroid Test",
    fatigueThyroid: "Thyroid Test",
    coldintolerance: "Thyroid Test",

    // Cardiac Test
    chestpain: "Cardiac Test",
    palpitations: "Cardiac Test",
    shortnessofbreath: "Cardiac Test",
    dizzinessCardiac: "Cardiac Test",
    edema: "Cardiac Test",

    // COVID / Infection Test
    feverInfection: "COVID / Infection",
    coughInfection: "COVID / Infection",
    sorethroat: "COVID / Infection",
    bodyacheInfection: "COVID / Infection",
    lossOfSmellTaste: "COVID / Infection"
};

    const handleSymptomSearch = () => {
        const key = symptom.toLowerCase().replace(/\s/g, "");
        const specialization = symptomMap[key];

        if (specialization) {
            // redirect to All Doctors page with specialization filter
            navigate(`/doctors/${encodeURIComponent(specialization)}`);
        } else {
            alert("No tests found for this symptom!");
        }
    };

    return (
        <div id='speciality' className='flex flex-col items-center gap-4 py-16 text-[#262626]'>
            <h1 className='text-3xl font-medium'>Find by Symptom or Category</h1>
            <p className='sm:w-1/3 text-center text-sm'>
               Browse through our verified lab consultants and technicians..
            </p>

            {/* Symptom search input */}
            <div className='flex items-center gap-2 mt-4'>
                <input
                    type="text"
                   placeholder="Search for a lab test (e.g., Blood Sugar, CBC)"
                    value={symptom}
                    onChange={(e) => setSymptom(e.target.value)}
                    className="border p-2 rounded w-80"
                />
                <button
                    onClick={handleSymptomSearch}
                    className="bg-purple-900 text-white px-4 py-2 rounded"
                >
                    Search Test
                </button>
            </div>
        </div>
    );
};

export default SpecialityMenu;
