import React, { useEffect, useState } from 'react'

export default function ShoeForm() {
  const [bins, setBins] = useState([]);
  const [manufacturer, setManufacturer] = useState("");
  const [modelName, setModelName] = useState("");
  const [color, setColor] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [bin, setBin] = useState("");

  const handleManufacturerChange = (event) => {
    setManufacturer(event.target.value);
  }

  const handleModelNameChange = (event) => {
    setModelName(event.target.value);
  }

  const handleColorChange = (event) => {
    setColor(event.target.value);
  }

  const handlePictureUrlChange = (event) => {
    setPictureUrl(event.target.value);
  }

  const handleBinChange = (event) => {
    setBin(event.target.value);
  }

  const fetchData = async () => {
    const url = "http://localhost:8100/api/bins/";

    try {
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json();
        setBins(data.bins)
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      manufacturer,
      model_name: modelName,
      color,
      picture_url: pictureUrl,
      bin,
    };

    const url = "http://localhost:8080/api/shoes/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      }
    }

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const newShoe = await response.json();
      setManufacturer("");
      setModelName("");
      setColor("");
      setPictureUrl("");
      setBin("");
    }
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4 rounded-3">
          <h1 className="text-center mb-3">Add a new shoe</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input value={manufacturer} onChange={handleManufacturerChange} placeholder="Manufacturer" required type="text" name="manufacturer" id="manufacturer"
                className="form-control" />
              <label htmlFor="manufacturer">Manufacturer</label>
            </div>
            <div className="form-floating mb-3">
              <input value={modelName} onChange={handleModelNameChange} placeholder="Model name" required type="text" name="model_name" id="model_name"
                className="form-control" />
              <label htmlFor="model_name">Model name</label>
            </div>
            <div className="form-floating mb-3">
              <input value={color} onChange={handleColorChange} placeholder="Color" type="text" name="color" id="color"
                className="form-control" />
              <label htmlFor="color">Color</label>
            </div>
            <div className="form-floating mb-3">
              <input value={pictureUrl} onChange={handlePictureUrlChange} placeholder="Picture URL" required type="url" name="picture_url" id="picture_url" className="form-control" />
              <label htmlFor="picture_url">Picture URL</label>
            </div>
            <div className="form-floating mb-3">
              <select value={bin} onChange={handleBinChange} required name="bin" id="bin" className="form-select">
                <option value="">Choose a bin</option>
                {bins.map(bin => {
                  return (
                    <option key={bin.href} value={bin.href}>
                      {`${bin.closet_name} Bin #${bin.bin_number}`}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="bin">Bin</label>
            </div>
            <div className="text-end">
              <button className="btn btn-info">Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
