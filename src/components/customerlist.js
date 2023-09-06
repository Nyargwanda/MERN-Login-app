import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

export default function CustomerList() {
    const [customerList, setCustomerList] = useState([]);
    
    const deleteCustomer = (id) => {
        axios.delete(`http://localhost:5000/customers/${id}`).then(() => {
            window.location.reload(false);
        });
    }

    useEffect(() => {
        axios.get("http://localhost:5000/customers").then((response) => {
            setCustomerList(response.data);
        });
    }, []);

    return (
        <div>
            <h1 style={{ margin: "20px 0 20px 50px" }}>All Customers</h1>
            <table>
                <thead>
                    <tr>
                        <th align="center">Name</th>
                        <th align="center">Email</th>
                        <th align="center">Phone Number</th>
                        <th align="center">Location</th>
                        <th align="center">Subscription Package</th>
                        <th align="center" colSpan={2}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {customerList.map((customer) => (
                        <tr key={customer._id}>
                            <td align="center">{customer.name}</td>
                            <td align="center">{customer.email}</td>
                            <td align="center">{customer.phoneNumber}</td>
                            <td align="center">{customer.location}</td>
                            <td align="center">{customer.subscribedToPackage}</td>
                            <td align="center">
                                <Link to={`/edit/${customer._id}`} style={{ color: "blue", cursor: "pointer" }}>Edit</Link>
                            </td>
                            <td align="center" style={{ color: "blue", cursor: "pointer" }} onClick={() => deleteCustomer(customer._id)}>Delete</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
