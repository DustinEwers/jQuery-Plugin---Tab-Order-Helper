/*
 * 		Author: Dustin Ewers
 * 		Date: 9/23/2011
 * 		Description: The tab order helper abstracts the tab index property 
 * 			and allows developers to use a linked list to control tab order on web forms.  
 * 		 
 */

(function( $ ){
	var methods  = {
		setTabOrder : function (){ 
		function processNextValue(element, arrayToSort, sortedArray){
				// find that array item and push it into the stack
				var atsLen = arrayToSort.length;
				for(i=0;i<atsLen;i++){
					if(arrayToSort[i].id === $(element).data('nextField'))
					{
						// if we find that element, we pull it out of the stack and add it to the sorted list
						sortedArray.push(arrayToSort[i]);
						var removedElement = arrayToSort.splice(i,1);
						// if that element also has a next field, you call the process method 
						if($(removedElement).data('nextField'))
						{
							processNextValue(removedElement, arrayToSort, sortedArray)
						}
						break;				
					}
				}
			}			
						
			var currentTabIndex = 0,
				oeLength = 0,
				elementsToSort = $("a, area, button, input, select, textarea"),
				sortedElements = new Array();

			
			while(elementsToSort.length > 0){
				var elementToCheck = elementsToSort.splice(0,1);
				sortedElements.push(elementToCheck);
				if($(elementToCheck).data('nextField')){
					processNextValue(elementToCheck, elementsToSort, sortedElements);						
				}
			}

			// set the tab order
			oeLength = sortedElements.length;
			for(currentTabIndex = 0;currentTabIndex < oeLength;currentTabIndex++){
				$(sortedElements[currentTabIndex]).attr("tabIndex", currentTabIndex + 1);
			}
		},		
		nextField : function (options){
			this.data("nextField",options['nextField']);			
		}
	};
	
  $.fn.taborderhelper = function(method) {
		
	// Method calling logic - borrowed form the jQuery plugin documentation.
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.setTabOrder.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
    }  

	return this;
  };
})( jQuery );