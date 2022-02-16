import React from "react";

const PersonalTraining = () => {
  return (
    <React.Fragment>
      <div className="container-pt-photo ">
        <div className="content">
          <h1>Personal trainer</h1>
          <p>Ajutorul tau catre obtinerea rezultatelor optime</p>
        </div>
      </div>
      <div className="container-galben">
        <div className="container-secundar1">
          <h2>Motivatia</h2>
          <p className="center">
            Motivatia poate fi unul dintre obstacolele cu care te confrunti,
            deoarece se mentine foarte greu. Ajutorul din partea unui antrenor
            personal iti poate creste motivatia.
          </p>
        </div>
        <div className="container-secundar2">
          <img src="trainer-bazat.png"></img>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PersonalTraining;
