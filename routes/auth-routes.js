module.exports = (app, passport) => {
  app.get('/auth/facebook/token', passport.authenticate('facebook-token'), (req, res) => {
    console.log('User is logged, req.user will be-----------------: ', req.user);

    res.send(200);
  });
};
