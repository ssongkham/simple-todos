import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { GoogleMaps } from 'meteor/dburles:google-maps';

import { Tasks } from '../api/tasks.js';

import './task.js';
import './body.html';
import './register.js';

//set initial state for sign in
Session.setDefault('page', 'nav');

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('tasks');
  Tracker.autorun(function() {
  	if (Meteor.user()) {
    	Meteor.subscribe('userList');
  	}
  });
  
  //Trying to google maps and autocomplete to work
  	GoogleMaps.ready('userMap', function(map) {
	
  	});
	
	GoogleMaps.load({ 
			v: '3', 
			key: '', 
			libraries: 'geometry,places' 
	});
	


});


Template.body.helpers({
  tasks() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      // If hide completed is checked, filter tasks
      return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    // Otherwise, return all of the tasks
    return Tasks.find({}, { sort: { createdAt: -1 } });
  	},
  	incompleteCount() {
    return Tasks.find({ checked: { $ne: true } }).count();
  	},
  	currentPage: function(page){
       return Session.get('page')
   },
	users: function(){
    	return Meteor.users.find();
		
  	},
	firstname: function(){
		var user = Meteor.user();
  		if (user && user.profile.firstname)
    		return user.profile.firstname;
	},
	userId: function(){
		return Meteor.userId();	
	},
	userMapOptions() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(41.619549, -93.598022),
        zoom: 8,
      };
    }
  },
  
});

Template.body.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    // Insert a task into the collection
    Meteor.call('tasks.insert', text);

    // Clear form
    target.text.value = '';
  },
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },
  'click .clickChangesPage': function(event, template){
	  //button click to show login, nav, register template
      Session.set('page', event.currentTarget.getAttribute('data-page'))
   },
   'change #userdd'(event){
		//get user address when selected
		var user = Meteor.users.findOne(event.target.value);
		if(user){
			//document.getElementById('mapbtn').classList.remove("hide");

			console.log(user.profile.address);
			return user.profile.address;	
		}
   },
   'click #mapbtn'(event){
		 document.getElementById('map-container').classList.remove("hide"); 
		 
   }
   
});

