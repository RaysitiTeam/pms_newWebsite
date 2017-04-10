//Name: treatments.js
//Description: All jQuery scripts related to treatments.html
(function($){
  var $myDom = $('.sidebar-header').click(function(){
    var $sidebar = $('.sidebar-navigation');
    $sidebar.toggle( "slide" ); // Slide the sidebar-navigation to 100%;
    $('.loginDashboard').toggle("slide");
  });//end:toggleSidebar
}(jQuery));

(function($){
  //Script to invoke click function on treatments
  $(".view-details").click(function() {
    // NOTE: Selecting all the columns of the record clicked
    // var rowNumber = $(this).data("rowNumber");
    // console.info("Row selected is : ",rowNumber);
    var $rowDom = $(this).parent().parent(); // get the entire tr tag as dom
    var $treatmentInputDomList = $rowDom.find('.treatment-inputs');
    console.log('all treatment inputs elements list', $treatmentInputDomList);
    //NOTE: Selecting all the elements of the modal window
    var $treatmentValuesDomList = $('#treatments-modal').find('.treatment-values');
    console.log('all treatment value elements list', $treatmentValuesDomList);
    //Map the input elements with modal elements
    mapValue($treatmentValuesDomList,$treatmentInputDomList);
    console.log('Mapping done!');
});

function mapValue($modalRootDom, $treatmentDom){
  //TODO: Mapping of treatment columns with modal elements
  $treatmentDom.each(function(i,el){
    var className = el.className;
    // console.log('Class name of the element is: ', className);
    switch(className){
      case 'treatment-inputs record-id':
        $modalRootDom.siblings('.record-id')[0].innerText = el.innerText;
        break;
      case 'treatment-inputs record-number':
        $modalRootDom.siblings('.record-id')[0].innerText = el.innerText;
        break;
      case 'treatment-inputs record-name':
        $modalRootDom.siblings('.record-name')[0].innerText = el.innerText;
        break;
      case 'treatment-inputs record-description':
        $modalRootDom.siblings('.record-description')[0].innerText = el.innerText;
        break;
      case 'treatment-inputs record-patient':
        $modalRootDom.siblings('.record-patient')[0].innerText = el.innerText;
        break;
      case 'treatment-inputs record-status':
        $modalRootDom.siblings('.record-status')[0].innerText = el.innerText;
        break;
      case 'treatment-inputs hidden-div record-start-date':
        $modalRootDom.siblings('.record-start-date')[0].innerText = el.innerText;
        break;
      case 'treatment-inputs hidden-div record-total-treatment-cost':
        $modalRootDom.siblings('.record-total-treatment-cost')[0].innerText = el.innerText;
        break;
      case 'treatment-inputs hidden-div record-total-ins-payment':
        $modalRootDom.siblings('.record-total-ins-payment')[0].innerText = el.innerText;
        break;
      case 'treatment-inputs hidden-div record-total-co-payment':
        $modalRootDom.siblings('.record-total-co-payment')[0].innerText = el.innerText;
        break;
      case 'treatment-inputs hidden-div record-total-ins-payment':
        $modalRootDom.siblings('.record-total-ins-payment')[0].innerText = el.innerText;
        break;
    }
  });//end:each
}//end:mapValue

}(jQuery));//jQuery iife
