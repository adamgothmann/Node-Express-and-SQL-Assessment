console.log('script.js');
$(document).ready(function(){
  $('#addAnimal').on('click', function(){
    var animal = $('#animalInput').val();
    //generating object
    var inputObject = {
      "animal": animal
    };
    console.log(inputObject);
    $.ajax({
      type: 'POST',
      url: '/addAnimal',
      data: inputObject,
    });//end ajax
    $('#animalInput').val('');
    updateDom();
  });//end addAnimal button
});//end jQuery

var updateDom = function(){
  $('#outputDiv').empty();
  $.ajax({
    type: 'GET',
    url: '/getAnimal',
    success: function(data){
      console.log(data);
      showAnimal(data);

    } //end success
  }); //end retrieveItem ajax
};

function showAnimal(users){
  for(i = 0; i <users.length; i++){
    var output = "<p>" + users[i].animal + "</p>";
    $('#outputDiv').append(output);
  }
}
