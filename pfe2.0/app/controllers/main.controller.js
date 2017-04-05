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
  // cannot access session here
});
    res.render('login');
  }
  //show the home route
  function showHome(req, res) {

    var username = req.body.username;
    var pwd = req.body.pwd;
    Etudiant.findOne({username:username},(err, etudiants) => {
      if(err){
        throw(err);
        res.send('error occured');
      }else
      {
        var first_name = etudiants.first_name;
        var last_name = etudiants.last_name;
        res.render('index',{
          first_name:first_name,
          last_name:last_name
        });
      }
    });
  }

  function showProfile (req, res) {
    Etudiant.findOne({username:'hech'},(err, etudiants) => {
      if(err){
        throw(err);
        res.send('error occured');
      }else
      {
        var first_name = etudiants.first_name;
        var last_name = etudiants.last_name;
        var cin = etudiants.cin;
        var adress = etudiants.adress;
        var username = etudiants.username;
        var date_naissance = etudiants.date_naissance;
        var lieu_naissance = etudiants.lieu_naissance;
        var email = etudiants.email;
        var pwd = etudiants.pwd;
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
    });

  }
  //Login

  function login(req, res){
    res.render('login');
  }

  //show Demandes
  function showDemandes (req, res) {
    res.render('demandes');
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
      newetudiant.save();

    //redirect
    res.redirect('/');


  }

  //show 3amar 404
  function show404 (req, res) {
    res.render('page_404');
  }
