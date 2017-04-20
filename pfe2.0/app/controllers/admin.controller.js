var Admin = require('../../models/admin.js');
var Etudiant = require('../../models/database.js');
var Demande = require('../../models/demande');
var multer  = require('multer');
module.exports = {
  showHome:showHome,
  showProfile:showProfile,
  show404:show404,
  showDemandes:showDemandes,
  login:login,
  logout:logout,
  demande_doc:demande_doc,
  inbox:inbox,
  visit:visit,
  edit:edit,
  dem:dem,
  acceptDem:acceptDem,
  deleteDem:deleteDem,
  viewAll:viewAll,
  uploadPic:uploadPic
}

  function dem(req,res){
    if(req.session.username && req.session.role == 'admin'){
      Demande.findOne({'_id':req.params.id},(err, data) => {
        if(err){
          throw err;
        }else
        {
          res.json(data);
        }
      });
    }else {
      res.render('admin/login');
    }
  }

  function acceptDem(req,res){
    if(req.session.username && req.session.role == 'admin'){
      Demande.findOneAndUpdate({_id:req.body.hidid},{ $set: { 'etat':true }},(err,numAffected) => {
        if(err){console.log('error');}
        else
        {
          console.log(req.body.hidid);
          console.log(numAffected);
        }
      });
      res.redirect('demandes');
    }else {
      res.redirect('admin/login');
    }
  }
  function deleteDem(req,res){
    if(req.session.username && req.session.role == 'admin'){
      Demande.findOneAndRemove({_id:req.body.hidid},(err) => {
        if(err){
          throw err;
        }else {
          console.log('demande %s supprimé',req.body.hidid);
        }
      });
      res.redirect('demandes');

    }else {
      res.redirect('admin/login');
    }
  }

        function uploadPic(req, res, next){
          if(req.session.username && req.session.role == 'admin'){
            var upload = multer().single('avatar');
            upload(req, res, function (err) {
              if (err) {
            }
            for(var fil in req.files){
              Admin.findOneAndUpdate({ username:req.session.username }, { $set: { avatar: req.files[fil].filename } }, { new: true }, function(err, doc) {
                console.log('changed avatar of '+req.session.username);
              });
            console.log(req.files[fil].filename);
          }
            res.redirect('admin/profile');
        // Everything went fine
      });
          }
        }

  function visit (req, res) {
    if(req.session.username && req.session.role == 'admin'){
          console.log('visite %s from session %s ',req.params.username,req.session.username);
    Admin.findOne({username:req.session.username},(err, user) => {
      if(err){
        throw(err);
        res.send('error occured');
        }
      else
      {
        Etudiant.findOne({username:req.params.username},(err, data) => {
        var avatar2 = data.avatar;
        var avatar = user.avatar;
        var first_name2 = data.first_name;
        var last_name2 = data.last_name;
        var first_name = user.first_name;
        var last_name = user.last_name;
        var cin = data.cin;
        var adress = data.adress;
        var username = data.username;
        var email = data.email;
        var lieu_naissance = data.lieu_naissance;
        var date_naissance = data.date_naissance;
        var tel = data.tel;
        var classe = data.classe;
        var section = data.section;
        res.render('admin/visit',{
          first_name2:first_name2,
          last_name2:last_name2,
          avatar2:avatar2,
          first_name:first_name,
          avatar:avatar,
          last_name:last_name,
          email:email,
          cin:cin,
          adress:adress,
          date_naissance:date_naissance,
          lieu_naissance:lieu_naissance,
          tel:tel,
          classe:classe,
          section:section,
          username:username
        });
      });
      }
    });
  }else {
    res.redirect('admin/login');
  }
}
  function inbox(req,res){
    if(req.session.username && req.session.role == 'admin'){
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
          var avatar = user.avatar;
          var username = req.session.username;
          res.render('admin/inbox',{
            avatar:avatar,
            first_name:first_name,
            last_name:last_name,
            username:username
          });
        }
      });
    }
    else {
      res.redirect('login')
    }

  }

  //logout function
  function logout(req, res){
    console.log('session '+req.session.username+' destroyed');
    req.session.destroy(function(err) {
    if(err){
      throw err;
    }

  });
    res.render('admin/login');
  }
  //Show All Etudiants
  function viewAll(req, res){
    if(req.session.username && req.session.role == 'admin'){
      Etudiant.find((err, data) => {
        Admin.findOne({username:req.session.username},(err, admin) => {
        //res.send(user);
        for(var user in data){
          console.log('user x',data[user].username);
        }
          res.render('admin/contacts',{
            users : data,
            first_name:admin.first_name,
            last_name:admin.last_name,
            avatar:admin.avatar
          });
      });
    });
    }else {
      res.redirect('login');
    }
  }
  //show the home route
  function showHome(req, res) {
      if(req.session.username && req.session.role == 'admin'){
        console.log('home from session '+req.session.username);
        Admin.findOne({username:req.session.username},(err, user) => {
          if(err){
            throw(err);
            res.send('error occured');
            }
          else
          {
            var avatar = user.avatar;
            var first_name = user.first_name;
            var last_name = user.last_name;
            var cin = user.cin;
            var adress = user.adress;
            var username = user.username;
            var date_naissance = user.date_naissance;
            var lieu_naissance = user.lieu_naissance;
            var email = user.email;
            var pwd = user.pwd;
            if(req.session.username == null || req.session.username == undefined){
              res.redirect('login');
            }
            else {

            res.render('admin/index',{
              avatar:avatar,
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
      }else {
        res.redirect('login');
      }
}
  function showProfile (req, res) {
    if(req.session.username && req.session.role == 'admin'){
          console.log('profile from session ');
    Admin.findOne({username:req.session.username},(err, user) => {
      if(err){
        throw(err);
        res.send('error occured');
        }
      else
      {
        var avatar = user.avatar;
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
        res.render('admin/profile',{
          first_name:first_name,
          avatar:avatar,
          last_name:last_name,
          email:email,
          cin:cin,
          pwd:pwd,
          adress:adress,
          date_naissance:date_naissance,
          lieu_naissance:lieu_naissance,
          section:section,
          classe:classe,
          tel:tel,
          username:username
        });
      }
    });
  }else {
    res.redirect('login');
  }
}

//edit Profile
function edit (req, res) {
  if(req.session.username && req.session.role == 'admin'){
        console.log('profile from session ');
  Admin.update({username:req.session.username},{
    first_name:req.body.first_name,
    last_name:req.body.last_name,
    cin: req.body.cin,
    adress: req.body.adress,
    username: req.body.username,
    email: req.body.email,
    lieu_naissance: req.body.lieu_naissance,
    date_naissance: req.body.date_naissance,
    pwd: req.body.pwd,
    tel: req.body.tel
    }).then(res.redirect('profile'));
}else {
  res.redirect('login');
}
}


  //Login

  function login(req, res, next){
    if(req.session.username && req.session.role == 'admin'){
      res.redirect('admin/');
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
        res.render('admin/login');
      }
      else if(user.role == 'admin')
      {
        var avatar = user.avatar;
        var first_name = user.first_name;
        var last_name = user.last_name;
        req.session.username=user.username;
        req.session.role = user.role;
        console.log('logged in with Admin '+req.session.username);
        res.render('admin/index',{
          avatar:avatar,
          first_name:first_name,
          last_name:last_name
        });

      }
      else {
        var avatar = user.avatar;
        var first_name = user.first_name;
        var last_name = user.last_name;
        req.session.username=user.username;
        console.log('logged in with username '+req.session.username);
        res.render('admin/index',{
          avatar:avatar,
          first_name:first_name,
          last_name:last_name
        });
      }
    });
  }
}

  //show Demandes
  function showDemandes (req, res) {
    if(req.session.username && req.session.role == 'admin'){
    console.log('Demandes from session '+ req.session.username);
    Admin.findOne({username:req.session.username},(err, user) => {
      if(err){
        throw(err);
        res.send('error occured');
      }
      else {
        Demande.find({etat:false},(err, data) => {
            res.render('admin/demandes',{
              nature:data.nature,
              adress:data.adress,
              first_name:user.first_name,
              last_name:user.last_name,
              avatar:user.avatar,
              section:data.section,
              clsasse:data.classe,
              email:data.email,
              tel:data.tel,
              first_name1:data.first_name,
              last_name1:data.last_name,
              email:data.email,
              cin:data.cin,
              adress:data.adress,
              date_naissance:data.date_naissance,
              dems:data
            });
        });

      }
    });

  }else {
    res.redirect('login');
  }
}


    function demande_doc(req, res) {
      //create Admin
      Admin.findOne({username:req.session.username},(err, user) => {
      var avatar = user.avatar;
      var username = user.username;
      var first_name = user.first_name;
      var last_name = user.last_name;
      var cin = user.cin;
      var adress = user.adress;
      var lieu_naissance = user.lieu_naissance;
      var date_naissance = user.date_naissance;
      var section = user.section;
      var classe = user.classe;
      var etat = 'false';
      var nature = req.body.demande;
      var email = user.email;
      var encadreur = req.body.encadreur;
      var description = req.body.description;
      var binome = req.body.binome;
      var memoir = req.body.titre;
      var demande = {
        avatar:avatar,
        username:username,
        email:email,
        nature:nature,
        etat:etat,
        first_name:first_name,
        last_name:last_name,
        cin:cin,
        adress:adress,
        lieu_naissance:lieu_naissance,
        date_naissance:date_naissance,
        section:section,
        classe:classe,
        memoir:memoir,
        encadreur:encadreur,
        description:description,
        binome:binome
      }
      //use Admin model to insert/save
      var newdemande = new Demande(demande);
        //save Admin
      newdemande.save(function(err, savedObject){
        if(err){
          res.send(err);
          }
          else{
            res.redirect('demandes');
          }
    });

      });
      }
  //show 3amar 404
  function show404 (req, res) {
    res.render('admin/page_404');
  }
