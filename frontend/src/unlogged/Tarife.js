import React from "react";
import "./style.css";

const Tarife = () => {
  return (
    <React.Fragment>
      <h2 className='center tarife-main'>Tarife</h2>
      <div className='container'>
        <div className='grid-wrapper'>
          <div className='center text-in-box-column'>Tip abonament</div>
          <div className='center text-in-box-column'>Beneficii</div>
          <div className='center text-in-box-column'>Pret</div>
          <div className='center text-in-box-under-column'>Bronze</div>
          <div className='center text-in-box-under-column'>
            Ofera accesul in sala de forta si la sauna
          </div>
          <div className='center text-in-box-under-column'>150 RON/LUNA</div>
          <div className='center text-in-box-under-column'>Silver</div>
          <div className='center text-in-box-under-column'>
            Beneficii Bronze + acces la piscina
          </div>
          <div className='center text-in-box-under-column'>175 RON/LUNA</div>
          <div className='center text-in-box-under-column'>Gold</div>
          <div className='center text-in-box-under-column'>
            Beneficii Silver + acces la diversele clase de fitness
          </div>
          <div className='center text-in-box-under-column'>200 RON/LUNA</div>
          <div className='center text-in-box-under-column'>Platinum</div>
          <div className='center text-in-box-under-column'>
            Beneficii Gold + antrenor personal
          </div>
          <div className='center text-in-box-under-column'>250 RON/LUNA</div>
        </div>
      </div>
      <div className='container'>
        <div className='grid-wrapper-sedinta'>
          <div className='center text-in-box-column-sedinta'>Sedinte</div>
          <div className='center text-in-box-column-sedinta'>Pret</div>
          <div className='center text-in-box-under-column'>One day pass</div>
          <div className='center text-in-box-under-column'>30 RON</div>
          <div className='center text-in-box-under-column'>
            Personal trainer
          </div>
          <div className='center text-in-box-under-column'>50 RON</div>
        </div>
      </div>
      <h2 className='center preturi-promotionale'>Preturi promotionale</h2>
      <div className='container'>
        <div className='grid-wrapper-oferta'>
          <div className='center text-in-box-column'>Abonament</div>
          <div className='center text-in-box-column'>Extra beneficii</div>
          <div className='center text-in-box-column'>Pret</div>
          <div className='center text-in-box-under-column'>Gold - 1 luna</div>
          <div className='center text-in-box-under-column'>
            1 Invitatie pentru un prieten
          </div>
          <div className='center text-in-box-under-column'>225 RON</div>
          <div className='center text-in-box-under-column'>
            Platinum - 1 luna
          </div>
          <div className='center text-in-box-under-column'>
            1 Invitatie pentru un prieten
          </div>
          <div className='center text-in-box-under-column'>300 RON</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Tarife;
