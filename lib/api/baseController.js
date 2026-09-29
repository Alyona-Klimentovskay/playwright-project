
export class BaseController {    
    constructor(request) {
        if (new.target === BaseController) {
            throw new Error("Cannot instantiate the abstract class BaseController.");
        }
        this.request = request;
        this.token = null;
    }

    setToken(token) {
        this.token = token;
    }

    _buildOptions(config = {}, methodToken = null) {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
       
        if (config && config.data) {
            options.data = config.data;
        }

        if (config && config.params) {
            options.params = config.params;
        }

        if (config && config.headers) {
            Object.assign(options.headers, config.headers);
        }
        const activeToken = methodToken || this.token;

        if (activeToken) {
            options.headers['Authorization'] = 'Bearer ' + activeToken;
        }
        
        return options;
    }    
}

