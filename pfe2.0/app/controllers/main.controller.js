var Etudiant = require('../../models/database');

module.exports = {
  showHome:showHome,
  showProfile:showProfile,
  show404:show404,
  showDemandes:showDemandes,
  register:register,
  login:login,
  logout:logout
}
  //logout function
  function logout(req, res){
    req.session.destroy(function(err) {
    if(err){
      throw err;
    }
  });
    res.render('login');
  }
  //show the home route
  function showHome(req, res) {

    if(userID == null || userID == undefined)
    {
    var username = req.body.username;
    var pwd = req.body.pwd;
    } else{
      var userID = req.session.userID;
      var username = req.session.username;
      var pwd = req.session.pwd;
      }
    if(username == null || username == undefined || pwd == null || pwd == undefined){
      res.redirect('login');
    }
      else{
    Etudiant.findOne({username:username, pwd:pwd},(err, user) => {
      if(err){
        throw(err);
        res.send('error occured');
      }
      else if(!user)
      {
        res.redirect('login');
      }
      else
      {
        var first_name = user.first_name;
        var last_name = user.last_name;
        req.session.username=user.username;
        res.render('index',{
          first_name:first_name,
          last_name:last_name
        });
      }
    });
  }
}
  function showProfile (req, res) {
    var username = req.session.username;

    Etudiant.findOne({username:username},(err, user) => {
      if(err){
        throw(err);
        res.send('error occured');
        }
      else
      {
        var first_name = user.first_name;
        var last_name = user.last_name;
        var cin = user.cin;
        var adress = user.adress;
        var username = user.username;
        var date_naissance = user.date_naissance;
        var lieu_naissance = user.lieu_naissance;
        var email = user.email;
        var pwd = user.pwd;
        if(!req.session){
          res.render('login');
        }
        else {
        res.render('profile',{
          first_name:first_name,
          last_name:last_name,
          email:email,
          cin:cin,
          pwd:pwd,
          adress:adress,
          date_naissance:date_naissance,
        });
        }
      }
    });
  }
  //Login

  function login(req, res, next){
    res.render('login');
  }

  //show Demandes
  function showDemandes (req, res) {
    var username = req.session.username;
    Etudiant.findOne({username:username},(err, user) => {
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
        var date_naissance = user.date_naissance;
        var lieu_naissance = user.lieu_naissance;
        var email = user.email;
        var pwd = user.pwd;
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
  }

  //insert into DB
  function register (req, res) {
    //create etudiant
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var cin = req.body.cin;
    var adress = req.body.adress;
    var username = req.body.username;
    var email = req.body.email;
    var lieu_naissance = req.body.lieu_naissance;
    var date_naissance = req.body.date_naissance;
    var section = req.body.section;
    var classe = req.body.classe;
    var pwd = req.body.pwd;
    var tel = req.body.tel;
    var etudiant = {
      first_name:first_name,
      last_name:last_name,
      cin:cin,
      adress:adress,
      username:username,
      email:email,
      lieu_naissance:lieu_naissance,
      date_naissance:date_naissance,
      section:section,
      classe:classe,
      pwd:pwd,
      tel:tel
    }
    //use etudiant model to insert/save
    var newetudiant = new Etudiant(etudiant);
      //save etudiant
    newetudiant.save(function(err, savedObject){
      if(err){
        res.send(err);
        }
      else {
        //res.send(savedObject._id);
        var userID = savedObject._id;
        req.session.userId = userID;
        res.redirect('login');

      }});
    }


  //show 3amar 404
  function show404 (req, res) {
    res.render('page_404');
  }
