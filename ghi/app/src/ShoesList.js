import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteButton from './DeleteButton';


function ShoeColumn(props) {
  return (
    <div className="col">
      {props.list.map(shoe => {
        return (
          <div key={shoe.id} className="card mb-3 shadow">
            <img src={shoe.picture_url} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{shoe.manufacturer}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {shoe.color} {shoe.model_name}
              </h6>
              <p className="card-text text-center">
                <DeleteButton url={`8080/api/shoes/${shoe.id}/`} />
              </p>
            </div>
            <div className="card-footer">
              {shoe.bin.closet_name} Bin #{shoe.bin.bin_number}
            </div>
          </div>
        );
      })}
    </div >
  );
}


export default function ShoesList() {
  const [shoeColumns, setShoeColumns] = useState([[], [], []]);

  const fetchData = async () => {
    const url = "http://localhost:8080/api/shoes/"

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        const requests = data.shoes.map(shoe => {
          return fetch(`http://localhost:8080${shoe.href}`);
        })

        const responses = await Promise.all(requests);
        const columns = [[], [], []];
        let i = 0

        for (const shoeResponse of responses) {
          if (shoeResponse.ok) {
            const details = await shoeResponse.json();
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
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
      <div className="px-4 py-5 my-5 mt-0 text-center bg-info-subtle">
        <h1 className="display-5 fw-bold mb-4">Shoes</h1>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <Link to="/shoes/new" className="btn btn-light btn px-4 gap-3">Add a new shoe</Link>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {shoeColumns.map((shoeList, index) => {
            return (
              <ShoeColumn key={index} list={shoeList} />
            );
          })}
        </div>
      </div>
    </>
  );
}
