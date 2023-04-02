import React, { useEffect, useState } from 'react'

export default function DeleteButton(props) {
  const handleDelete = async (event) => {

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
  }

  return (
    <button
      onClick={handleDelete}
      className="btn"
    >
      <img src="https://img.icons8.com/arcade/35/null/delete-forever.png" />
    </button>
  )
}
