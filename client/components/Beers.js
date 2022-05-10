import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Beers = ({ beers, match, history }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div style={{ marginLeft: "270px", marginTop: "100px" }}>
        <span
          style={{
            textDecoration: "underline",
          }}
        >
          <Link to="/">Home</Link>
        </span>{" "}
        /{" "}
        <span
          style={{
            textDecoration: "underline",
          }}
        >
          <Link to="/beer">Beers</Link>
        </span>
      </div>
      <div style={{ marginBottom: "60px" }}>
        <h1 className="H1Background">BEER</h1>
        <section class="containercontainer">
          <p style={{ marginLeft: "-100px" }}>Sort by</p>

          <div class="dropdowndropdown">
            <select
              name="one"
              class="dropdown-select"
              value={match.params.sort}
              onChange={(ev) => history.push(`/beer?sort=${ev.target.value}`)}
            >
              <option value="name,asc"> A-Z</option>
              <option value="name,desc">Z-A</option>
              <option value="price,asc">Price low to high</option>
              <option value="price,desc">Price high to low</option>
            </select>
          </div>
        </section>
      </div>
      <section className="author-archive">
        <div className="container">
          <ol className="posts">
            {beers.map((beer) => (
              <div key={beer.id}>
                <Link to={`/beers/${beer.id}`}>
                  <div className="container">
                    <div className="card-2 card-div">
                      <div className="sekiro-img-div img-div">
                        <img src={`./images/${beer.imgURL}`} alt="" />
                      </div>
                      <div className="text-container">
                        <h2 className="item-name">
                          <Link to={`/beers/${beer.id}`}>{beer.name}</Link>
                        </h2>
                        <p className="date1">{beer.type} </p>
                        <div className="pricing-and-cart1">
                          <div className="pricing1">
                            <p className="current-price1">${beer.price}</p>
                          </div>
                          <i className="fas fa-shopping-cart1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = (state, { location, match }) => {
  const { beers } = state;

  console.log(match.params);

  const searchParams = new URLSearchParams(location.search); // ?sort=name,asc
  const sort = searchParams.get("sort");

  if (sort === "name,asc") {
    console.log("sort by name asc");
    beers.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === "name,desc") {
    beers.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sort === "price,asc") {
    beers.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  } else if (sort === "price,desc") {
    beers.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  }
  return {
    beers,
  };
};

export default connect(mapStateToProps)(Beers);
