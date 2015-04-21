GET http://api.dailymile.com/routes/id.gpx

(function() {
    //best practice to define variables right at the beginning of a function.
    var NearbyStream,
        Radius,
        PostalCode;
   
    
    
NearbyStream = Backbone.Model.extend({
        url:function () {
            //a return could be used for stuff that you keep using over and over again. for example you could use it to do math for you.
            return 'http://api.wunderground.com/api/7eaec3b21b154448/conditions/q/' + this.get('zip') + '.json';
        },
        sync: function (method, model, options) {
			options.dataType = 'jsonp';
			return Backbone.sync(method, model, options);
        },
        //has one peramiter called options. this is when a model gets created, when we use the search field. it will call this validate function to make sure that the information is valid however we deem that do be. this is a very simple validation code. we are just checking to see if there is text in that field. it is saying if there is no options in the form field then return please enter a zip code.
        validate: function (options) {
			if (!options.zip) {
				return 'Please enter a zip code'
			}
        },
        //this will parse through the results that the client just searched for using the inputs from the form fields. this updates how we will store that data in our collection
        parse: function (data, request) {
			var observation = data.current_observation;
			return {
                //each time we enter in a new zip code, it is checking to make sure out zipcode is valid. if it is valid. it is going to get the data from the url and then will parse the information. we will then tie this data together and pick in choose what we particularly want to focus on.
				id: observation.display_location.zip,
				url: observation.icon_url,
				state: observation.display_location.state_name,
				zip: observation.display_location.zip,
				city: observation.display_location.city,
				temperature: observation.temp_f,
				wind: observation.wind_mph,
				feelslike: observation.feelslike_f,
				image: observation.image.url
			}
		}
    });
        
        