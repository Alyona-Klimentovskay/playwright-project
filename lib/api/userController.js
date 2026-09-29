import { BaseController } from  '../api/baseController.js';


export class UserController extends BaseController {
    constructor(request) {
        super(request);
        this.basePath = '/users'; 

    }

    async register(payload) {
        const options = this._buildOptions({ data: payload });
        const response = await this.request.post(this.basePath + '/register', options);
        return response;
    }

    async login(credentials) {
        const options = this._buildOptions({ data: credentials });
        const response = await this.request.post(this.basePath + '/login', options);
        return response;
    }
  
    async logout(token = null) {   
        const options = this._buildOptions(null, token);
        const response = await this.request.get(this.basePath + '/logout', options);
        return response;
    }

    async getCurrentProfile(token = null) {
        const options = this._buildOptions(null, token);
        const response = await this.request.get(this.basePath + '/me', options);
        return response;
    }

    async getAllUsers(token = null) {
        const options = this._buildOptions(null, token);
        const response = await this.request.get(this.basePath, options);
        return response;
    }

    async searchUsers(searchParams, token = null) {
        const options = this._buildOptions({ params: searchParams }, token);
        return await this.request.get('/users/search', options);
    }

    async deleteUser(userId, token = null) {
        const options = this._buildOptions(null, token);    
        const response = await this.request.delete(this.basePath + '/' + userId, options);
        return response;
    }

    async updateUser(userId, payload, token = null) {
        const options = this._buildOptions({ data: payload }, token);
        const response = await this.request.put(this.basePath + '/' + userId, options);
        return response;
    }

}

