var MyModel = Backbone.Model.extend({
	defaults : {
	},

	initialize : function Doc() {
    console.log('Doc Constructor');
	},
});

var MyView = Marionette.ItemView.extend({
	template: "#template1",

	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
	},

	render: function() {
		alert("We're rendering the view !");
	},

	onClose: function() {
		console.log('Closing the view...');
	}
});

var myModel = new MyModel({
	firstName: 'Thierry',
	lastName: 'Falvo',
	email: 'thierry.falvo@gmail.com'
});

var myRegion = new Marionette.Region({
	el: '#content'
});

var view1 = new MyView({
	model: myModel
});

var view2 = new MyView({
	model: myModel
});

//myModel.set('email', 'tfalvo@delfingen.com');


var MyApp = new Backbone.Marionette.Application();

MyApp.addRegions({
	main: "#content"
});

MyApp.addInitializer(function(options) {
	this.mysettings = "Hello";
	console.log('Initialize my new cool application');
});

MyApp.on("initialize:after", function(options){
	Backbone.history.start();
	console.log("Test to access to private data = " + MyApp.MyModule.privateData);	
	console.log("Test to access to public data = " + MyApp.MyModule.publicData);	
	console.log("Test to launch private method = ");
  if (!MyApp.MyModule.privateMethod)
		console.log("This method is not visible !");
	console.log("Test to launch public method = ");
  MyApp.MyModule.publicMethod();
});


MyApp.module("MyModule", function(MyModule, App){

	var privateData = "Ceci est privé";
	var privateMethod = function() {
		console.log("private method is called !");
	}

	MyModule.publicData = "Ceci est public";
	MyModule.publicMethod = function() {
		console.log("public method is called, " + privateData + ", mysettings = " + App.mysettings);
	}

	Foo.addInitializer(function(){
		console.log("My module is initialized !");
	});
});








