import React, { useState } from 'react';
import axios from 'axios';

const options = [
    {
        label: '5 Mbps',
        value: '5 Mbps',
    },
    {
        label: '10 Mbps',
        value: '10 Mbps',
    },
    {
        label: '20 Mbps',
        value: '20 Mbps',
    },
    {
        label: '40 Mbps',
        value: '40 Mbps',
    },
];

export default function CreateCustomer() {
    const containerStyle = {
        padding: '30px 20px',
        height: '500px',
        width: '500px',
        margin: '20px auto',
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
    };

    const headerStyle = { margin: '0', fontWeight: '800' };
    const inputStyle = { marginTop: '15px', width: '100%' };
    const buttonStyle = {
        marginTop: '15px',
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    };

    const [customer, setCustomer] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        location: '',
        subscribedToPackage: '',
    });

    const createCustomer = () => {
        axios.post('http://localhost:5000/customers', customer).then(() => {
            window.alert('Successfully Registered');
            window.location.reload(false);
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });
    };

    return (
        <div style={containerStyle}>
            <div style={{ textAlign: 'center' }}>
                <h2 style={headerStyle}>Customer Details</h2>
                <p>Please fill in the details below.</p>
            </div>
            <form>
                <input
                    style={inputStyle}
                    type="text"
                    id="name"
                    name="name"
                    value={customer.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    required
                />
                <input
                    style={inputStyle}
                    type="email"
                    id="email"
                    name="email"
                    value={customer.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    required
                />
                <input
                    style={inputStyle}
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={customer.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    required
                />
                <input
                    style={inputStyle}
                    type="text"
                    id="location"
                    name="location"
                    value={customer.location}
                    onChange={handleInputChange}
                    placeholder="Location (Apartment, City)"
                    required
                />
                <select
                    style={inputStyle}
                    id="subscription"
                    name="subscribedToPackage"
                    value={customer.subscribedToPackage}
                    onChange={handleInputChange}
                    required
                >
                    <option value="" disabled>
                        Subscription
                    </option>
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <button
                    type="button"
                    style={buttonStyle}
                    onClick={createCustomer}
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
