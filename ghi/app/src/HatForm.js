import React, { useEffect, useState } from 'react'

export default function HatForm() {
    const [locations, setLocations] = useState([]);
    const [fabric, setFabric] = useState("");
    const [styleName, setStyleName] = useState("");
    const [color, setColor] = useState("");
    const [pictureUrl, setPictureUrl] = useState("");
    const [location, setLocation] = useState("");

    const handleFabricChange = (event) => {
        setFabric(event.target.value);
    }

    const handleStyleNameChange = (event) => {
        setStyleName(event.target.value);
    }

    const handleColorChange = (event) => {
        setColor(event.target.value);
    }

    const handlePictureUrlChange = (event) => {
        setPictureUrl(event.target.value);
    }

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    }

    const fetchData = async () => {
        const url = "http://localhost:8090/api/locations/";

        try {
            const response = await fetch(url)
            if (response.ok) {
                const data = await response.json();
                setLocations(data.locations)
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
            fabric,
            style_name: styleName,
            color,
            picture_url: pictureUrl,
            location,
        };

        const url = "http://localhost:8090/api/hats/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        }

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            const newHat = await response.json();
            setFabric("");
            setStyleName("");
            setColor("");
            setPictureUrl("");
            setLocation("");
        }
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4 rounded-3">
                    <h1 className="text-center mb-3">Add a new hat</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input value={fabric} onChange={handleFabricChange} placeholder="Fabric" required type="text" name="fabric" id="fabric"
                                className="form-control" />
                            <label htmlFor="fabric">Fabric</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={styleName} onChange={handleStyleNameChange} placeholder="Style name" required type="text" name="style_name" id="style_name"
                                className="form-control" />
                            <label htmlFor="style_name">Style name</label>
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
                            <select value={location} onChange={handleLocationChange} required name="location" id="location" className="form-select">
                                <option value="">Choose a location</option>
                                {locations.map(location => {
                                    return (
                                        <option key={location.href} value={location.href}>
                                            {`${location.closet_name} Location #${location.location_number}`}
                                        </option>
                                    );
                                })}
                            </select>
                            <label htmlFor="location">Location</label>
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
