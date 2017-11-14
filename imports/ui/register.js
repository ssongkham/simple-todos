import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
 
//New Account Register
Template.register.events({
    'submit form': function(){
        event.preventDefault();
		var username = $('#username').val();
        var email = $('#email').val();
		var firstname = $('#firstname').val();
		var lastname = $('#lastname').val();
		var address = $('#address').val();
        var password = $('#password').val();    
		Accounts.createUser({
			username: username,
            email: email,
			profile: {firstname: firstname,
					lastname: lastname,
					address: address
			},
            password: password
        });
		
		Session.set('page', 'nav');
		
	}
});

//Sign in
Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('#loginemail').val();
        var password = $('#loginpassword').val();
        Meteor.loginWithPassword(email, password, function(error){
			if(error){
				console.log(error.reason);
			}else{
				Session.set('page', 'nav');
			}
		});
		
    }
});

//Logout
Template.nav.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});