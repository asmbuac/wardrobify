import React from 'react';
import DeleteButton from './DeleteButton';

export default function ShoeTable(props) {
  return (
    <table className="table align-middle text-center">
      <thead>
        <tr>
          <th>Manufacturer</th>
          <th>Model Name</th>
          <th>Color</th>
          <th>Bin</th>
          <th>Picture</th>
          <th></th>
        </tr>
      </thead>
      <tbody className="table-group-divider">
        {props.shoes.map(shoe => {
          return (
            <tr key={shoe.href}>
              <td>{shoe.manufacturer}</td>
              <td>{shoe.model_name}</td>
              <td>{shoe.color}</td>
              <td>{shoe.bin.closet_name} #{shoe.bin.bin_number}</td>
              <td><img src={shoe.picture_url} style={{ width: "100px" }} /></td>
              <td>
                <DeleteButton url={`8080${shoe.href}`} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
