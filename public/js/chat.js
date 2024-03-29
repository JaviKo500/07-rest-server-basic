const baseUrl = 'http://localhost:8080/api/auth';

let user =  null;
let socket = null;
const privateMessage = {};
const onlineUsers=[];
// * references

const textUid= document.querySelector('#textUid');
const textMessage= document.querySelector('#textMessage');
const ulUsers= document.querySelector('#ulUsers');
const ulMessages= document.querySelector('#ulMessages');
const ulPrivateMessages= document.querySelector('#ulPrivateMessages');
const btnOut= document.querySelector('#btnOut');


btnOut.addEventListener('click', () => {
    const email = localStorage.getItem('email');
    // if ( email ) {
    //     console.log(email);
    //     google.accounts.id.disableAutoSelect();
    //     google.accounts.id.revoke( email , done => {
    //         localStorage.clear();
    //         location.reload();
    //     });
    // }
    localStorage.clear();
    window.location = 'index.html';
    user = null;
});

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
    localStorage.setItem('token', tokenDB);
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

    socket.on('receive-message', drawerMessages);

    socket.on('active-users', drawerUsers);

    socket.on('private-message', ( payload ) => {
        const { uid, ...rest} =  payload;
        if ( privateMessage[uid] ) {
            privateMessage[uid].messages.push( { ...rest } );
        } else {
            privateMessage[uid] = { messages: [ {...rest} ]}; 
        }
        drawerPrivateMessages( uid );
    });

}

let ilsUsersOnline = null;

const drawerUsers = ( users = [] ) => {
    onlineUsers.push( ...users );
    let usersHtml = '';
    users.forEach(({ name, uuid}) => {
        usersHtml += `
            <li id="${uuid}">
                <p>
                    <h5 class="text-success">${name}</h5>
                    <span class="fs-6 text-muted">${uuid}</span>
                </p>
            </li>
        `;
    });

    ulUsers.innerHTML = usersHtml;
    actionsUsersOnline();
}

const actionsUsersOnline = () => {
    ilsUsersOnline = document.querySelectorAll("#ulUsers > li");
    for (let index = 0; index < ilsUsersOnline.length; index++) {
        ilsUsersOnline[index].addEventListener('click', ()=> {
            const uid = ilsUsersOnline[index].id;
            textUid.value = uid;
            drawerPrivateMessages( uid )
        });
    }
}
textMessage.addEventListener('keyup', ({keyCode}) => {
    const uid = textUid.value;
    if ( keyCode !== 13 )  return;
    const message = textMessage.value;
    if ( message.length === 0 ) return;

    if ( privateMessage[uid] ) {
        privateMessage[uid].messages.push( { from: 'you', message } );
    } else {
        privateMessage[uid] = { messages: [ { from: 'you', message } ]}; 
    }
    drawerPrivateMessages(uid);
    socket.emit('send-message', {message, uid});
    textMessage.value = '';
});


const drawerMessages = ( messages = [] ) => {
    let messagesHtml = '';
    messages.forEach(({ name, message}) => {
        messagesHtml += `
            <li>
                <p>
                    <span class="text-primary">${name}</span>
                    <span>${message}</span>
                </p>
            </li>
        `;
    });

    ulMessages.innerHTML = messagesHtml;
}

const drawerPrivateMessages = ( uid = '' ) => {
    let messagesHtml = '';
    const messages = privateMessage[uid]?.messages;
    if( !messages ) return ulPrivateMessages.innerHTML =`<span class="text-info">Not messages</span>`;
    messages.forEach(({ from, message}) => {
        messagesHtml += `
            <li>
                <p>
                    <span class="text-primary">${from}</span>
                    <span>${message}</span>
                </p>
            </li>
        `;
    });

    ulPrivateMessages.innerHTML = messagesHtml;
}

const main = async () => {
    await validateJWT()
}

main();

// const socket = io();