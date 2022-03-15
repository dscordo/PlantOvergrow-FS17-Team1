import React, { useEffect, useState } from 'react';
import AuthApi from '../helpers/AuthApi';


function MyPlantsView(props) {
    const [memberMsg, setMemberMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        fetchMemberMsg();
    }, []);

    async function fetchMemberMsg() {
        // Get "Members Only" message for authenticated users
        let response = await AuthApi.getContent('/plantinfo');
        if (response.ok) {
            setMemberMsg(response.data.message);
            setErrorMsg('');
        } else {
            setMemberMsg('');
            setErrorMsg(response.error);
        }
    }

    if (errorMsg) {
        return <h2 style={{ color: 'red' }}>{errorMsg}</h2>
    }

    if (!memberMsg) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="MyPlants">
            <h1>My Plants</h1>
            <p>{memberMsg}</p>
        </div>
    );
}

export default MyPlantsView;