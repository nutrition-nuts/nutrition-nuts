import {Link} from "react-router-dom";

export default function NavBar() {
    return (
        <div className="navbar" style={{
            borderBottom: "solid 1px",
            paddingBottom: "1rem",
            background: "white"
        }}>
            <h1 style={{
                marginTop: "0",
                paddingTop: "20px"
            }}>Nutrition Ninja</h1>
            <nav>
                <Link to="/">Home</Link> |{" "}
                <Link to="/profile">Profile</Link> |{" "}
                <Link to="/nutrition">Nutrition</Link> |{" "}
                <Link to="/workouts">Workouts</Link>
            </nav>
        </div>
    );
}
