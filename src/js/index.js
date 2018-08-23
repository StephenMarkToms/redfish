document.addEventListener("DOMContentLoaded", function() {


 
  $( document ).ready(function() {


    //set content visible after loading
     $('.barba-container').css('visibility','visible');


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

          
          if(nameLast == 'index') {

              TweenMax.from('.portrait-hero', .75, {delay: .5, alpha: 0, y: "+=30", ease:Power3.easeOut}); 
              TweenMax.from('.couples-hero', .75, {delay: .7, alpha: 0, y: "+=30", ease:Power3.easeOut});
              TweenMax.from('.weddings-hero', .75, {delay: 1, alpha: 0, y: "+=30", ease:Power3.easeOut}); 

          }
          

          



          return deferred.promise;
        },
      
        beforeEnter: function() {


            if(nameLastEnter == 'index') {     


                TweenMax.from('.portrait-hero', .75, {delay: .5, alpha: 0, y: "+=30", ease:Power3.easeOut}); 
                TweenMax.from('.couples-hero', .75, {delay: .7, alpha: 0, y: "+=30", ease:Power3.easeOut});
                TweenMax.from('.weddings-hero', .75, {delay: 1, alpha: 0, y: "+=30", ease:Power3.easeOut}); 

                var mySplitText = new SplitText(".portrait-hero p", {type:"chars,words, lines"}),
                tl = new TimelineLite({delay:0.5});
                tl.staggerFrom(mySplitText.chars, 0.5, {y:100, opacity:0}, 0.02);

                var mySplitText = new SplitText(".couples-hero p", {type:"chars,words, lines"}),
                t2 = new TimelineLite({delay:0.7});
                t2.staggerFrom(mySplitText.chars, 0.5, {y:100, opacity:0}, 0.02);

                var mySplitText = new SplitText(".weddings-hero p", {type:"chars,words, lines"}),
                t3 = new TimelineLite({delay:0.7});
                t3.staggerFrom(mySplitText.chars, 0.5, {y:100, opacity:0}, 0.02);


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


      //check to see what page is loading and then switch the variable below appropriately
      nameLastEnter = 'index';

      //instaFeed();

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
        limit: 20,
        template: '<img src="{{image}}" class="d-inline img-responsive">',
        sortBy: 'most-recent',

        after: function () {
            var images = $("#instafeed").find('img');
            $(images.slice(9, images.length)).remove();
        }

      });
      userFeed.run();


    }




    });//end ready


});//end loaded

