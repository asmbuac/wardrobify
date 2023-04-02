import React from 'react';
import DeleteButton from './DeleteButton';

export default function ShoeColumn(props) {
  return (
    <div className="col">
      {props.shoes.map(shoe => {
        return (
          <div key={shoe.id} className="card mb-4 shadow">
            <span className="position-absolute top-0 start-0 translate-middle p-2">
              <DeleteButton url={`8080${shoe.href}`} />
              <span className="visually-hidden">Delete</span>
            </span>
            <img src={shoe.picture_url} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{shoe.manufacturer}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {shoe.color} {shoe.model_name}
              </h6>
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
