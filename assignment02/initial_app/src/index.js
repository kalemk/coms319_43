import React from 'react';
import { useState } from "react";
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
let cartList = JSON.parse(localStorage.getItem("cartList")) || {};

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
    root.render(
      <>
        <StorePage />
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

  const [count, setCount] = useState(cartList[id] || 0);

  function incClick () {
    console.log("inc clicked");
    let c = (~~count)+1;
    setCount(c);
    cartList[id] = c;
    localStorage.setItem("cartList", JSON.stringify(cartList));
  }

  function decClick () {
    console.log("dec clicked");
    let c = (~~count)-1;
    if (c >= 0) {
      setCount(c);
      cartList[id] = c;
      localStorage.setItem("cartList", JSON.stringify(cartList));
    }
  }

  return (
  <div className="col">
    <div className="card shadow-sm">
      <h3 className="card-header">{name}</h3>
      <img src={src} alt="shop image" style={{margin: "5px"}} />
      <div className="card-body">
        <span className="card-price" style={{border: '4px solid rgb(60 175 60)', color: 'white', backgroundColor: "rgb(100 193 125)", borderRadius:"10px"}}>${price}.00</span>
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
      <button href="#" className="btn btn-primary my-2" onClick={changePageCart}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </svg>
        <span> Checkout</span>
      </button>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <CardList />
        </div>
      </div>
    </div>
  </main>
  );
}

function CartCard({src, name, price, quantity}) {
  return (
    <div className="card mb-3">
    <div className="card-body">
      <div className="d-flex justify-content-between">
        <div className="d-flex flex-row align-items-center">
          <div style={{width:"60%"}}>
            <img
              src={src}
              className="img-fluid rounded-3" alt="Shopping item"/>
          </div>
          <div className="ms-3">
            <h5>{name}</h5>
            <div style={{border: '3px solid rgb(72 191 255)', textAlign:"center", padding:"3px", color: 'white', backgroundColor: "rgb(95 200 247)", borderRadius:"10px", fontWeight:"800"}}>
              <span className="small mb-0">Quantity: {quantity}</span>
            </div>
          </div>
        </div>
        <div className="d-flex flex-row align-items-center">
          <div style={{width: "80px;"}}>
            <h5 className="mb-0">${price}</h5>
          </div>
          <a href="#!" style={{color: "#cecece;"}}><i className="fas fa-trash-alt"></i></a>
        </div>
      </div>
    </div>
  </div>
  )
}


function CartPage(){

  let data = window.data.filter(i=>(cartList[i.id] > 0));

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
    <section className="h-100 h-custom" style={{backgroundColor: "#eee;"}}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div className="card">
              <div className="card-body p-4">

                <div className="row">

                  <div className="col-lg-7">
                    <button className="btn btn-primary my-2" onClick={changePageStore}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                      </svg>
                      <span> Back to Store</span>
                    </button>

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <h3 className="mb-1">Shopping cart</h3>
                        <p className="mb-0">You have {data.length} items in your cart</p>
                      </div>
                    </div>

                    {
                    data.map(i=>(
                      <CartCard key={i.id+"_checkout"} src={i.src} name={i.name} price={i.price} quantity={cartList[i.id]}/>
                    ))
                    }


                  </div>
                  <div className="col-lg-5">

                    <div className="card bg-info bg-gradient text-white rounded-3">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <h5 className="mb-0">Card details</h5>
                          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-credit-card" viewBox="0 0 16 16">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z"/>
                            <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z"/>
                          </svg>
                        </div>


                        <form className="mt-4">
                          <div className="form-outline form-white mb-4">
                            <input type="text" id="typeName" className="form-control form-control-lg" siez="17"
                              placeholder="Cardholder's Name" />
                            <label className="form-label" for="typeName">Full Name</label>
                          </div>

                          <div className="form-outline form-white mb-4">
                            <input type="text" id="typeEmail" className="form-control form-control-lg" siez="17"
                              placeholder="your@email.com"/>
                            <label className="form-label" for="typeEmail">Email</label>
                          </div>

                          <hr className="my-4"/>

                          <div className="row mb-4">
                            <div className="col-md-6">
                              <div className="form-outline form-white">
                                <input type="text" id="typeState" className="form-control form-control-lg"
                                  placeholder="Your State" size="7" maxlength="15" />
                                <label className="form-label" for="typeState">State</label>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-outline form-white">
                                <input type="password" id="typeAdr" className="form-control form-control-lg"
                                  placeholder="Your Adress" size="1" />
                                <label className="form-label" for="typeAdr">Address</label>
                              </div>
                            </div>
                          </div>

                          <div className="row mb-4">
                            <div className="col-md-6">
                              <div className="form-outline form-white">
                                <input type="text" id="typeExp" className="form-control form-control-lg"
                                  placeholder="Your City" size="7"/>
                                <label className="form-label" for="typeExp">City</label>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-outline form-white">
                                <input type="password" id="typeText" className="form-control form-control-lg"
                                  placeholder="Your Zip" size="1" minlength="5" maxlength="5" />
                                <label className="form-label" for="typeText">Zip Code</label>
                              </div>
                            </div>
                          </div>

                          <hr className="my-4"/>

                          <div className="form-outline form-white mb-4">
                            <input type="text" id="typeText" className="form-control form-control-lg" siez="17"
                              placeholder="1234 5678 9012 3457" minlength="19" maxlength="19" />
                            <label className="form-label" for="typeText">Card Number</label>
                          </div>

                        </form>

                        <hr className="my-4"/>

                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Subtotal</p>
                          <p className="mb-2">$4798.00</p>
                        </div>

                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Shipping</p>
                          <p className="mb-2">$20.00</p>
                        </div>

                        <div className="d-flex justify-content-between mb-4">
                          <p className="mb-2">Total(Incl. taxes)</p>
                          <p className="mb-2">$4818.00</p>
                        </div>

                        <button type="button" className="btn btn-outline-light btn-block btn-lg" onClick={changePageConfirm}>
                          <div className="d-flex justify-content-between">
                            <span>${4818}.00 Confirm</span>
                          </div>
                        </button>

                      </div>
                    </div>

                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>





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