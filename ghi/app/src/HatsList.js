import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteButton from './DeleteButton';


function HatColumn(props) {
    return (
        <div className="col">
            {props.list.map(hat => {
                return (
                    <div key={hat.id} className="card mb-3 shadow">
                        <img src={hat.picture_url} className="card-img-top" />
                        <div className="card-body">
                            <h5 className="card-title">{hat.style_name}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">
                                {hat.fabric} {hat.color}
                            </h6>
                            <p className="card-text text-center">
                                <DeleteButton url={`8090/api/hats/${hat.id}/`} />
                            </p>
                        </div>
                        <div className="card-footer">
                            <small className="text-muted">
                                {hat.location.closet_name} Closet Section #{hat.location.section_number} Shelf #{hat.location.shelf_number}
                            </small>
                        </div>
                    </div>
                );
            })}
        </div >
    );
}


export default function HatsList() {
    const [hatColumns, setHatColumns] = useState([[], [], []]);

    const fetchData = async () => {
        const url = "http://localhost:8090/api/hats/"

        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                const requests = data.hats.map(hat => {
                    return fetch(`http://localhost:8090/api/hats/${hat.id}`);
                })

                const responses = await Promise.all(requests);
                const columns = [[], [], []];
                let i = 0

                for (const hatResponse of responses) {
                    if (hatResponse.ok) {
                        const details = await hatResponse.json();
                        columns[i].push(details);
                        i++;
                        if (i > 2) {
                            i = 0;
                        }
                    } else {
                        console.error(hatResponse);
                    }
                }
                setHatColumns(columns)
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
                <h1 className="display-5 fw-bold mb-4">Hats</h1>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                    <Link to="/hats/new" className="btn btn-light btn px-4 gap-3">Add a new hat</Link>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    {hatColumns.map((hatList, index) => {
                        return (
                            <HatColumn key={index} list={hatList} />
                        );
                    })}
                </div>
            </div>
        </>
    );
}
