import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { GoogleMaps } from 'meteor/dburles:google-maps';
import '../imports/startup/accounts-config.js';
import '../imports/ui/body.js';

Meteor.startup(function () {
  	GoogleMaps.load({ key: '',libraries: 'places', });
	});

