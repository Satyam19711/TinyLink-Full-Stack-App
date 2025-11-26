import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Navbar.css";

export default function Navbar() {
  const [searchCode, setSearchCode] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!searchCode.trim()) {
      toast.error("Please enter a code!");
      return;
    }

    navigate(`/code/${searchCode.trim()}`);
    setSearchCode("");
  };

  return (
    <nav className="navbar">
      <div className="nav-left" onClick={() => navigate("/")}>
        TinyLink
      </div>

      <div className="nav-center">
        <button className="nav-btn" onClick={() => navigate("/")}>
          Dashboard
        </button>
      </div>

      <div className="nav-right">
        <input
          type="text"
          placeholder="Enter code"
          value={searchCode}
          onChange={(e) => setSearchCode(e.target.value)}
          className="search-input"
        />
        <button className="go-btn" onClick={handleSearch}>
          Go
        </button>
      </div>
    </nav>
  );
}
