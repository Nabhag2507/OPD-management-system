import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../css/HospitalDetailsPage.css";

function HospitalDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [hospital, setHospital] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        fetch(`https://695121ac70e1605a10895d7c.mockapi.io/Hospital/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setHospital(data);
                setLoading(false);
            })
            .catch((err) => {
                console.log("Error:", err);
                setLoading(false);
            });
    }, [id]);

    // if (loading) {
    //     return (
    //         <div className="loader-container">
    //             <div className="loader"></div>
    //             <p>Loading hospital details...</p>
    //         </div>
    //     );
    // }

    if (!hospital) return null;

    return (
        <div className="hospital-details-container">
            <button className="back-btn" onClick={() => navigate(-1)}>
                ← Back
            </button>

            <div className="details-card">
                <div className="details-header">
                    <img src={hospital.HospitalImage} alt="Hospital" />

                    <div>
                        <h2>{hospital.HospitalName}</h2>
                        <p className="address">{hospital.Address}</p>
                    </div>
                </div>

                <div className="details-grid">
                    <Detail label="Registration Charge" value={`₹ ${hospital.RegistrationCharge}`} />
                    <Detail label="Validity (Months)" value={hospital.RegistrationValidityMonths} />
                    <Detail label="Opening OPD No" value={hospital.OpeningOPDNo} />
                    <Detail label="Opening Receipt No" value={hospital.OpeningReceiptNo} />
                    <Detail label="Opening Patient No" value={hospital.OpeningPatientNo} />
                    <Detail label="Payment Mode ID" value={hospital.DefaultPaymentModeID} />
                </div>

                <div className="flags">
                    <span className={hospital.IsRateEnableInReceipt ? "on" : "off"}>
                        {hospital.IsRateEnableInReceipt
                            ? "Rate Enabled in Receipt"
                            : "Rate Disabled in Receipt"}
                    </span>

                    <span className={hospital.IsRegistrationFeeEnableInOPD ? "on" : "off"}>
                        {hospital.IsRegistrationFeeEnableInOPD
                            ? "Registration Fee Enabled in OPD"
                            : "Registration Fee Disabled in OPD"}
                    </span>
                </div>

                <div className="description">
                    <h4>Description</h4>
                    <p>{hospital.Description || "No description available."}</p>
                </div>
            </div>
        </div>
    );
}

function Detail({ label, value }) {
    return (
        <div className="detail-box">
            <span>{label}</span>
            <strong>{value}</strong>
        </div>
    );
}

export default HospitalDetailsPage;
