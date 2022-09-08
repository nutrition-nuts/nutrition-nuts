import {Link} from "react-router-dom";

export default function NavBar() {
    return (
        <div className="navbar" style={{
            borderBottom: "solid 1px",
            paddingBottom: "1rem",
            background: "white"
        }}>
            <Link to="/">
                <h1 style={{
                    marginTop: "0",
                    paddingTop: "20px",
                    color: "black"
                }}>Nutrition Nuts</h1>
            </Link>
            <nav>
                <Link to="/profile">Profile</Link> |{" "}
                <Link to="/nutrition">Nutrition</Link> |{" "}
                <Link to="/workouts">Workouts</Link>
            </nav>
        </div>
    );
}
