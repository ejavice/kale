if (Meteor.isClient) {
	if (Session.equals("page", undefined)) {
		Session.set("page", "home");
	}
	Template.content.home = function(){
		if (Session.equals("page","home")){
			return true;
		}else{
			return false;
		}
	};
	Template.content.create = function(){
		if (Session.equals("page","create")){
			return true;
		}else{
			return false;
		}
	};
	Template.content.join = function(){
		if (Session.equals("page","join")){
			return true;
		}else{
			return false;
		}
	};
	Template.content.admin = function(){
		if (Session.equals("page","admin")){
			return true;
		}else{
			return false;
		}
	};
	Template.content.spec = function(){
		if (Session.equals("page","spec")){
			return true;
		}else{
			return false;
		}
	};
	Template.content.about = function(){
		if (Session.equals("page","about")){
			return true;
		}else{
			return false;
		}
	};

	Template.home.events({
		'click li': function (event){
			var li_id = event.currentTarget.className;
			Session.set("page",""+li_id);
		}
	});

	Template.create.events({
		'click img': function (event){
			var img_id = event.currentTarget.className;
			if(img_id=="back"){
				Session.set("page","home");
			}else if(img_id=="submit"){
				var eventname = document.getElementById("eventname").value.trim();
				var eventlocation = document.getElementById("eventlocation").value.trim();
				var eventspeaker = document.getElementById("eventspeaker").value.trim();
				var eventemail = document.getElementById("eventemail").value.trim();
				if(validateevent(eventname, eventemail)){
					createEvent(eventname, eventlocation, eventspeaker, eventemail);
				}else{
					console.log("Invalid Event");
				}
			}
		}
	});
}
function validateevent(eventname, eventemail){
	return true;
}

function createEvent(eventname, eventlocation, eventspeaker, eventemail){
	Events.insert({name: eventname, location: eventlocation, speaker: eventspeaker, email: eventemail});
}
