import React from "react";
import "./MainPage.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";

const MainPage = () => {
  return (
    <React.Fragment>
      <header className='hero'>
        <div className='content'>
          <h1>Train to the next level</h1>
          <p>Be the best version of yourself</p>
        </div>
      </header>
      <div className='container-main__black'>
        <div className='container-secundar1'>
          <h3>
            Atinge-ti scopurile cu abonamentul{" "}
            <span
              style={{ display: "block", fontSize: "9vh", color: "#FFEF00" }}
            >
              POTRIVIT!
            </span>
          </h3>
        </div>
        <div className='container-secundar2'>
          <h3 className='abonament-pret'>De la 150 de lei/luna</h3>
          <Link to='/tarife'>
            <Button
              onClick={() => {
                window.scrollTo(0, 0);
              }}
              id='muibtn'
            >
              Vezi toate abonamentele
            </Button>
          </Link>
        </div>
      </div>
      <div className='container-main__white'>
        <div className='container-secundar1'>
          <h2>De ce sa te alaturi comunitatii noastre?</h2>
          <h4>
            Aparatura de ultima generatie, atmosfera buna si niste oameni care
            te vor ajuta sa integrezi foarte usor
          </h4>
          <p>
            Intelegem faptul ca este greu la inceput, dar cu timpul, fitness-ul
            devine un stil de viata care te ajuta sa evoluezi
          </p>
        </div>
        <div className='container-secundar2'>
          <h3>Antreneaza-te dupa stilul tau!</h3>
          <ReactPlayer
            url='mainpage-video.mp4'
            playing={true}
            muted={true}
            controls={false}
            loop={true}
          />
        </div>
      </div>
      <div className='container-main__black'>
        <div className='container-secundar1'>
          <h3 className='center'>
            Oferim diversitate in clasele noastre de fitness
          </h3>
          <Link to='/activitati'>
            <Button
              onClick={() => {
                window.scrollTo(0, 0);
              }}
              id='muibtn'
            >
              Vezi toate clasele de fitness
            </Button>
          </Link>
        </div>
        <div className='container-secundar2'>
          <h3 className='center'>
            Oferim personal training facut special pentru tine
          </h3>
          <Link to='/personaltraining'>
            <Button
              onClick={() => {
                window.scrollTo(0, 0);
              }}
              id='muibtn'
            >
              Vezi despre antrenori
            </Button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MainPage;
