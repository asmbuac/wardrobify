import React from 'react'

export default function DeleteButton(props) {
  return (
    <button
      onClick={async (event) => {
        const url = `http://localhost:${props.url}`;
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
