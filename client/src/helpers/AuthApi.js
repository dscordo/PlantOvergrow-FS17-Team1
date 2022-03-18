import Local from './Local';


/**
 * This is a (not very DRY) helper class that places all "knowledge" of doing a fetch()
 * in one place. Any component that needs to do a fetch() will import this class and
 * call the corresponding method.
 **/


class AuthApi {

    /**
     * Log in a user
     **/
    
    static async loginUser(username, password) {
        // Prepare URL and options
        let url = '/login';
        let body = { username, password };
        let options = { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };

        // Fetch!
        let response;
        try {
            response = await fetch(url, options);
            if (response.ok) {
                response.data = await response.json();
            } else {
                response.error = `Error ${response.status}: ${response.statusText}`;
            }
        } catch (err) {
            response = { ok: false, error: err.message };
        }

        return response;
    }

    /**
     * register a user
     **/
    static async registerUser(newUser) {
        // Prepare URL and options
        let url = '/register';
      
        let options = { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        };

        // Fetch!
        let response;
        try {
            response = await fetch(url, options);
            if (response.ok) {
                response.data = await response.json();
            } else {
                response.error = `Error ${response.status}: ${response.statusText}`;
            }
        } catch (err) {
            response = { ok: false, error: err.message };
        }

        return response;
    }

    /**
     * Get all users 
     **/

    static async getUsers() {
        // Prepare URL and options
        let url = '/users';
        let options = { method: 'GET' };

        // Fetch!
        let response;
        try {
            response = await fetch(url, options);
            if (response.ok) {
                response.data = await response.json();
            } else {
                response.error = `Error ${response.status}: ${response.statusText}`;
            }
        } catch (err) {
            response = { ok: false, error: err.message };
        }

        return response;
    }

    /**
     * Get data for user with ID 'userId'
     **/

    static async getUser(userId) {
        // Prepare URL and options
        let url = `/users/${userId}`;
        let options = { method: 'GET', headers: {} };

        // Add JWT token (if it exists)
        let token = Local.getToken();
        if (token) {
            options.headers['Authorization'] = 'Bearer ' + token;
        }

        // Fetch!
        let response;
        try {
            response = await fetch(url, options);
            if (response.ok) {
                response.data = await response.json();
            } else {
                response.error = `Error ${response.status}: ${response.statusText}`;
            }
        } catch (err) {
            response = { ok: false, error: err.message };
        }

        return response;
    }

    /**
     * General purpose GET (for routes like /members-only)
     **/

    static async getContent(route) {
        // Prepare URL and options
        let url = route;
        let options = { method: 'GET', headers: {} };
        // Add JWT token (if it exists) in case content is protected
        let token = Local.getToken();
        if (token) {
            options.headers['Authorization'] = 'Bearer ' + token;
        }

        // Fetch!
        let response;
        try {
            response = await fetch(url, options);
            if (response.ok) {
                response.data = await response.json();
            } else {
                response.error = `Error ${response.status}: ${response.statusText}`;
            }
        } catch (err) {
            response = { ok: false, error: err.message };
        }

        return response;
    }

}

export default AuthApi;