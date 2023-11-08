import React from 'react';
import { useState } from "react";
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

function Card({id, src, name, txt, price}) {

  const [count, setCount] = useState("0");

  function incClick () {
    console.log("inc clicked");
    let c = ~~count;
    setCount(c+1);
  }

  function decClick () {
    console.log("dec clicked");
    let c = ~~count;
    if (c > 0) {
      setCount(c-1);
    }
  }

  return (
  <div className="col">
    <div className="card shadow-sm">
      <h3 className="card-header">{name}</h3>
      <img src={src} alt="shop image" />
      <div className="card-body">
        <span className="card-price" style={{border: '5px solid rgba(0, 100, 0, 1)', color: 'white', backgroundColor: 'green'}}>${price}.00</span>
        <p className="card-text">{txt}</p>
        <div className="d-flex justify-content-between align-items-center">
          <div className="btn-group">

            <div className="d-flex justify-content-center">
                <div className="input-group w-auto">
                    <input readOnly type="text" value={count} className="form-control" aria-label="Example input" aria-describedby="button-addon1"/>
                    <button className="btn btn-outline-success" type="button" id="button-addon1" data-mdb-ripple-color="dark" onClick={incClick}>+</button>
                    <button className="btn btn-outline-secondary" type="button" id="button-addon1" data-mdb-ripple-color="dark" onClick={decClick}>-</button>
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
      "id": "card1",
    },
    {
      "name": "elephant",
      "src": "/img/africanelephant.png",
      "price": 100,
      "description": "from africa",
      "key": 2,
      "id": "card2",
    },
    {
      "name": "Blue Whale",
      "src": "/img/bluewhale.png",
      "price": 100,
      "description": "whale",
      "key": 3,
      "id": "card3",
    },
    {
      "name": "Sperm Whale",
      "src": "/img/spermwhale.png",
      "price": 100,
      "description": "another whale",
      "key": 4,
      "id": "card4",
    },
    {
      "name": "tyranosaurus rex",
      "src": "/img/trex.png",
      "price": 100,
      "description": "carnivore",
      "key": 5,
      "id": "card5",
    },
    {
      "name": "Mosasaurus",
      "src": "/img/mosasaurus.png",
      "price": 100,
      "description": "like a lizard",
      "key": 6,
      "id": "card6",
    },
    {
      "name": "Argentinosaurus",
      "src": "/img/argentinosaurus.png",
      "price": 100,
      "description": "It is a dinosaur",
      "key": 7,
      "id": "card7",
    },
  ]

  return (
    <>
      {
        data.map(i=>(
          <Card key={i.key} src={i.src} name={i.name} txt={i.description} price={i.price} id={i.id}/>
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