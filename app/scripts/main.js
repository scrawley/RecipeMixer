(function ($) {
    var getEntries,
        parseEntries, //formatting data in a way that makes sense
        displayEntries,
       
    //first function
    getEntries = function getEntries() {
        //ajax request to get information
        var req,
          form = $('#madlibform');

      form.on('submit', function (event) {
        var value = $('#cookingdays').val();
          var value = $('#diet').val();
          var value = $('#allowedingredient').val();
         
          
          //use on any of those events that we listen to. this call tells the browser that on submit don't do what it normally does, such as send to a php form.
        event.preventDefault();
          
            //making sure there was actually a value in that input. If was not empty, we take that request and send it to dribbble
        if (value !== "") {
          req = $.ajax({
            url: 'http://api.yummly.com/v1/api/recipes',
            dataType: 'jsonp',
            type: 'GET',
            data: {
                "_app_id": "2017af13",
                "_app_key": "416b7b6ca38cf6524edc8181937b2ac3",
                "q": ,
                "allowedDiet[]":,
                "requirePictures": true,
                "allowedIngredient[]":,
                "maxResult": 
            }
          });

          req.done(parseEntries);

          req.error(function (data, error){
            alert(error);
          });
        } else {
          alert('Please enter a value');
        };

      });

    };
    
     parseEntries = function parseEntriesF(data) {
        var i = 0,
            shots = data.shots;
        
        //for loop that loops through each of the shots
        for (i = shots.length; i--;) {
          resultsArr.push(shots[i]);
            
            //pushing a new entry into that array
          shotsArr.push({
            id: shots[i].id,
            title: shots[i].title,
            image_url: shots[i].image_url,
            likes_count: shots[i].likes_count,
            player_name: shots[i].player.name,
            player_location: shots[i].player.location
          });

          totalLikes = totalLikes + shots[i].likes_count;
        }

        displayEntries();
    };
    
    //this is where we draw our content on the page
    displayEntries = function displayEntriesF() {
      console.log(resultsArr);
        //storing content id as a variable
      var $content = $('#content');
        //creating a table tag, giving it classes and ids. This was created outside of the for loop
      
        var shots = doT.template( $('#shot-template') [0].text );
        //template is expecting data to come as an object
        var data = {
            'array': shotsArr
        };
        //to content, we are going to append the info returned from the shots function created by doT.js
        console.log(shots(data));
        $content.append(shots(data));
      displayCharts();
    };


    displayCharts = function displayChartsF() {
      for (var i = shotsArr.length - 1; i >= 0; i--) {
        var shot = shotsArr[i];
        console.log('#chart-' + shot.id);
        var $chart = $('#chart-' + shot.id);
        var $map = $('#map-' + shot.id);
          
        var mapOptions = {
            center: {
                lat: 39.2833,
                lng: -76.6167
            },
            zoom: 8
        };
          
        //var object = {}; 
        //var object = new Object(); This creation pattern of creating an object and then assigning it to a new version of whatever we are working with is used often times by other programming libraries and is useful when we want to create these new objects based on an existing set of data
          //selecting first item in the array 
        var map = new google.maps.Map($map[0], mapOptions);
          

        var ctx = $chart[0].getContext('2d');
        var polarChart = new Chart(ctx).Doughnut([{
            //pass in an array of information
          value: shot.likes_count,
          color:"#F7464A",
          highlight: "#FF5A5E",
          label: shot.player_name
        },{
          value: totalLikes,
          color: '#ccc'
        }]);
          
          
          
      }
    };

    getEntries();//calling the first function that kicks everything off

})(jQuery);
