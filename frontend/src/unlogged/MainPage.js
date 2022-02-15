import React from "react";
import "./style.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <React.Fragment>
      <header className="hero">
        <div class="content">
          <h1>Train to the next level</h1>
          <p>Be the best version of yourself</p>
        </div>
      </header>
      <div className="container-principal">
        <div className="container-secundar1">
          <h3>
            Atinge-ti scopurile cu abonamentul{" "}
            <span
              style={{ display: "block", fontSize: "9rem", color: "#FFEF00" }}
            >
              POTRIVIT!
            </span>
          </h3>
        </div>
        <div className="container-secundar2">
          <h3 className="abonament-pret">Doar 150 de lei/luna</h3>
          <Link to="/tarife">
            <Button id="muibtn" style={{ color: "#f3f3f3" }}>
              Vezi alte abonamente
            </Button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MainPage;
