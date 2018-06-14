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
              TweenMax.to('.bg', 1.6, {delay: .7, width:100, height:100, margin: 0, alpha: 0, transformOrigin: 50});

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

                //TweenMax.from('#title', 1, {delay: .5, y: "+=50", alpha: 0});

                
                var mySplitText = new SplitText("#intro", {delay: 3,type:"chars, words"}),
                    tl = new TimelineLite(),
                    numChars = mySplitText.chars.length;

                for(var i = 0; i < numChars; i++){
                  //random value used as position parameter
                  tl.from(mySplitText.chars[i], 1.5, {delay: 2, opacity:0}, Math.random() * 2);
                }

                //TweenMax.to('.bg', 3, {delay: 7.5, scaleX:.9, scaleY:.9, transformOrigin:"50% 50% 0", ease: Power3.easeOut});

                   
                // var splitTitle = new SplitText("#nav", {type:"words"}),
                //     t2 = new TimelineLite(),
                //     numChars = splitTitle.words.length;

                // TweenMax.staggerFrom(splitTitle.words, 1, {delay: 5.5, alpha: 0, y: "+=40"}, .5);




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

      instaFeed();

      ExpandTransition.beforeEnter();
      firstVisit = false;

    }



    function instaFeed(){

        var userFeed = new Instafeed({
        get: 'user',
        userId: '1308885914',
        clientId: '1b3d6496db554e818b3e0244b6e5ad45',
        accessToken: '1308885914.1b3d649.ee291f0bcb7b42eba3adce2daf506908',
        resolution: 'standard_resolution',
        limit: 3,
        template: '<img src="{{image}}" class="img-fluid">',
        sortBy: 'most-recent'
      });
      userFeed.run();


    }




    });//end ready


});//end loaded

