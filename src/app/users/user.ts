export class User {
    constructor(
        public id?: number,
        public username?: string,
        public first_name?: string,
        public last_name?: string,
        public email?: string,
        public groups?: string[],
        public user_permissions?: string[],
        public is_superuser?: Boolean,
        public is_staff?: Boolean,
        public is_active?: Boolean
    ) {}
}