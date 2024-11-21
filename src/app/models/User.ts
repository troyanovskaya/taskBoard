export class User{
    constructor(
        public displayName: string,
        public email:string,
        public localId: string,
        private _token: string,
        private _refreshToken: string,
        private _expiresIn: Date
    ){}
    get token(){
        if(!this._expiresIn || this._expiresIn < new Date()){
            return null
        }
        return this._token;
    }
}