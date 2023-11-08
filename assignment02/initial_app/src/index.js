import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

function Header() {
  return (
  <section className="py-5 text-center container">
    <div className="row py-lg-5">
      <div className="col-lg-6 col-md-8 mx-auto">
        <h1 className="fw-light">Some sort of title--yeah</h1>
        <p className="lead text-body-secondary">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.</p>
        <p>
          <a href="#" className="btn btn-primary my-2">Main call to action</a>
          <a href="#" className="btn btn-secondary my-2">Secondary action</a>
        </p>
      </div>
    </div>
  </section>
  );
}

function Card() {
  return (
  <div className="col">
    <div className="card shadow-sm">
      <img src="img/ch47.png" alt="shop image" />
      <div className="card-body">
        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <div className="d-flex justify-content-between align-items-center">
          <div className="btn-group">

            <div className="d-flex justify-content-center">
                <div className="input-group w-auto">
                    <input readOnly type="text" value="0" className="form-control" aria-label="Example input" aria-describedby="button-addon1"/>
                    <button className="btn btn-outline-success" type="button" id="button-addon1" data-mdb-ripple-color="dark">+</button>
                    <button className="btn btn-outline-secondary" type="button" id="button-addon1" data-mdb-ripple-color="dark">-</button>
                </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

function CardList() {
  return (
  <main>
    <Header />
    <div className="album py-5 bg-body-tertiary">
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <Card />
          <Card />
          <Card />

          <Card />
          <Card />
          <Card />

          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  </main>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CardList />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
