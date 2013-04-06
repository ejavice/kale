if (Meteor.isClient) {
	if (Session.equals("page", null)) {
		// we are on the Home page
		Session.set("page", "home");
	} else if (Session.equals("page", "joinevent")) {
		// we are on the Join Event page
	} else if (Session.equals("page", "createevent")) {
		// we are on the Create Event page
	} else if (Session.equals("page", "eventspec")) {
		// we are on the Event Spectator page
	} else if (Session.equals("page", "eventadmin")) {
		// we are on the Event Admin page 
	}
	Handlebars.registerHelper('page', function(input) {
		return Session.get("page");
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