import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../service/api';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers().then(data => setUsers(data));
    }, []);

    return (
        <h1>{users.data}</h1>
    );
};

export default UserList;