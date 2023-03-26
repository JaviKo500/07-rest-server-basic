const baseUrl = 'http://localhost:8080/api/auth';

let user =  null;
let socket = null;

// * references

const textUid= document.querySelector('#textUid');
const textMessage= document.querySelector('#textMessage');
const ulUsers= document.querySelector('#ulUsers');
const ulMessages= document.querySelector('#ulMessages');
const btnOut= document.querySelector('#btnOut');


const validateJWT = async () => {
    const token = localStorage.getItem('token') ?? '';

    if ( token.length <= 10 ){
        window.location = 'index.html';
        throw new Error('No hay token en el servidor');
    }

    const resp = await fetch( baseUrl,{
        method: 'GET',
        headers: {
            'x-token': token
        }
    });

    const { userAuthenticated, token: tokenDB } = await resp.json();
    localStorage.setItem('token', tokenDB)
    user = userAuthenticated;
    document.title = user.name;
    await connectSocket();
}

const connectSocket = async (params) => {
    socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        }
    });


    socket.on( 'connect', () => {
        console.log('sockets online');
    });

    socket.on( 'disconnect', () => {
        console.log('sockets offline');
    });

    socket.on('receive-message', () => {
        // TODO:
    });
    socket.on('active-users', () => {
        // TODO:
    });
    socket.on('private-message', () => {
        // TODO: 
    });

}
const main = async () => {
    await validateJWT()
}

main();

// const socket = io();