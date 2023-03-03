import React from 'react'
import { Navigate } from 'react-router-dom';

export default function DeleteButton(props) {
  return (
    <button
      onClick={async (event) => {
        const url = `http://localhost:8080${props.href}`;
        const fetchConfig = {
          method: 'delete',
          headers: {
            "Content-Type": "application/json",
          }
        }

        const response = await fetch(url, fetchConfig);
        try {
          if (!response.ok) {
            throw new Error("Something went wrong!");
          }
          window.location.reload();
        } catch (e) {
          console.log(e)
        }
      }}
      className="btn btn-warning btn-sm"
    >
      Delete
    </button>
  )
}
