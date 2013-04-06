if (Meteor.isClient) {
	if (Session.equals("page", null)) {
		// we are on the Home page for the first time
		Session.set("page", "home");
	}

	Handlebars.registerHelper('home', function() {
		return Session.equals("page", "home");
	});

	Handlebars.registerHelper('create', function() {
		return Session.equals("page", "create");
	});

	Handlebars.registerHelper('join', function() {
		return Session.equals("page", "join");
	});

	Handlebars.registerHelper('admin', function() {
		return Session.equals("page", "admin");
	});

	Handlebars.registerHelper('spec', function() {
		return Session.equals("page", "spec");
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