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
      "name": "Ch47",
      "src": "/img/ch47.png",
      "price": 100,
      "description": "a helicopter",
      "key": 1,
    },
    {
      "name": "Delorean",
      "src": "/img/car.png",
      "price": 100,
      "description": "car",
      "key": 2,
    },
    {
      "name": "Sail Boat",
      "src": "/img/sailboat.png",
      "price": 100,
      "description": "ship",
      "key": 3,
    },
    {
      "name": "Cargo Ship",
      "src": "/img/seawisegiant.png",
      "price": 100,
      "description": "ship 2",
      "key": 4,
    },
    {
      "name": "Space Shuttle",
      "src": "/img/spaceshuttle.png",
      "price": 100,
      "description": "ship",
      "key": 5,
    },
    {
      "name": "stardestroyer",
      "src": "/img/stardestroyer.png",
      "price": 100,
      "description": "ship",
      "key": 6,
    },
    {
      "name": "Submarine",
      "src": "/img/deepseachallenger.png",
      "price": 100,
      "description": "the deep sea challenger",
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