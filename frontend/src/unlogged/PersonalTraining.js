import React from "react";

const PersonalTraining = () => {
  return (
    <React.Fragment>
      <div className='container-pt-photo '>
        <div className='content'>
          <h1>Personal trainer</h1>
          <p>Ajutorul tau catre obtinerea rezultatelor optime</p>
        </div>
      </div>
      <div className='container-galben'>
        <div className='container-secundar1'>
          <h1>Motivatia</h1>
          <p className='center'>
            Motivatia poate fi unul dintre obstacolele cu care te confrunti,
            deoarece se mentine foarte greu. Ajutorul din partea unui antrenor
            personal iti poate creste motivatia.
          </p>
        </div>
        <div className='container-secundar2'>
          <img src='trainer-bazat.jpeg' alt='Trainer bazat'></img>
        </div>
      </div>
      <div className='container-principal__black'>
        <div className='container-secundar1'>
          <img src='personal-training.png' alt='Trainer bazat'></img>
        </div>
        <div className='container-secundar__white'>
          <h1 className='center'>Personal trainer</h1>
          <p className='center'>
            Un antrenor personal te poate ajuta catre definirea scopului in
            sport. Antrenorul personal, in functie de nivelul tau de fitness,
            planifica programul optim pentru tine.
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PersonalTraining;
