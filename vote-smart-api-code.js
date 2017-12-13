var senate = 0;
var congress;
var state = 'OH';
var localSenate = [];
var localCongress = [];
var iterationStop = 0;
var searchCounter = [];
function displaySenateBioPicture() {

        // ajax call to get list of all active senators -- this is the only way to limit the size of the info to just active members
        var queryURL = "http://api.votesmart.org/Officials.getByOfficeState?key=0596244db78cb117c001622fd8dd6c56&officeId=6";
        
        $.ajax({
          url: queryURL,

          method: "GET",

          dataType: 'text',

        }).done(function(response) {
          
          // below is the code to convert XML text from API to JSON 
          var x2js = new X2JS();
          var xmlText = response;
          var jsonObj = x2js.xml_str2json(xmlText);
          //console logging the response
          console.log("jsonObj", jsonObj);

          // console.log(jsonObj.candidateList.candidate[1].candidateId);

          // var candidateId = jsonObj.candidateList.candidate[i].candidateId;

          // var firstName = jsonObj.candidateList.candidate[i].firstName;
          // console.log(firstName);

          // var lastName = jsonObj.candidateList.candidate[i].lastName;
          // console.log(lastName);




          // // looping through senate list call
          var firstName
          var lastNameId
          var candidate
          var jsonSenatePhoto=[];
          for (var i = 0; i < localSenate.length; i++) {

            candidateId = jsonObj.candidateList.candidate[i].candidateId;
            firstName = jsonObj.candidateList.candidate[i].firstName; 
            lastName = jsonObj.candidateList.candidate[i].lastName;

            console.log(firstName+ " " + lastName + localSenate[i])

          // comparing to results from the localSenate array. If match, it runs the second call to pull photo info 
            if (firstName + " " + lastName == localSenate[i]) {


            // API call to retrieve candidate photo using the referenced candidateId
              var queryURL = "http://api.votesmart.org/CandidateBio.getBio?key=0596244db78cb117c001622fd8dd6c56&candidateId=" + candidateId;

               $.ajax({
               url: queryURL,

               method: "GET",

               dataType: 'text',

              }).done(function(response) {
                var x2js = new X2JS();
                var xmlText = response;
                var jsonObj = x2js.xml_str2json(xmlText);
                jsonSenatePhoto.push(jsonObj.bio.candidate.photo);
                console.log("jsonObj", jsonObj);
                console.log(jsonObj.bio.candidate.photo);
                console.log(jsonSenatePhoto);
                if (localSenate.length == jsonSenatePhoto.length){
                  for (i=0; i <localSenate.length; i++) {
                $('<div>', {
                id: 'senate_placeholder' + i,
                class: 'senate_placeholder', 
                }).appendTo('.container');
      
                $('<img>',{
                id: 'senate_photo' + i,
                class: 'senate_photo',
                src: jsonSenatePhoto[i],
                }).appendTo('#senate_placeholder' + i);

                  }
                }


               


                
            
                
                
                })// closes call

 
             

              

              

            } // closes if 

        else {

          } // closes else

            
          } // closes for-loop


          

          

        })// closes first API call

        




     } // closes function 



displaySenateBioPicture();

function displayCongressBioPicture() {

        // ajax call to get list of all active senators -- this is the only way to limit the size of the info to just active members
        var queryURL = "http://api.votesmart.org/Officials.getByOfficeState?key=0596244db78cb117c001622fd8dd6c56&officeId=5";
        
        $.ajax({
          url: queryURL,

          method: "GET",

          dataType: 'text',

        }).done(function(response) {
          
          // below is the code to convert XML text from API to JSON 
          var x2js = new X2JS();
          var xmlText = response;
          var jsonObj = x2js.xml_str2json(xmlText);
          //console logging the response
          console.log("jsonObj", jsonObj);

          // console.log(jsonObj.candidateList.candidate[1].candidateId);

          // var candidateId = jsonObj.candidateList.candidate[i].candidateId;

          // var firstName = jsonObj.candidateList.candidate[i].firstName;
          // console.log(firstName);

          // var lastName = jsonObj.candidateList.candidate[i].lastName;
          // console.log(lastName);




          // // looping through senate list call
          var firstName
          var lastNameId
          var candidate
          var jsonCongressPhoto=[];
          for (var i = 0; i < localCongress.length; i++) {

            candidateId = jsonObj.candidateList.candidate[i].candidateId;
            firstName = jsonObj.candidateList.candidate[i].firstName; 
            lastName = jsonObj.candidateList.candidate[i].lastName;

            console.log(firstName+ " " + lastName + localCongress[i])

          // comparing to results from the localSenate array. If match, it runs the second call to pull photo info 
            if (firstName + " " + lastName == localCongress[i]) {


            // API call to retrieve candidate photo using the referenced candidateId
              var queryURL = "http://api.votesmart.org/CandidateBio.getBio?key=0596244db78cb117c001622fd8dd6c56&candidateId=" + candidateId;

               $.ajax({
               url: queryURL,

               method: "GET",

               dataType: 'text',

              }).done(function(response) {
                var x2js = new X2JS();
                var xmlText = response;
                var jsonObj = x2js.xml_str2json(xmlText);
                jsonCongressPhoto.push(jsonObj.bio.candidate.photo);
                console.log("jsonObj", jsonObj);
                console.log(jsonObj.bio.candidate.photo);
                console.log(jsonCongressPhoto);
                if (localCongress.length == jsonCongressPhoto.length){
                  for (i=0; i <localCongress.length; i++) {
                $('<div>', {
                id: 'congress_placeholder' + i,
                class: 'congress_placeholder', 
                }).appendTo('.container');
      
                $('<img>',{
                id: 'congress_photo' + i,
                class: 'congress_photo',
                src: jsonCongressPhoto[i],
                }).appendTo('#congress_placeholder' + i);

                  }
                }


               


                
            
                
                
                })// closes call

 
             

              

              

            } // closes if 

        else {

          } // closes else

            
          } // closes for-loop


          

          

        })// closes first API call

        




     } // closes function 



displayCongressBioPicture();