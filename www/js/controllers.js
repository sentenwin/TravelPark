angular.module('starter.controllers', ['ngStorage'])

.controller('AppCtrl', function($scope, $state, $rootScope, $ionicModal, $ionicPopover, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };

    $scope.logout = function() {
        if (localStorage.getItem('loggedUser')) {
            localStorage.setItem('loggedUser', null);
            $rootScope.loggedUser = false;
            console.log(localStorage.getItem('loggedUser'));
            console.log($rootScope.loggedUser);
            $state.go('login');
        }        
    }
})

.controller('LoginCtrl', function($scope, $rootScope, $state, $localStorage, $ionicLoading, $ionicPopup, $rootScope, $timeout, $stateParams, SocialAuthService, AuthService) {
    console.log("LoginCtrl: ENTERED");
    /* Memeber varialbes */
    $scope.loginData = {};
    $scope.loggedUser = {};
    var val;

    val = localStorage.getItem('loggedUser');
    console.log(val);
    console.log($rootScope.loggedUser);
    if ($rootScope.loggedUser) {
         console.log("Hello logged in ",localStorage.getItem('loggedUser'));
         $state.go('app.booking');        
    } 

    $scope.doLogin = function() {
        console.log("LoginCtrl:(doLogin): ENTERED");
        var ret;

        $ionicLoading.show();       
        console.log("LoginData ", $scope.loginData);
        $localStorage.logvalue = $scope.loginData;
        ret = AuthService.loginAuth($scope.loginData);

        if (ret) {
             $ionicLoading.hide();
              localStorage.setItem('logvalue', JSON.stringify(ret));
              $rootScope.loggedUser = true;
              $state.go('app.booking');              
        } else {
              $ionicLoading.hide();
              var alertPopup = $ionicPopup.alert({
                title: "Login Failed",
                template: "Please try again"
                });              
        }
        console.log("LoginCtrl:(doLogin): EXITED");
    }


    console.log("LoginCtrl: EXITED");

})

.controller('SignupCtrl', function($scope, $state, $localStorage, $ionicPopup, $ionicLoading, $timeout, $stateParams, SocialAuthService, AuthService) {
    console.log("SignupCtrl: ENTERED");
    /* Member varialbe */
    $scope.signupData = {};

    $scope.doSignup = function() {
        var ret=true;

        console.log("SignupCtrl:(doSignup): ENTERED");
        console.log("SignupCtrl ", $scope.signupData);
        $ionicLoading.show();

        ret = AuthService.signupAuth($scope.signupData); 
        $localStorage.signupvalue = $scope.signupData;
        if (ret) {
             $ionicLoading.hide();
              var alertPopup = $ionicPopup.alert({
                title: "Signup Successfull",
                template: "Now ready to login"
                });
              $state.go('login');
        } else {
              $ionicLoading.hide();
              var alertPopup = $ionicPopup.alert({
                title: "Signup Failed",
                template: "Please try again"
                });            
        }     

        console.log("SignupCtrl:(doSignup): EXITED");        
    }
    console.log("SignupCtrl: EXITED");

})

.controller('ForgotCtrl', function($scope, $ionicLoading, $timeout, $stateParams, SocialAuthService, AuthService) {
    console.log("ForgotCtrl: ENTERED");
    /* Memeber varialbe */
    $scope.forgotData = {};

    $scope.resetPassword = function() {
        console.log("ForgotCtrl:(resetPassword): ENTERED");
        $ionicLoading.show();       
        $timeout(function() {
            $ionicLoading.hide();
        }, 1000);        
        console.log("ForgotCtrl ", $scope.forgotData);
        console.log("ForgotCtrl:(resetPassword): EXITED");           
    }
    console.log("ForgotCtrl: EXITED");

})

.controller('BookingCtrl', function($scope, $state, $ionicSideMenuDelegate, $ionicLoading, $timeout, $stateParams, SocialAuthService, AuthService, DataService) {
    console.log("BookingCtrl: ENTERED");
    /* Memeber varialbe */
    
    $scope.datas = DataService.itinerary();
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionic.material.motion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionic.material.motion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionic.material.ink.displayEffect();

    $ionicSideMenuDelegate.canDragContent(false);

    $scope.bookingData = {};

    $scope.doBooking = function() {
        console.log("BookingCtrl:(doBooking): ENTERED");
        $ionicLoading.show();       
        $timeout(function() {
            $ionicLoading.hide();
        }, 1000);        
        console.log("BookingCtrl ", $scope.bookingData);
        localStorage.setItem('bookingValue',JSON.stringify('bookingData'));
        $state.go('app.suggest');
        console.log("BookingCtrl:(doBooking): EXITED");           
    }
    console.log("BookingCtrl: EXITED");

})

.controller('ItineraryCtrl', function($scope, $state, $ionicPopup, $stateParams, DataService) {
  
  $scope.data = DataService.get($stateParams.itineraryId);
  console.log($stateParams.itineraryId);
  console.log($scope.data);
  $scope.book = function(){
    $state.go('app.payment');
  }
  $scope.payment = DataService.getPay();

  $scope.show = function(){
    var alertPopup = $ionicPopup.alert({
                title: "Notification",
                template: "Payment received Successfully!"
                });
  }
})

.controller('HistoryCtrl', function($scope, $state, DataService) {
  
  $scope.history = DataService.getHistory();
  
})

.controller('UpcomingCtrl', function($scope, $state, DataService) {
  
  $scope.upcoming = DataService.Upcoming();
  
})

.controller('EditCtrl', function($scope, $state, DataService, $localStorage) {
  
  $scope.logvalue = $localStorage.logvalue;
  $scope.signupData = DataService.getUserByUsername($scope.logvalue.username);
  $scope.save = function(){
    DataService.updateUsers($scope.signupData);
  }
  
})

.controller('FriendsCtrl', function($scope, $stateParams, $timeout) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);

    // Set Motion
    ionic.material.motion.fadeSlideInRight();

    // Set Ink
    ionic.material.ink.displayEffect();
})

.controller('ProfileCtrl', function($scope, $state, $stateParams, $localStorage,$timeout, $ionicSideMenuDelegate, $cordovaGeolocation) {
    // Set Header
    $scope.edit = function(){
        
        $state.go('app.edit');
    }
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    $scope.loggedUser = $localStorage.signupvalue;
    console.log("ProfileCtrl : loggedUser ",$scope.loggedUser );

    // Set Motion
    $timeout(function() {
        ionic.material.motion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionic.material.motion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionic.material.ink.displayEffect();

    $ionicSideMenuDelegate.canDragContent(false)
  $scope.map = {center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 8 };
  $scope.options = {scrollwheel: true};
  
  $scope.markers = []
  // get position of user and then set the center of the map to that position
  $cordovaGeolocation
    .getCurrentPosition()
    .then(function (position) {
      var lat  = position.coords.latitude
      var long = position.coords.longitude
      $scope.map = {center: {latitude: lat, longitude: long}, zoom: 16 };
      //just want to create this loop to make more markers
      for(var i=0; i<3; i++) {
        $scope.markers.push({
            id: $scope.markers.length,
            latitude: lat + (i * 0.002),
            longitude: long + (i * 0.002),
            icon: $scope.markericon,
            title: 'm' + i
        })
      }
      
    }, function(err) {
      // error
    });

})

.controller('ActivityCtrl', function($scope, $stateParams, $timeout) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionic.material.motion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionic.material.ink.displayEffect();
})

.controller('GalleryCtrl', function($scope, $stateParams, $timeout) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionic.material.ink.displayEffect();

    ionic.material.motion.pushDown({
        selector: '.push-down'
    });
    ionic.material.motion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

});


