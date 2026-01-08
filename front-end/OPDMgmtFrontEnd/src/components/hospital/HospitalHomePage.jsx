import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/HospitalHomePage.css";

function HospitalHomePage() {
    const [hospital, setHospital] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const apiUrl = "https://695121ac70e1605a10895d7c.mockapi.io/Hospital";

        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => setHospital(data))
            .catch((err) => console.log("Error fetching data:", err));
    }, []);

    const filteredHospitals = hospital.filter((hosp) =>
        hosp.HospitalName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <div className="hospital-top-bar">
                <input
                    type="text"
                    className="hospital-search"
                    placeholder="Search hospital..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <button className="add-hospital-btn">
                    + Add Hospital
                </button>
            </div>

            {filteredHospitals.map((hosp) => (
                <div
                    className="hospital-card clickable"
                    key={hosp.HospitalID}
                    onClick={() => navigate(`/hospitals/${hosp.HospitalID}`)}
                >
                    <div className="card-left">
                        <div className="title-row">
                            <h3>{hosp.HospitalName}</h3>
                            <span className="id">
                                Payment ID: {hosp.DefaultPaymentModeID}
                            </span>
                        </div>

                        <div className="info-row">
                            <span><b>Address:</b> {hosp.Address}</span>
                            <span><b>Opening Date:</b> {hosp.OpeningDate}</span>
                        </div>

                        <div className="chip-row">
                            <span>₹ {hosp.RegistrationCharge} Reg</span>
                            <span>{hosp.RegistrationValidityMonths} Months</span>
                            <span>OPD Start #{hosp.OpeningOPDNo}</span>
                            <span>Receipt Start #{hosp.OpeningReceiptNo}</span>
                            <span>Patient Start #{hosp.OpeningPatientNo}</span>
                        </div>

                        <div className="flag-row">
                            <span className={`flag ${hosp.IsRateEnableInReceipt ? "on" : "off"}`}>
                                {hosp.IsRateEnableInReceipt
                                    ? "Rate Enabled in Receipt"
                                    : "Rate Disabled in Receipt"}
                            </span>

                            <span className={`flag ${hosp.IsRegistrationFeeEnableInOPD ? "on" : "off"}`}>
                                {hosp.IsRegistrationFeeEnableInOPD
                                    ? "Registration Fee Enabled in OPD"
                                    : "Registration Fee Disabled in OPD"}
                            </span>
                        </div>
                    </div>

                    <div className="card-right">
                        <img
                            src={hosp.HospitalImage}
                            alt="Hospital"
                            width={100}
                        />
                    </div>
                </div>
            ))}
        </>
    );
}

export default HospitalHomePage;
