import axios from "axios";

/**
 * ACTION TYPES
 */
const LOAD_BEERS = "LOAD_BEERS";
const ADMIN_ADD_BEER = "ADMIN_ADD_BEER";
/**
 * ACTION CREATORS
 */

const _fetchBeers = (beers) => ({ type: LOAD_BEERS, beers });

/**
 * THUNK CREATORS
 */

export const fetchBeers = () => {
  return async (dispatch) => {
    const beers = (await axios.get("/api/beers")).data;
    dispatch(_fetchBeers(beers));
  };
};

export const adminAddBeer = (_beer) => {
  return async (dispatch) => {
    const beer = (
      await axios.post("/api/beers", _beer, {
        headers: {
          authorization: window.localStorage.getItem("token"),
        },
      })
    ).data;
    dispatch({ type: ADMIN_ADD_BEER, beer });
  };
};

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case LOAD_BEERS:
      return action.beers;
    case ADMIN_ADD_BEER:
      return [...state, action.beer];
    default:
      return state;
  }
}
