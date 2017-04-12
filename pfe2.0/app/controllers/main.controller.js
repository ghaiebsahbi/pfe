var Etudiant = require('../../models/database');
var Demande = require('../../models/demande');
var multer  = require('multer');
module.exports = {
  showHome:showHome,
  showProfile:showProfile,
  show404:show404,
  showDemandes:showDemandes,
  register:register,
  login:login,
  logout:logout,
  demande_doc:demande_doc,
  inbox:inbox,
  //visit:visit,
  dem:dem,
  edit:edit,
  uploadPic:uploadPic
}
      function uploadPic(req, res, next){
        if(req.session.username){
          var upload = multer().single('avatar');
          upload(req, res, function (err) {
            if (err) {
              // An error occurred when uploading dems[dem].nature
          }
          for(var fil in req.files){
            Etudiant.findOneAndUpdate({ username:req.session.username }, { $set: { avatar: req.files[fil].filename } }, { new: true }, function(err, doc) {
              console.log('changed avatar of '+req.session.username);
            });
          console.log(req.files[fil].filename);
        }


          res.redirect('/profile');
    // Everything went fine
  })
        }
      }

      function dem(req, res){
        if(req.session.username){
        Demande.find({username:req.session.username},(err, data) => {
          if(err){res.send(err)}
          else{
            var dems = [];
            dems.push(data);
            for(dem in dems){console.log();}
          }
        });
        res.render('dem',{
          dems:dems
        });

      }else(res.redirect('/'));
    }
  //visit
  // function visit(req,res){
  //   if(req.session.username){
  //     Etudiant.findOne({username:req.session.username},(err,user)=>{
  //
  //     Etudiant.findOne({username2:req.params.username},(err,user2)=>{
  //       var first_name = user.first_name;
  //       var last_name = user.last_name;
  //       var first_name2 = user2.first_name;
  //       var last_name2 = user2.last_name;
  //       var cin = user2.cin;
  //       var adress = user2.adress;
  //       var username = user2.username;
  //       var email = user2.email;
  //       var lieu_naissance = user2.lieu_naissance;
  //       var date_naissance = user2.date_naissance;
  //       var section = user2.section;
  //       var classe = user2.classe;
  //       var tel = user2.tel;
  //     });
  //     });
  //     res.render('visit',{
  //       first_name:first_name,
  //       first_name2:first_name2,
  //       last_name:last_name,
  //       last_name2:last_name2,
  //       cin:cin,
  //       adress:adress,
  //       username:username,
  //       email:email,
  //       lieu_naissance:lieu_naissance,
  //       date_naissance:date_naissance,
  //       section:section,
  //       classe:classe,
  //       tel:tel
  //     })
  //   }else
  //   {
  //     res.render(login);
  //   }
  // }
  function inbox(req,res){
    if(req.session.username){
      console.log('home from session '+req.session.username);
      Etudiant.findOne({username:req.session.username},(err, user) => {
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
          res.render('inbox',{
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
    res.render('login');
  }
  //show the home route
  function showHome(req, res) {

      if(req.session.username){
        console.log('home from session '+req.session.username);
        Etudiant.findOne({username:req.session.username},(err, user) => {
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

            res.render('index',{
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
    if(req.session.username){
          console.log('profile from session ');
    Etudiant.findOne({username:req.session.username},(err, user) => {
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
        res.render('profile',{
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
  if(req.session.username){
        console.log('profile from session ');
  Etudiant.updateOne({username:req.session.username},(err, user) => {
    if(err){
      throw(err);
      res.send('error occured');
      }
    else
    {
      var first_name = req.body.first_name;
      var last_name = req.body.last_name;
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
        adress:adress,
        date_naissance:date_naissance,
        lieu_naissance:lieu_naissance,
        section:section,
        classe:classe,
        tel:tel,
        username:username
      });
      }
    }
  });
}else {
  res.redirect('login');
}
}


  //Login

  function login(req, res, next){
    if(req.session.username){
      res.redirect('/');
      console.log('session deja en cours session: '+ req.session.username);
    }
    else{
    Etudiant.findOne({username:req.body.username, pwd:req.body.pwd},(err, user) => {
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
        var avatar = user.avatar;
        var first_name = user.first_name;
        var last_name = user.last_name;
        req.session.username=user.username;
        console.log('logged in with username '+req.session.username);
        res.render('index',{
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
    if(req.session.username){
    console.log('Demandes from session '+ req.session.username);
    Etudiant.findOne({username:req.session.username},(err, user) => {
      if(err){
        throw(err);
        res.send('error occured');
      }else
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
        Demande.find({username:req.session.username},(err, data) => {
          var dems = [];
          dems.push(data);
          dems.forEach(function(dems){
            res.render('demandes',{
              avatar:avatar,
              first_name:first_name,
              last_name:last_name,
              email:email,
              cin:cin,
              pwd:pwd,
              adress:adress,
              date_naissance:date_naissance,
              dems:dems
            });
          });
        });

      }
    });

  }else {
    res.redirect('login');
  }
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
        res.redirect('login');
      }});
    }

    function demande_doc(req, res) {
      //create etudiant
      Etudiant.findOne({username:req.session.username},(err, user) => {
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
      var date_demande = '07/04/2017';
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
        date_demande:date_demande,
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
      //use etudiant model to insert/save
      var newdemande = new Demande(demande);
        //save etudiant
      newdemande.save(function(err, savedObject){
        if(err){
          res.send(err);
          }
          else{
            res.send('demande avec succé');
          }
    });

      });
      }
  //show 3amar 404
  function show404 (req, res) {
    res.render('page_404');
  }
