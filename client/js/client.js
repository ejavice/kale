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

}