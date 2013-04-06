if (Meteor.isClient) {
	Session.set("page", "home");
	if (Session.equals("page", null)) {
		// we are on the Home page for the first time
		Session.set("page", "home");
	}

	Handlebars.registerHelper('page', function(input) {
		return Session.get("page")==input;
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