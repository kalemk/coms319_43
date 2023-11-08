import React from 'react';
import { useState } from "react";
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));

function Header() {
  return (
  <section className="py-5 text-center container">
    <div className="row py-lg-5">
      <div className="col-lg-6 col-md-8 mx-auto">
        <h1 className="fw-light">Pet Peeve</h1>
        <p className="lead text-body-secondary">A pet store selling only animals you wouldn't want as a pet.</p>
        <p>
          {/* <a href="#" className="btn btn-primary my-2" onClick={changePage}>Next Page</a> */}
        </p>
      </div>
    </div>
  </section>
  );
}

function SearchBar() {

  function clickSearch() {
    console.log("search clicked");
    let val = document.getElementById("searchinput").value;
    window.searchFilter = val;
    console.log(val);

    // refresh the page
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <>
        <Content />
      </>
    );
  }

  return (
    <div className="input-group" style={{marginBottom:"10px", padding:"10px"}}>
      <input id="searchinput" type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
      <button type="button" className="btn btn-outline-primary" onClick={clickSearch}>search</button>
    </div>
  )
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
  if(window.searchFilter) {
    var data = window.data.filter(
      i=>(i.name.toLowerCase().replaceAll(' ', '').includes(window.searchFilter.toLowerCase().replaceAll(' ', '')))
    );
  } else{
    var data = window.data;
  }
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

function StorePage() {
  
  function changePageCart(){
    root.render(
      <>
        <CartPage />
      </>
    )
  }

  return (
  <main>
    <Header />
    <div className="album py-5 bg-body-tertiary">
      <div className="container">
      <SearchBar/>
      <a href="#" className="btn btn-primary my-2" onClick={changePageCart}>Cart/Checkout</a>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <CardList />
        </div>
      </div>
    </div>
  </main>
  );
}

function CartPage(){
  function changePageStore(){
    root.render(
      <>
        <StorePage />
      </>
    )
  }

  function changePageConfirm(){
    root.render(
      <>
        <ConfirmPage />
      </>
    )
  }
  return (
    <main>
    <Header />
    <a href="#" className="btn btn-primary my-2" onClick={changePageStore}>Back to Store</a>
    <a href="#" className="btn btn-primary my-2" onClick={changePageConfirm}>Place Order</a>
    <div>Cart</div>
    </main>
  );
}

function ConfirmPage(){
  function changePageStore(){
    root.render(
      <>
        <StorePage />
      </>
    )
  }
  return (
    <main>
    <Header />
    <a href="#" className="btn btn-primary my-2" onClick={changePageStore}>Back to Store</a>
    <div>Confirm</div>
    </main>
  );
}

function tryLoadData() {
  fetch('/data/data.json').then(res => res.json()).then(data => 
  {
      console.log("loaded data");
      window.data = data;
      init();
  }).catch(err => 
  {
      window.alert("there was an error when loading the shop data");
      console.log(err);
  });
}

function init() {
  root.render(
    <>
      <StorePage />
    </>
  );
}

tryLoadData();