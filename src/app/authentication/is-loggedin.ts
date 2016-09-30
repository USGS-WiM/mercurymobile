export function isLoggedin() {
    return (!!sessionStorage.getItem('username') && !!sessionStorage.getItem('password'));
}