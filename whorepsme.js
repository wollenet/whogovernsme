// Initialize Firebase
var config = {
  apiKey: "AIzaSyB2-pE3_FGF9wlHzo5wIcCRqqGF2fTLSng",
  authDomain: "whosemyrep.firebaseapp.com",
  databaseURL: "https://whosemyrep.firebaseio.com",
  projectId: "whosemyrep",
  storageBucket: "whosemyrep.appspot.com",
  messagingSenderId: "476733926178"
};

firebase.initializeApp(config);

//
var senate = 0;
var congress;
var state = localStorage.getItem('state')
var localSenate = [];
var localCongress = [];
var iterationStop = 0;
var searchCounter = [];

//
var database = firebase.database();

  database.ref().on('child_added', function(snapshot) {
  searchCounter = snapshot.val();
  console.log(snapshot.val());
  $('#last_searched').text('Last Search: ' + searchCounter[(searchCounter.length-1)]);
});
  
console.log(searchCounter)

//
$.ajax({ 
  url: 'https://api.propublica.org/congress/v1/115/senate/members.json',
  method: 'GET',
  headers: {
   'X-API-Key': "kIwNMkbkFvAvXtl5SnzYqQ7AMLtfEdQ9wPaVOumy" 
}
 }).done(function(response) {
  console.log(response);
  senate = response;
  console.log(response.results[0].members[0].first_name);
 });

//
$.ajax({ 
  url: 'https://api.propublica.org/congress/v1/115/house/members.json',
  method: 'GET',
  headers: {
   'X-API-Key': "kIwNMkbkFvAvXtl5SnzYqQ7AMLtfEdQ9wPaVOumy" 
  }
}).done(function(response) {
  console.log(response);
  congress = response;
  console.log(response.results[0].members[0].first_name);
  searchSenateByState();
  searchCongressByState();
  console.log(localSenate);
  console.log(localCongress);
  renderSenate();
  renderCongress();
});

console.log(senate);

//
function searchSenateByState() {
  //
  if (iterationStop == 0) {
    // use a loop to run through each array entry and set the qualifying results to variables.
    for (i = 0; i < senate.results[0].members.length; i++) {
      //    
      if (senate.results[0].members[i].state == state) {
       localSenate.push (senate.results[0].members[i]);
      };
    };
  };
};

//
function searchCongressByState() {
  //
  if (iterationStop == 0) {
    // searchCounter.push(state);
    // database.ref().set ({
    //   searchCounter: searchCounter,
    // });
    //  
    for (i = 0; i < congress.results[0].members.length; i++) {
      //
      if (congress.results[0].members[i].state == state) {
      localCongress.push(congress.results[0].members[i]);
      };
    };
  };
}; 

// 
function renderSenate() {
  //
  if (iterationStop == 0) {
    //
    for (i = 0; i < localSenate.length; i++) {
      //
      $('<div>', {
       id: 'senate_placeholder' + i,
       class: 'senate_placeholder', 
      }).appendTo('.senate-results');
      //
      $('<p>',{
       id: 'senate_name' + i,
       class: 'senate_name',
       text: localSenate[i].first_name + " " + localSenate[i].last_name, 
      }).appendTo('#senate_placeholder' + i);
      //
      $('<div>',{
       id: 'senate_img' + i,
       class: 'senate_img',
       alt: 'figure out pictures, kyle'
      }).appendTo('#senate_placeholder');
      //
      $('<p>',{
       id: 'senate_dob' + i,
       class: 'senate_dob',
       text: "Born: " + moment(localSenate[i].date_of_birth).format('LL')
      }).appendTo('#senate_placeholder' + i);
      //
      $('<p>',{
       id: 'senate_state' + i,
       class: 'senate_state',
       text: 'State: '+ localSenate[i].state,
      }).appendTo('#senate_placeholder' + i);
      //
      $('<p>',{
       id: 'senate_party' + i,
       class: 'senate_party',
       text:"Party: " + localSenate[i].party,
      }).appendTo('#senate_placeholder' + i);
       //
      $('<p>',{
       id: 'senate_votes_with_party_pct' + i,
       class: 'senate_votes_with_party_pct',
       text: "Votes With Party Percentage: " + localSenate[i].votes_with_party_pct + '%',
      }).appendTo('#senate_placeholder' + i);
      // displays leadership role if one exists
      // if (localSenate[i].leadership_role != null) {
      //   $('<p>',{
      //    id: 'senate_leadership' + i,
      //    class: 'senaate_leadership',
      //    text: 'leadership role:' + localSenate[i].leadership_role,
      //   }).appendTo('#senate_placeholder' + i);
      // };
      //
      $('<p>',{
       id: 'senate_phone' + i,
       class: 'senate_phone',
       text: 'Phone Number: ' + localSenate[i].phone,
      }).appendTo('#senate_placeholder' + i);
      // displays next election date
      $('<p>',{
       id: 'senate_next_election' + i,
       class: 'senate_next_election',
       text: 'Next Election: ' + localSenate[i].next_election,
      }).appendTo('#senate_placeholder' + i);
      // displays senate contact form
      $('<a>',{
       id: 'senate_contact_form' + i,
       class: 'senate_contact_form',
       href: localSenate[i].contact_form,
       target: '_blank'
      }).appendTo('#senate_placeholder' + i);
      // displays contact form icon
      $('<i>',{
       class: "fas fa-envelope-square fa-3x"
      }).appendTo('#senate_contact_form' + i);
      // displays facebook info if it exists
      if (localSenate[i].facebook_account != null) {
        $('<a>',{
         id: 'senate_facebook' + i,
         class: 'senate_facebook',
         href: 'https://facebook.com/' + localSenate[i].facebook_account,
         target: '_blank'
        }).appendTo('#senate_placeholder' + i);
        $('<i>',{ 
         class: "fab fa-facebook fa-3x",
        }).appendTo('#senate_facebook' + i);
      };  
      // displays twitter info if it exists
      if(localSenate[i].twitter_account != null) {
        $('<a>',{
         id: 'senate_twitter' + i,
         class: 'senate_twitter',
         href: 'https://twitter.com/' + localSenate[i].twitter_account,
         target: '_blank'
       }).appendTo('#senate_placeholder' + i);
        $('<i>',{
         class: "fab fa-twitter-square fa-3x"
        }).appendTo('#senate_twitter' + i);
      };
      // displays youtube info if it exists
      if (localSenate[i].youtube_account != null) {
        $('<a>',{
         id: 'senate_youtube' + i,
         class: 'senate_youtube',
         href: 'https://youtube.com/' + localSenate[i].youtube_account,
         target: '_blank'
        }).appendTo('#senate_placeholder' + i);
        $('<i>',{
         class: "fab fa-youtube fa-3x"
        }).appendTo('#senate_youtube' + i);
      }; 
    };
  };
};

// 
function renderCongress() {
  // 
  if (iterationStop == 0) {
    // 
    for (i = 0; i < localCongress.length; i++) {
      //
      $('<div>',{
       id: 'congress_placeholder' + i,
       class: 'congress_placeholder', 
      }).appendTo('.house-results');
      //
      $('<p>',{
       id: 'congress_name' + i,
       class: 'congress_name',
       text: localCongress[i].first_name + " " + localCongress[i].last_name, 
      }).appendTo('#congress_placeholder' + i);
      //
      // $('<img>',{
      //  id: 'congress_img' + i,
      //  class: 'congress_img',
      // }).appendTo('#congress_placeholder' + i);
      // //
      $('<p>',{
       id: 'congress_dob' + i,
       class: 'congress_dob',
       text: "Born: " + moment(localCongress[i].date_of_birth).format('LL')
      }).appendTo('#congress_placeholder' + i);
      //
      $('<p>',{
       id: 'congress_state' + i,
       class: 'congress_state',
       text: 'State: '+ localCongress[i].state,
      }).appendTo('#congress_placeholder' + i);
      //
      $('<p>',{
       id: 'congress_party' + i,
       class: 'congress_party',
       text:"Party: " + localCongress[i].party,
      }).appendTo('#congress_placeholder' + i);
      //
      $('<p>',{
       id: 'congress_votes_with_party_pct' + i,
       class: 'congress_votes_with_party_pct',
       text: "Votes With Party Percentage: " + localCongress[i].votes_with_party_pct + '%',
      }).appendTo('#congress_placeholder' + i);
      // 
      // if (localCongress[i].leadership_role != null) {
      //   $('<p>',{
      //    id: 'congress_leadership' + i,
      //    class: 'senaate_leadership',
      //    text: 'leadership role:' + localCongress[i].leadership_role,
      //   }).appendTo('#congress_placeholder' + i);
      // };  
      //
      $('<p>',{
       id: 'congress_phone' + i,
       class: 'congress_phone',
       text: 'Phone_number: '+ localCongress[i].phone,
      }).appendTo('#congress_placeholder' + i);
      //
      $('<p>',{
       id: 'congress_next_election' + i,
       class: 'congress_next_election',
       text: 'Next Election: ' + localCongress[i].next_election,
      }).appendTo('#congress_placeholder' + i);
      // 
      if(localCongress[i].contact_form != null){
      $('<a>',{
       id: 'congress_contact_form' + i,
       class: 'congress_contact_form',
       href: localCongress[i].contact_form,
       target: '_blank'
      }).appendTo('#congress_placeholder' + i);
      //
      $('<i>',{
       class: "fas fa-envelope-square fa-3x"
      }).appendTo('#congress_contact_form' + i);
      }
      //
      if (localCongress[i].facebook_account != null) {
        $('<a>',{
         id: 'congress_facebook' + i,
         class: 'congress_facebook',
         href: 'https://facebook.com/' + localCongress[i].facebook_account,
         target: '_blank'
        }).appendTo('#congress_placeholder' + i);
        $('<i>',{ 
         class: "fab fa-facebook fa-3x",
        }).appendTo('#congress_facebook' + i);
      };
      // 
      if (localCongress[i].twitter_account != null) {
        $('<a>',{
         id: 'congress_twitter' + i,
         class: 'congress_twitter',
         href: 'https://twitter.com/' + localCongress[i].twitter_account,
         target: '_blank'
        }).appendTo('#congress_placeholder' + i);
        $('<i>',{
         class: "fab fa-twitter-square fa-3x"
        }).appendTo('#congress_twitter' + i);
      };
      //  
      if (localCongress[i].youtube_account != null) {
        $('<a>',{
         id: 'congress_youtube' + i,
         class: 'congress_youtube',
         href: 'https://youtube.com/' + localCongress[i].youtube_account,
         target: '_blank'
        }).appendTo('#congress_placeholder' + i);
        $('<i>',{
         class: "fab fa-youtube fa-3x"
        }).appendTo('#congress_youtube' + i);
      };
    };
  };
};
//
function populateData(x) {
  for (i = 0; i < x .length; i++) {
    $('#senate' + i).text(grabFirstName(x,i));
     console.log(x);
  };
};
//
$('#submit').on('click', function() {
  console.log(searchCounter)
});
//
$('#submit').on('click', function() {
  state = $('#Select1').val();
  localStorage.setItem('state', state)
    searchCounter.push(state);
    database.ref().set ({
    searchCounter: searchCounter,
  })
  // searchSenateByState();
  // searchCongressByState();
  // console.log(localSenate);
  // console.log(localCongress);
  // renderSenate();
  // renderCongress();
  iterationStop = 1;
});