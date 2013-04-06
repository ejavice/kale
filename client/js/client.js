if (Meteor.isClient) {
	if (Session.equals("page", null)) {
		// we are on the Home page for the first time
		Session.set("page", "home");
	}

	Handlebars.registerHelper('ishome', function() {
		return Session.equals("page", "home");
	});

	Handlebars.registerHelper('iscreateevent', function() {
		return Session.equals("page", "createevent");
	});

	Handlebars.registerHelper('isjoinevent', function() {
		return Session.equals("page", "joinevent");
	});

	Handlebars.registerHelper('iseventadmin', function() {
		return Session.equals("page", "eventadmin");
	});

	Handlebars.registerHelper('iseventspec', function() {
		return Session.equals("page", "eventspec");
	});


	// Template.hello.events({
	// 	'click input' : function () {
	// 		// template data, if any, is available in 'this'
	// 		if (typeof console !== 'undefined')
	// 			console.log("You pressed the button");
	// 	}
	// });



	// Template.content.greeting = function () {
	// 	return "Hello, my name is E. Norm Hiscock. Allow me to introduce my wife, Dixie Normus.";
	// };
}