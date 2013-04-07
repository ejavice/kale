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
	Template.content.settings = function(){
		if (Session.equals("page","settings")){
			return true;
		}else{
			return false;
		}
	};

// SETTINGS JS
	Template.settings.events({
		'click img': function (event){
			var img_id = event.currentTarget.className;
			if (img_id == "backbutton") {
				Session.set("page", "home");
				Session.set("event", undefined);
			}
		},
		'touchleave img': function (event){
			var img_id = event.currentTarget.className;
			if (img_id == "backbutton") {
				Session.set("page", "home");
				Session.set("event", undefined);
			}
		}
	});


// HOME JS
	Template.home.events({
		'click img': function (event) {
			var img_id = event.currentTarget.className;
			if (img_id == "settings") {
				Session.set("page", "settings");
			}
		},
		'touchleave img': function (event) {
			var img_id = event.currentTarget.className;
			if (img_id == "settings") {
				Session.set("page", "settings");
			}
		},
		'click li': function (event){
			var li_id = event.currentTarget.className;
			Session.set("page",""+li_id);
		},
		'touchleave li': function (event){
			var li_id = event.currentTarget.className;
			Session.set("page",""+li_id);
		}
	});


// CREATE JS
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
		},
		'touchleave img': function (event){
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


// ADMIN JS
	Template.admin.eventname = function (){
		if(Session.get("admin")){
			eventObject = Events.findOne({"_id": Session.get("event")});
			return eventObject.name;
		}
	};

	Template.admin.getAllQuestions = function (){
		return Questions.find({"eventId": Session.get("event")},{sort: {current: -1, upvotes: -1}});
	};

	Template.admin.events({
		'click img': function (event) {
			var img_id = event.currentTarget.className;
			//send email with all questions
			//change 
			if (img_id == "endevent") {
				Session.set("admin", false);
				Session.set("page", "home");
				eventObject = Events.findOne({"_id": Session.get("event")});
				var event_id = eventObject._id;
				console.log(event_id);
				removeevent(event_id);
			}
		},
		'touchleave img': function (event){
			var img_id = event.currentTarget.className;
			//send email with all questions
			//change 
			if (img_id == "endevent") {
				Session.set("admin", false);
				Session.set("page", "home");
				eventObject = Events.findOne({"_id": Session.get("event")});
				var event_id = eventObject._id;
				console.log(event_id);
				removeevent(event_id);
			}
		},
		'click li': function (event) {
			var question_id = event.currentTarget.className;
			makecurrent(question_id);
		},
		'touchleave li': function (event) {
			var question_id = event.currentTarget.className;
			makecurrent(question_id);
		}
	});


// JOIN JS
	Template.join.getAllEvents = function() {
		return Events.find({}, {fields: {"eventemail":0}}, {limit: 100});
	};

	Template.join.events({
		'click img': function (event){
			var img_id = event.currentTarget.className;
			if (img_id == "backbutton") {
				Session.set("page", "home");
				Session.set("event", undefined);
			}
		},
		'touchleave img': function (event){
			var img_id = event.currentTarget.className;
			if (img_id == "backbutton") {
				Session.set("page", "home");
				Session.set("event", undefined);
			}
		},
		'click li': function(event){
			var li_id = event.currentTarget.className;
			Session.set("page","spec");
			Session.set("event", li_id);
		},
		'touchleave li': function(event){
			var li_id = event.currentTarget.className;
			Session.set("page","spec");
			Session.set("event", li_id);
		}
	});

// SPEC JS
	Template.spec.eventname = function (){
		eventObject = Events.findOne({"_id": Session.get("event")});
		return eventObject.name;
	};

	Template.spec.getAllQuestions = function (){
		return Questions.find({"eventId": Session.get("event")},{sort: {current: -1, upvotes: -1}});
	};

	Template.spec.events({
		'click img': function (event){
			var img_id = event.currentTarget.className;
			if (img_id == "backbutton") {
				Session.set("page", "join");
				Session.set("event", undefined);
			} else if(img_id=="submitquestion"){
				var question = document.getElementById("newquestion").value.trim();
				if (question !=="" || question!==null){
					submitquestion(question, Session.get("event"));
				}
				//else error message
			}
		},
		'touchleave img': function (event){
			var img_id = event.currentTarget.className;
			if(img_id=="backbutton"){
				Session.set("page", "join");
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
			updatevote(question_id);
		},
		'touchleave li': function (event){
			var question_id = event.currentTarget.className;
			updatevote(question_id);
		},
		'keypress': function(event) {
			//Console.log(event);
			if (event.which === 13) {
				var question = document.getElementById("newquestion").value.trim();
				if (question !=="" || question!==null){
					submitquestion(question, Session.get("event"));
				}
			}
		}
	});

	Template.about.events({
		'click img': function (event){
			var img_id = event.currentTarget.className;
			if(img_id=="backbutton"){
				Session.set("page", "home");
			}
		},
		'touchleave img': function (event){
			var img_id = event.currentTarget.className;
			if(img_id=="backbutton"){
				Session.set("page", "home");
			}
		}
	});

//highlight current

	Template.admin.rendered = function (){
		$(document).ready(function (){
			var current = Session.get("current");
			if(current!==undefined ){
				$('.'+current).css({"background-color":"#009D20"});
			}
			var previous = Session.get("previous");
			if(previous!==undefined ){
				$('.'+previous).css({"background-color":"white"});
			}
		});
	};

	Template.spec.rendered = function (){
		$(document).ready(function (){
			var current = Session.get("current");
			if(current!==undefined ){
				$('.'+current).css({"background-color":"#009D20"});
			}
			var previous = Session.get("previous");
			if(previous!==undefined ){
				$('.'+previous).css({"background-color":"white"});
			}
		});
	};
}



// HELPER FUNCTIONS
function createEvent(eventname, eventlocation, eventspeaker, eventemail) {
	//Console.log(eventname)
	if (eventname.trim() !== "" && eventname !== null && eventlocation.trim() !== "" && eventlocation !== null && eventemail.trim() !== "" && eventemail !== null) {
		Events.insert({name: eventname, location: eventlocation, speaker: eventspeaker, email: eventemail});
		var eventId = Events.findOne({"name": eventname});
		eventId = eventId._id;
		Session.set("admin", true);
		Session.set("event", eventId);
		Session.set("page", "admin");
	}
}

function submitquestion(text, eventID){
	if (text !== null && text !== "") {
		Questions.insert({eventId: eventID, question: text, upvotes: 0, current: 0});
		document.getElementById("newquestion").value = "";
	}
}

function updatevote(question_id) {
	var upvotes = Questions.findOne({"_id": question_id});
	upvotes = upvotes.upvotes;
	if (Session.equals(question_id, undefined)) {
		upvotes = upvotes + 1;
		Questions.update({"_id":question_id},{$set: {upvotes: upvotes}});
		Session.set(question_id, true);
	}
}

function makecurrent(question_id) {
	var previous = Questions.findOne({current: 1});
	if(previous === undefined){
		Questions.update({"_id":question_id},{$set: {current: 1}});
		Session.set("current", question_id);
	}else{
		previous = previous._id;
		Questions.update({"_id":previous},{$set: {current: -1}});
		Session.set("previous",previous);
		Questions.update({"_id":question_id},{$set: {current: 1}});
		Session.set("current", question_id);
	}
}

function removeevent(event_id) {
	Events.remove({"_id":event_id});
	Questions.remove({"eventId":event_id});
}
