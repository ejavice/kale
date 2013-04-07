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


//HOME JS
	Template.home.events({
		'click li': function (event){
			var li_id = event.currentTarget.className;
			Session.set("page",""+li_id);
		}
	});


//CREATEJS
	Template.create.events({
		'click img': function (event){
			var img_id = event.currentTarget.className;
			if(img_id=="backbutton"){
				Session.set("page","home");
			}else if(img_id=="eventsubmit"){
				var eventname = document.getElementById("eventname").value.trim();
				var eventlocation = document.getElementById("eventlocation").value.trim();
				var eventspeaker = document.getElementById("eventspeaker").value.trim();
				var eventemail = document.getElementById("eventemail").value.trim();
				createEvent(eventname, eventlocation, eventspeaker, eventemail);
			}
		}
	});


//ADMIN JS
	Template.admin.eventname = function (){
		if(Session.get("admin")){
			eventObject = Events.findOne({"_id": Session.get("event")});
			return eventObject.name;
		}
	};

	Template.admin.getAllQuestions = function (){
		return Questions.find({"eventId": Session.get("event")},{sort: {upvotes: -1}});
	};
	Template.admin.events({
		'click img': function (event){
			var img_id = event.currentTarget.className;
			//send email with all questions
			//change 
			if(img_id=="endEvent"){
				Session.set("admin", false);
				Session.set("page", "home");
			}
		}
	});


//JOIN JS
	Template.join.getAllEvents = function() {
		return Events.find({}, {fields: {"passcode":0, "eventemail":0}}, {limit: 100});
	};

	Template.join.events({
		'click li': function (event){
			var li_id = event.currentTarget.className;
			Session.set("page","spec");
			Session.set("event", li_id);
		}
	});


//SPEC JS
	Template.spec.eventname = function (){
		eventObject = Events.findOne({"_id": Session.get("event")});
		return eventObject.name;
	};

	Template.spec.getAllQuestions = function (){
		return Questions.find({"eventId": Session.get("event")},{sort: {upvotes: -1}});
	};

	Template.spec.events({
		'click img': function (event){
			var img_id = event.currentTarget.className;
			if(img_id=="backbutton"){
				Session.set("page", "home");
				Session.set("event", undefined);
			}else if(img_id=="submitquestion"){
				var question = document.getElementById("newquestion").value.trim();
				if (question !=="" || question!==null){
					submitquestion(question, Session.get("event"));
				}
				//else error message
			}
		},
		'click li': function (event){
			var question_id = event.currentTarget.className;
			console.log(question_id);
			updatevote(question_id);
		}
	});
}


//HELPER FUNCTIONS
function createEvent(eventname, eventlocation, eventspeaker, eventemail){
	var code = Math.floor(Math.random()*90000) + 10000;
	Events.insert({name: eventname, location: eventlocation, speaker: eventspeaker, email: eventemail, passcode: code});
	var eventId = Events.findOne({"name": eventname});
	eventId = eventId._id;
	Session.set("admin", true);
	Session.set("event", eventId);
	Session.set("page", "admin");
}

function submitquestion(text, eventID){
	Questions.insert({eventId: eventID, question: text, upvotes: 0, current: 0, asked: 0});
	document.getElementById("newquestion").value = "";
}

function updatevote(question_id){
	var upvotes = Questions.findOne({"_id": question_id});
	upvotes = upvotes.upvotes;
	upvotes = upvotes +1;
	Questions.update({"_id":question_id},{$set: {upvotes: upvotes}});
}




	// Template.admin.passcode = function (){
	// 	if(Session.get("admin")){
	// 		eventObject = Events.findOne({"_id": Session.get("event")});
	// 		return eventObject.passcode;
	// 	}
	// };
