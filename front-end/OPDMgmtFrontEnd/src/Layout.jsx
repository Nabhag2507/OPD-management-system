import { Link, Outlet } from "react-router-dom";

function Layout() {
    return (
        <>
            <header class="topbar">
                <Link to='/' style={{textDecoration:"none"}} class="brand">🩺 OPD Portal</Link>
                <nav class="nav">
                    {/* <a class="">Dashboard</a> */}
                    <Link to='/hospitals' style={{textDecoration:"none"}}>Hospitals</Link>
                    <Link to='/doctors' style={{textDecoration:"none"}}>Doctors</Link>
                    <Link to='/patients' style={{textDecoration:"none"}}>Patients</Link>
                    <Link to='/opds' style={{textDecoration:"none"}}>OPD</Link>
                    <Link to='/billing' style={{textDecoration:"none"}}>Billing</Link>
                    <Link to='/Treatement' style={{textDecoration:"none"}}>Treatments</Link>
                </nav>
            </header>

            <Outlet/>

        </>
    )
}

export default Layout;
