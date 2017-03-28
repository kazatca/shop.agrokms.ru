
const hasRole = (...roles) => {
  const rolesMap = roles.reduce((result, role) => { 
    return {...result, [role]: true};
  }, {});

  return (req, res, next) => {
    if(req.session && req.session.role in rolesMap){
      return next();
    }
    res.writeHead(401);
    res.end();
  };
};

export default hasRole;