import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav
      style={{
        borderBottom: "solid 1px",
        paddingBottom: "1rem",
      }}
    >
      <Link to="/">Home</Link> |{" "}
      <Link to="/profile">Profile</Link> |{" "}
      <Link to="/nutrition">Nutrition</Link> |{" "}
      <Link to="/workouts">Workouts</Link>
    </nav>
  );
}
