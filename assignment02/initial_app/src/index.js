import React from 'react';
import ReactDOM from 'react-dom/client';

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

function Card({src, name, txt, price}) {
  return (
  <div className="col">
    <div className="card shadow-sm">
      <h3 className="card-header">{name}</h3>
      <img src={src} alt="shop image" />
      <div className="card-body">
        <span className="card-price">${price}.00</span>
        <p className="card-text">{txt}</p>
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
  console.log("card list called");

  let data = [
    {
      "name": "Lion",
      "src": "/img/lion.png",
      "price": 100,
      "description": "a cat",
      "key": 1,
    },
    {
      "name": "elephant",
      "src": "/img/africanelephant.png",
      "price": 100,
      "description": "from africa",
      "key": 2,
    },
    {
      "name": "Blue Whale",
      "src": "/img/bluewhale.png",
      "price": 100,
      "description": "whale",
      "key": 3,
    },
    {
      "name": "Sperm Whale",
      "src": "/img/spermwhale.png",
      "price": 100,
      "description": "another whale",
      "key": 4,
    },
    {
      "name": "tyranosaurus rex",
      "src": "/img/trex.png",
      "price": 100,
      "description": "carnivore",
      "key": 5,
    },
    {
      "name": "Mosasaurus",
      "src": "/img/mosasaurus.png",
      "price": 100,
      "description": "like a lizard",
      "key": 6,
    },
    {
      "name": "Argentinosaurus",
      "src": "/img/argentinosaurus.png",
      "price": 100,
      "description": "It is a dinosaur",
      "key": 7,
    },
  ]

  return (
    <>
      {
        data.map(i=>(
          <Card key={i.key} src={i.src} name={i.name} txt={i.description} price={i.price}/>
        ))
      }
    </>
  );
}

function Content() {
  return (
  <main>
    <Header />
    <div className="album py-5 bg-body-tertiary">
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <CardList />
        </div>
      </div>
    </div>
  </main>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Content />
  </>
);