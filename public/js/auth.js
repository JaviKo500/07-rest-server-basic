const baseUrl = 'http://localhost:8080/api/auth';

const myForm =document.querySelector('form');


myForm.addEventListener( 'submit', ev => {
    ev.preventDefault();
    const formData = {};

    for (const element of myForm.elements) {
        if ( element.name.length > 0 ) {
            formData[ element.name ] = element.value;
        }
    }

    fetch( `${baseUrl}/login`, {
        method: 'POST',
        body: JSON.stringify( formData ),
        headers: { 'Content-Type': 'application/json' }
    })
    .then( resp => resp.json() )
    .then( ({ msg, token }) => {
        if ( msg !== 'Login ok' ) throw new Error( 'Not correct authenticated' );
        localStorage.setItem( 'token', token);
        window.location = 'chat.html';
    })
    .catch( err => console.error );
    console.log(formData);
} );

function handleCredentialResponse(response) {
    // Google token
    const body = { id_token : response.credential };
    // console.log('google token', response.credential);
    fetch( `${baseUrl}/google`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( body )
    } )
        .then( resp => resp.json() )
        .then( ({msg, token, user }) => {
            if ( msg !== 'Login ok' ) throw new Error( 'Not correct authenticated' );
            const {email} = user; 
            localStorage.setItem( 'token', token );
            localStorage.setItem( 'email', email)
            window.location = 'chat.html';
        })
        .catch(console.warn)

}

const buttonLogOut =  document.getElementById('google_sign_out');
buttonLogOut.onclick = () => {
    console.log( google.accounts.id );
    google.accounts.id.disableAutoSelect();
    google.accounts.id.revoke( localStorage.getItem( 'email'), done => {
        localStorage.clear();
        location.reload();
    });
};