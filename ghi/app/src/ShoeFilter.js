import React from 'react';
import { Link } from 'react-router-dom';

export default function ShoeFilter({ filterItem, setShoes, manufacturers, shoes }) {
  return (
    <>
      <div className="dropdown">
        <button className="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Filter By Manufacturer
        </button>
        <ul className="dropdown-menu">
          {manufacturers.map((manufacturer, index) => {
            return (
              <li>
                <Link onClick={() => filterItem(manufacturer)}
                  key={index}
                  to="#"
                  className="dropdown-item">{manufacturer}</Link>
              </li>
            )
          })}
          <li>
            <Link
              onClick={() => setShoes(shoes)}
              to="#"
              className="dropdown-item">
              All
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}
