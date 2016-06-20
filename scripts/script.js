console.log('script.js');
$(document).ready(function(){
  $('#addAnimal').on('click', function(){
    var animal = $('#animalInput').val();
    //generating object
    var inputObject = {
      "animal": animal
    };
    console.log(inputObject);
    console.log(inputObject.animal);
    console.log('wat');
  });
});
