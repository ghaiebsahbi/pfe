var Etudiant = require('../../models/database');
var Demande = require('../../models/demande');
var Admin = require('../../models/admin');

module.exports = {
  showAdminHome:showAdminHome,
  showAdminProfile:showAdminProfile,
  show404:show404,
  showAdminDemandes:showAdminDemandes,
  Adminlogin:AdminLogin,
  logout:logout
}
  //logout function
  function logout(req, res){
    console.log('session '+req.session.username+' destroyed');
    req.session.destroy(function(err) {
    if(err){
      throw err;
    }
  });
    res.render('login');
  }
  //show the home route
  function showAdminHome(req, res) {
      if(req.session.username){
        console.log('home from session '+req.session.username);
        Admin.findOne({username:req.session.username},(err, user) => {
          if(err){
            throw(err);
            res.send('error occured');
            }
          else
          {
            var first_name = user.first_name;
            var last_name = user.last_name;
            var cin = user.cin;
            var username = user.username;
            var email = user.email;
            var pwd = user.pwd;
            var poste = user.poste;
            if(req.session.username == null || req.session.username == undefined){
              res.redirect('login');
            }
            else {
            res.render('index',{
              first_name:first_name,
              last_name:last_name,
              email:email,
              cin:cin,
              pwd:pwd,
              username:usernam,
              poste:poste
            });
            }
          }
        });
      }else {
        res.redirect('login');
      }
}
  function showAdminProfile (req, res) {

    if(req.session.username){
          console.log('profile from session ');
    Admin.findOne({username:req.session.username},(err, user) => {
      if(err){
        throw(err);
        res.send('error occured');
        }
      else
      {
        var first_name = user.first_name;
        var last_name = user.last_name;
        var cin = user.cin;
        var username = user.username;
        var email = user.email;
        var pwd = user.pwd;
        var poste = user.poste;
        if(req.session.username == null || req.session.username == undefined){
          res.render('login');
        }
        else {
        res.render('profile',{
          first_name:first_name,
          last_name:last_name,
          email:email,
          cin:cin,
          pwd:pwd,
          username:usernam,
          poste:poste
        });
        }
      }
    });
  }else {
    res.redirect('login');
  }
}
  //Login
  function AdminLogin(req, res, next){
    if(req.session.username){
      res.redirect('/');
      console.log('session deja en cours session: '+ req.session.username);
    }
    else{
    Admin.findOne({username:req.body.username, pwd:req.body.pwd},(err, user) => {
      if(err){
        throw(err);
        res.send('error occured');
      }
      else if(!user)
      {
        res.render('login');
      }
      else
      {

        var first_name = user.first_name;
        var last_name = user.last_name;
        req.session.username=user.username;
        console.log('logged in with username '+req.session.username);
        res.render('index',{
          first_name:first_name,
          last_name:last_name
        });
      }
    });
  }
}
  //show Demandes
  function showAdminDemandes (req, res) {
    if(req.session.username){
    console.log('Demandes from session '+ req.session.username);
    Admin.findOne({username:req.session.username},(err, user) => {
      if(err){
        throw(err);
        res.send('error occured');
      }else
      {
        var first_name = user.first_name;
        var last_name = user.last_name;
        var cin = user.cin;
        var adress = user.adress;
        var username = user.username;
        var email = user.email;
        var lieu_naissance = user.lieu_naissance;
        var date_naissance = user.date_naissance;
        var section = user.section;
        var classe = user.classe;
        var pwd = user.pwd;
        var tel = user.tel;
        res.render('demandes',{
          first_name:first_name,
          last_name:last_name,
          email:email,
          cin:cin,
          pwd:pwd,
          adress:adress,
          date_naissance:date_naissance,
        });
      }
    });
  }else {
    res.redirect('login');
  }
}
  //show 3amar 404
  function show404 (req, res) {
    res.render('page_404');
  }
