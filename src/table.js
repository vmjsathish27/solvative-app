import React from 'react'

function Table({data}) {
    return (
        <div>
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">city</th>
                    <th scope="col">country</th>                    
                    <th scope="col">Country Code</th>
                    <th scope="col">Region Code</th>
                    </tr>
                </thead>
                <tbody>
                    {data && Array.isArray(data) && data.length > 0 && data.map((item, index)=>{
                        return(
                            <tr key={index}>
                                <th scope="row">{index}</th>
                                <td>{item.name}</td>
                                <td>{item.city}</td>
                                <td>{item.country}</td>                                
                                <td>{item.countryCode}</td>
                                <td>{item.regionCode}</td>
                            </tr> 
                        )
                      
                    })}
                    {data.length < 1 && <h1>No data founds...</h1>}
                </tbody>
            </table>
        </div>
    )
}

export default Table
