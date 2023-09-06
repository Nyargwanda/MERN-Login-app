import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function EditCustomer(props) {
    const containerStyle = {
        padding: '30px 20px',
        height: '500px',
        width: '500px',
        margin: '20px auto',
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
    };

    const headerStyle = { margin: '0', fontWeight: '800' };
    const inputStyle = { marginTop: '15px', width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' };
    const buttonStyle = {
        marginTop: '15px',
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    };

    const [customer, setCustomer] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/customers/${id}`).then((response) => {
            setCustomer(response.data);
        });
    }, [id]);

    const updateCustomer = () => {
        axios
            .patch(`http://localhost:5000/customers/${id}`, customer)
            .then(() => {
                window.alert('Successfully Edited');
            })
            .catch((error) => {
                console.error('Error updating customer:', error);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });
    };

    return (
        <div style={containerStyle}>
            <div style={{ textAlign: 'center' }}>
                <h2 style={headerStyle}>Update Customer Details</h2>
                <p>Edit the details below.</p>
            </div>
            <form>
                <input
                    style={inputStyle}
                    type="text"
                    id="name"
                    name="name"
                    value={customer.name || ''}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                />
                <input
                    style={inputStyle}
                    type="text"
                    id="email"
                    name="email"
                    value={customer.email || ''}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                />
                <input
                    style={inputStyle}
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={customer.phoneNumber || ''}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                />
                <input
                    style={inputStyle}
                    type="text"
                    id="location"
                    name="location"
                    value={customer.location || ''}
                    onChange={handleInputChange}
                    placeholder="Enter your location"
                />
                <input
                    style={inputStyle}
                    type="text"
                    id="subscribedToPackage"
                    name="subscribedToPackage"
                    value={customer.subscribedToPackage || ''}
                    onChange={handleInputChange}
                    placeholder="Enter subscription package"
                />
                <button
                    type="button"
                    style={buttonStyle}
                    onClick={updateCustomer}
                >
                    Update
                </button>
            </form>
        </div>
    );
}
