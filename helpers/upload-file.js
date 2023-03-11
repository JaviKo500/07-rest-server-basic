const path = require('path');
const { v4: uuidv4 } =  require('uuid');

const uploadFile = ( files, fileTypes = [ 'jpg', 'jpeg', 'png', 'gif'], folder = '' ) => {

    return new Promise( ( resolve, reject ) => {
        const { file } = files;
        const cutName = file.name.split('.');
        const typeFile = cutName[cutName.length - 1];
;
        if ( !fileTypes.includes( typeFile )) return reject( `Type file invalid: ${ fileTypes }`);

        const tempNameFile = `${uuidv4()}.${typeFile}`;
        const uploadPath = path.join(  __dirname, '../uploads/', folder, tempNameFile );
        
        file.mv(uploadPath, function(err) {
            if (err) {
                console.log(err);
                return reject( err );
            }
            resolve( tempNameFile );
        });
    });
}

module.exports = {
    uploadFile
}