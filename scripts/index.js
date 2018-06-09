document.addEventListener("DOMContentLoaded", function() {
 
  $( document ).ready(function() {

    var wScreen = $(window).width(),
        midScreen = wScreen /2,
        animating = false,
        $holder = $('.holder'),
        count = 1;
        
        

    var lastElementClicked;
    var nameLast;

    var firstVisit = true;




    Barba.Dispatcher.on('linkClicked', function(el) {
      lastElementClicked = el,
      nameLast = lastElementClicked.className.split(' ')[0];
      nameLastEnter = lastElementClicked.className.split(' ')[1];
      console.log("element clicked: " + lastElementClicked.className);
    });

    // ------------------- INIT TRANSITION  ............. 
    var ExpandTransition = Barba.BaseTransition.extend({
        start: function() {
          Promise
            .all([this.newContainerLoading, this.beforeLeave()]) //Call Function = BeforeLeave
            .then(this.beforeEnter.bind(this));
        },
      
        beforeLeave: function() {
          var deferred = Barba.Utils.deferred();

          
          if(nameLast == 'box') {

              TweenMax.to('.holder',2,{alpha: 0, y: "+=50", ease: Power4.easeInOut, onComplete: function(){ deferred.resolve(); }}) //onComplete      
          
          }
          

          if(nameLast == 'testphoto') {      
              let tlOut = new TimelineMax()
              .to('.box-text',1.2,{ y:200, opacity:0, y: "+=600", ease: Power3.easeInOut})
                .to('.testphoto',2,{left:midScreen,  y: "+=600", alpha: 0, xPercent: -50, opactiy: 0, ease: Power4.easeInOut, onComplete: function(){ deferred.resolve(); }},.3) //onComplete      
            }



          return deferred.promise;
        },
      
        beforeEnter: function() {

            if(nameLast == 'box') {
                TweenMax.from('.box-text',1.6,{ opacity:0, ease: Power3.easeOut})
                TweenMax.from('.photo1',1.6,{ opacity:0, ease: Power3.easeOut})

            }

            if(nameLastEnter == 'photo1') {     
                //goTrg();
                TweenMax.from('.holder', 1.6, {delay: .5, alpha: 0, y: "+=50"}) 
            }
            else if (nameLastEnter == 'page2') {    
                TweenMax.set('.holder',{onComplete: goTrg ,x:- wScreen})    
            }

            console.log("test");

            if(!firstVisit){
              this.done();
            }

        }
      });
      
      Barba.Pjax.getTransition = function() {
        var transitionObj = ExpandTransition;
      
        //Barba.HistoryManager.prevStatus().namespace 
        return transitionObj;
      };

    Barba.Pjax.start();


    if(firstVisit){

      console.log("Its the viewers first visit");
      
      
      //test to find what page it is
      //TweenMax.from('.holder', 1.6, {delay: 1, alpha: 0, y: "+=50"}) 


      //check to see what page is loading and then switch the variable below appropriately
      nameLastEnter = 'photo1';

      ExpandTransition.beforeEnter();
      firstVisit = false;

    }




    });//end ready


});//end loaded

