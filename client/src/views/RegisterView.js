import React, { useState } from 'react';


let EMPTY_FORM = {
    username: "",
    email: "",
    password: ""
}

function RegisterView(props) {
    const [newUser, setNewUser] = useState(EMPTY_FORM);
   
    

    function handleChange(event) {
        let {name, value} = event.target;
        setNewUser(newUser => ({
        ...newUser, [name]:value
        
    }))
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.registerCb(newUser);
        setNewUser(EMPTY_FORM);
    }

  

    return (
        <div className="RegisterView row">
            <div className="col-4 offset-4">
                <h2>Register</h2>
                

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username
                            <input
                                type="text"
                                name="username"
                                required
                                className="form-control"
                                value={newUser.username}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>Email
                            <input
                                type="text"
                                name="email"
                                required
                                className="form-control"
                                value={newUser.email}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <div className="form-group">
                        <label>Password
                            <input
                                type="password"
                                name="password"
                                required
                                className="form-control"
                                value={newUser.password}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <button type="submit" className="btn btn-success">Submit</button>
                </form>
            </div>
        </div>
    );

}

export default RegisterView;