/*
	To replace menus css
	elem :	Object, the element that triggered the event
*/
function themeSwitch(elem){
	if ( $(elem).prop("id").length === 0 ) return;
	menuSlide($("li.CSSmenu_root"), "dropdown", true, false);
  var toswitch = ["Tmenu", "Lmenu", "Rmenu", "Fmenu"];
  for(var i=0; i<toswitch.length; i++){
    $("#css" + toswitch[i]).prop("href", "css/" + $(elem).prop("id") + "/" + toswitch[i] + ".css");
  }
}
/*
	To display a preview image of the theme overed or to hide it
  	[elem] :	Object, the element that triggered the event
*/
function themePreview(elem){
	if ( typeof(elem) != "object"){ 
    $("#preview").css("display", "none");
  	$("#preview").removeProp("src");
    return;
  } else if ( $(elem).prop("id").length === 0 ) return;
  $("#preview").prop("src", "preview/" + $(elem).prop("id") + ".jpg"); 
  $("#preview").css("display", "block");
}
/* 
	To open with an animation menu entry's childs
	elem : 			Object, the element that triggered the event
  	childClass : 	String, the class name of the element to slide (child of trigger element)
  	vertical : 		Boolean, vertical if true, horizontal if false
  	open : 			Boolean, open if true and element's child is closed, close if false
*/
function menuSlide(elem, childClass, vertical, open){
	var todo = $(elem).children("." + childClass);
  var attr;
  var animation;
  if ( vertical ){
  	attr = "max-height";	
  } else {
    attr = "max-width";		
  }
	if ( open ){
 		if ( todo.css("overflow") === "visible"){ return; }
 		menuZ(elem, true);
		todo.css(attr, 'none');
    if ( vertical ){
  		animation = {maxHeight: todo.height()};
    } else {
    	animation = {maxWidth: todo.width()};
    	menuPos(elem, childClass);
    }
  	todo.css(attr, "0px");  
  	todo.css("display", "block");
	todo.stop().animate(animation, 
						{duration : 200,
      	                 easing: 'linear',
        	             complete : function(){ todo.css("overflow", "visible"); } }
          	           );
  } else {
	  todo.css("overflow", "hidden");
    if ( vertical ){
  		animation = {maxHeight: "0px"}; 
    } else {
    	animation = {maxWidth: "0px"};
    }
		todo.stop().animate(animation, 
						 	{duration : 200,
                         	 easing: 'linear',
  							 complete : function(){ todo.css("display", "none");
                         							menuZ(elem, false); } 
                        }
                        );
  }
}
/*
	To set the right vertical position of a dropLeft/Right element in a dropUp menu
  	elem : 			Object, the element that triggered the event
  	childClass : 	String, the class name of the element to slide (child of trigger element)
*/
function menuPos(elem, childClass){
	var ok = false;
	var father = $(elem).parent();
	while( $(father).prop('tagName').toLowerCase() != 'nav' ){
  		if ( $(father).hasClass("dropup") ){ ok = true;break; }
      father = $(father).parent();
  }
  if ( !ok ) return;
  var brothers = $(elem).parent().children("li");
  var height = 0;
  for(var i=brothers.length; i>0; i--){
  	if ( brothers[i] === elem ) break;
  	height += $(brothers[i]).height();
  }
  $(elem).children("." + childClass).css('bottom', "+" + height + "px");
  
}
/*
	To set active menu to the front
  	elem : Object, the element that triggered the event
  	open : Boolean, set zindex to one if true and to zero if false
*/
function menuZ(elem, open){
	var nav = $(elem).parent();
	while( $(nav).prop('tagName').toLowerCase() != 'nav' ){ nav = $(nav).parent(); }
  if (open){
  	nav.css("z-index", 1);
  } else {
  	nav.css("z-index", 0);
  }
}