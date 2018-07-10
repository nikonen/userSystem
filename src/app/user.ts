export class User {
    constructor(
        public id:number,
        public username:string,
        public email: string,
        public state: 'inactive') {}

        toggleState() {
            this.state = 'active' ? 'inactive' : 'active';
          }


}
