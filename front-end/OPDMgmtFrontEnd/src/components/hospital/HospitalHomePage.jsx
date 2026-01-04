import { useEffect, useState } from "react";
import "../../css/HospitalHomePage.css";

function HospitalHomePage() {
    const [hospital, setHospital] = useState([]);

    useEffect(() => {
        const apiUrl = "https://695121ac70e1605a10895d7c.mockapi.io/Hospital";

        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => setHospital(data))
            .catch((err) => console.log("Error fetching data:", err));
    }, []);

    return (
        <>
            {hospital.map((hosp) => (
                <div className="hospital-card" key={hosp.HospitalID}>

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
                            <span>OPD Starting from #{hosp.OpeningOPDNo}</span>
                            <span>Receipt Starting from #{hosp.OpeningReceiptNo}</span>
                            <span>Patient Starting #{hosp.OpeningPatientNo}</span>
                        </div>

                        <div className="flag-row">
                            <span className={`flag ${hosp.IsRateEnableInReceipt ? "on" : "off"}`}>
                                Is rate available in Receipt
                            </span>
                            <span className={`flag ${hosp.IsRegistrationFeeEnableInOPD ? "on" : "off"}`}>
                                Is registration fee enabled in OPD
                            </span>
                        </div>

                    </div>

                    <div className="card-right">
                        <img src={hosp.HospitalImage} alt="Hospital" width={100} />
                    </div>

                </div>
            ))}
        </>
    );
}

export default HospitalHomePage;
