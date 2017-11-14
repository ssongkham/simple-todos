import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

//publish all users for drop down
if (Meteor.isServer) {
Meteor.publish('userList', function() {
   		return Meteor.users.find();
 	});
}