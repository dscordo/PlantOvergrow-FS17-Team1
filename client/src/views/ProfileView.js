import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Api from '../helpers/Api';


function ProfileView(props) {
    const [user, setUser] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    let { userId } = useParams();

    useEffect(() => {
        fetchProfile();
    }, []);

    async function fetchProfile() {
        let response = await Api.getUser(userId);
        if (response.ok) {
            setUser(response.data);
            setErrorMsg('');
        } else {
            setUser(null);
            setErrorMsg(response.error);
        }
    }

    if (errorMsg) {
        return <h2 style={{ color: 'red' }}>{errorMsg}</h2>
    }

    if (!user) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="ProfileView">
            <h1>Profile View</h1>
            ID: {user.id}<br />
            Username: {user.username}<br />
            Email: {user.email}
        </div>
    );
}


export default ProfileView;