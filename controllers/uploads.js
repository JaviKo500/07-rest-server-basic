const { request, response } = require('express');
const { uploadFile } = require('../helpers');



const loadFile = async (req= request, res =response) => {
    try {
        if ( !req.files || Object.keys(req.files).length === 0 || !req.files.file ) {
            return res.status(400).json({
              msg: 'No files were uploaded.',
            });
        } 
        // const nameFile =  await uploadFile( req.files, ['jpeg', 'jpg'], 'text' );
        // const nameFile =  await uploadFile( req.files );
        const nameFile =  await uploadFile( req.files, undefined, 'img' );
        res.status(200).json({
          msg: nameFile,
        });        
    } catch (error) {
        console.log(error);
        res.status(400).json({
          error,
        });
    }
}

module.exports = {
    loadFile
}