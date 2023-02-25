const { response, request } = require("express")

const isAdminRol = async ( req = request, res = response, next ) => {
    if ( !req.userAuthenticated ) {
        res.status(500).json({
          msg: 'Check user role first before that token',
        });
    }
    try {
        const { role, name } = req.userAuthenticated;
        if ( role !== 'ADMIN_ROLE' ) return res.status(401).json({
          msg: `${ name } not is administrator - can't do this`,
        });
        next();
    } catch (error) {
        res.status(500).json({
          error,
        });
    }
}

const hasRole = ( ...roles ) => {
  console.log(roles);
  return (req = request, res = response,  next) => {
    if ( !req.userAuthenticated ) {
      res.status(500).json({
        msg: 'Check user role first before that token',
      });
  }
    const { role, name } = req.userAuthenticated;
    if ( !roles.includes( role ) ) return res.status(401).json({
      msg: `${ name } not is administrator - can't do this`,
    });
    next();
  };
}

module.exports = {
    isAdminRol,
    hasRole
}