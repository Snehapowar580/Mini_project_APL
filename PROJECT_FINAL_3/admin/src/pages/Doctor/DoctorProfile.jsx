import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DoctorProfile = () => {
    const { dToken, profileData, setProfileData } = useContext(DoctorContext);
    const { currency, backendUrl } = useContext(AppContext);
    const [isEdit, setIsEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const headers = {
        Authorization: `Bearer ${dToken}`,
    };

    const fetchProfileData = async () => {
        setIsLoading(true);
    
        if (!dToken || dToken === "undefined" || typeof dToken !== "string") {
            navigate("/doctors/login");
            return;
        }
    
        const headers = {
            Authorization: `Bearer ${dToken}`,
        };
    
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctors/profile`, { headers });
            console.log("Fetched doctor profile:", data);
    
            const doctor = data?.doctor ?? data?.data?.doctor ?? null;
            setProfileData(doctor);
    
        } catch (error) {
            console.error("Profile fetch failed:", error);
    
            if (error.response?.status === 401) {
                localStorage.removeItem("dToken");
                navigate("/doctors/login");
            } else {
                // Optional toast for user feedback
                // toast.error("Unable to fetch profile data.");
            }
    
            setProfileData(null);  
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        // Only try fetching if token exists and profileData is not loaded yet
        if (dToken && !profileData) {
            fetchProfileData();
        }
    
        // Redirect to login if no token
        if (!dToken) {
            navigate("/doctors/login");
        }
    }, [dToken]);
    

    const updateProfile = async () => {
        try {
            const updateData = {
                fees: profileData.fees,
                about: profileData.about,
                available: profileData.available,
                address: profileData.address,
            };

            const { data } = await axios.put(`${backendUrl}/api/doctors/doctor-profile/update`, updateData, { headers });

            if (data.success) {
                setIsEdit(false);
                fetchProfileData();
            } else {
                console.error(data.message || "Update failed.");
            }

        } catch (error) {
            console.error("Error while updating profile:", error);
        }
    };

    if (isLoading) return <div>Loading profile...</div>;

    if (!profileData) {
        return null; 
    }

    return (
        <div className="flex flex-col gap-4 m-5">
            <div>
                
            </div>

            <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
                <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
                    {profileData?.name}
                </p>
                <div className="flex items-center gap-2 mt-1 text-gray-600">
                    <p>{profileData?.degree} - {profileData?.speciality}</p>
                    <button className="py-0.5 px-2 border text-xs rounded-full">
                        {profileData?.experience}
                    </button>
                </div>

                <div className="mt-3">
                    <p className="text-sm font-medium text-[#262626]">About:</p>
                    {isEdit ? (
                        <textarea
                            value={profileData.about}
                            onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))}
                            className="w-full outline-primary p-2 mt-1"
                            rows={5}
                        />
                    ) : (
                        <p className="text-sm text-gray-600 mt-1">{profileData.about}</p>
                    )}
                </div>

                <p className="text-gray-600 font-medium mt-4">
                     fee:&nbsp;
                    <span className="text-gray-800">
                        {currency}&nbsp;
                        {isEdit ? (
                            <input
                                type="number"
                                value={profileData.fees}
                                onChange={(e) =>
                                    setProfileData(prev => ({ ...prev, fees: e.target.value })) }
                                className="border px-2 py-0.5"
                            />
                        ) : (
                            profileData.fees
                        )}
                    </span>
                </p>

                <div className="flex gap-2 py-2">
                    <p>Address:</p>
                    <div className="text-sm">
                        {isEdit ? (
                            <>
                                <input
                                    type="text"
                                    value={profileData.address?.line1 || ''}
                                    onChange={(e) =>
                                        setProfileData(prev => ({
                                            ...prev,
                                            address: { ...prev.address, line1: e.target.value },
                                        }))
                                    }
                                    className="mb-1 block border px-2 py-0.5"
                                />
                                <input
                                    type="text"
                                    value={profileData.address?.line2 || ''}
                                    onChange={(e) =>
                                        setProfileData(prev => ({
                                            ...prev,
                                            address: { ...prev.address, line2: e.target.value },
                                        }))
                                    }
                                    className="block border px-2 py-0.5"
                                />
                            </>
                        ) : (
                            <>
                                <p>{profileData.address?.line1}</p>
                                <p>{profileData.address?.line2}</p>
                            </>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-1 pt-2">
                    <input
                        type="checkbox"
                        disabled={!isEdit}
                        checked={profileData.available}
                        onChange={() =>
                            isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))
                        }
                    />
                    <label>Available</label>
                </div>

                {isEdit ? (
                    <button
                        onClick={updateProfile}
                        className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
                    >
                        Save
                    </button>
                ) : (
                    <button
                        onClick={() => setIsEdit(true)}
                        className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
                    >
                        Edit
                    </button>
                )}
            </div>
        </div>
    );
};

export default DoctorProfile;
