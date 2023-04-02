import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import ShoeColumn from './ShoeColumn';
import ShoeTable from './ShoeTable';
// import ShoeFilter from './ShoeFilter';

export default function ShoesList(props) {
  const [shoes, setShoes] = useState(props.shoes)
  const [shoeColumns, setShoeColumns] = useState([[], [], []]);
  const [shoeList, setShoeList] = useState([]);
  const [showColumns, setShowColumns] = useState(true);
  const [showList, setShowList] = useState(false);

  const manufacturers = [...new Set(shoes.map((shoe) => shoe.manufacturer))];

  const filterItem = (event) => {
    const newItem = shoes.filter((newValue) => {
      return newValue.manufacturer === event.target.value;
    });
    setShoes(newItem);
    console.log(shoes)
  }

  const handleShowColumns = (event) => {
    setShowColumns(true);
    setShowList(false);
  }

  const handleShowList = (event) => {
    setShowColumns(false);
    setShowList(true);
  }

  const handleShowForm = (event) => {
    setShowColumns(false);
    setShowList(false);
  }

  const fetchData = async () => {
    const requests = shoes.map(shoe => {
      return fetch(`http://localhost:8080${shoe.href}`);
    })

    const responses = await Promise.all(requests);
    const list = [];
    const columns = [[], [], []];
    let i = 0

    for (const shoeResponse of responses) {
      if (shoeResponse.ok) {
        const details = await shoeResponse.json();
        list.push(details)
        columns[i].push(details);
        i++;
        if (i > 2) {
          i = 0;
        }
      } else {
        console.error(shoeResponse);
      }
    }
    setShoeColumns(columns)
    setShoeList(list)
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
      <div className="px-4 py-5 my-5 mt-0 text-center bg-info-subtle">
        <h1 className="display-5 fw-bold mb-4">Shoes</h1>
      </div>
      <div className="container">
        <div className="d-flex gap-1 justify-content-between mb-4">
          <div>
            <div className="dropdown">
              <select onChange={(event) => filterItem()} className="form-select" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <option>Filter By Manufacturer</option>
                {manufacturers.map((manufacturer) => {
                  return (
                    <option
                      key={manufacturer}
                    >
                      {manufacturer}
                    </option>
                  )
                })}
                <option
                  onClick={() => setShoes(shoes)}
                  to="#"
                  className="dropdown-item">
                  All
                </option>
              </select>
            </div>
          </div>
          <div>
            <Link to="/shoes" onClick={handleShowColumns} style={{ cursor: "pointer" }}>
              <img src="https://img.icons8.com/arcade/35/null/categorize.png" />
            </Link>
            <Link to="/shoes" onClick={handleShowList} style={{ cursor: "pointer" }}>
              <img src="https://img.icons8.com/arcade/35/null/content.png" />
            </Link>
            <Link to="/shoes/new" onClick={handleShowForm}>
              <img src="https://img.icons8.com/arcade/35/null/add.png" />
            </Link>
          </div>
        </div>
        {showColumns ?
          <div className="row">
            {shoeColumns.map((shoeColumn, index) => {
              return (
                <ShoeColumn key={index} shoes={shoeColumn} />
              );
            })}
          </div>
          : null}
        {showList ?
          <div>
            <ShoeTable shoes={shoeList} />
          </div>
          : null}
      </div>
      <Outlet />
    </>
  );
}
