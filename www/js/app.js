// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'uiGmapgoogle-maps', 'ngCordova'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function($state) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

        if (localStorage.getItem('loggedUser')) {
            //$state.go('app.profile');
        } else {
            $state.go('login');
        }
    });
})


.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, uiGmapGoogleMapApiProvider) {

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);
    uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyDFberVyWaVDCxFLaRxYLxUuSd4uPb_I2s',
    v: '3.17',
    libraries: 'weather,geometry,visualization',
    language: 'en',
    sensor: 'false',
  })

    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('login', {
        url: '/login',
        templateUrl: 'templates/authentication/login.html',
        controller: 'LoginCtrl' 
    })
      .state('signup', {
        url: '/signup',
        templateUrl: 'templates/authentication/signup.html',       
        controller: 'SignupCtrl' 
    })

     .state('forgot', {
        url: '/forgot',
        templateUrl: 'templates/authentication/forget.html',
        controller: 'ForgotCtrl'    

    })

     .state('app.setting', {
        url: '/setting',
        views: {
            'menuContent': {
                templateUrl: 'templates/setting.html',
                controller: 'ActivityCtrl'
            
            }
        }
    })

     .state('app.change', {
        url: '/change',
        views: {
            'menuContent': {
                templateUrl: 'templates/change.html',
                controller: 'ActivityCtrl'
            
            }
        }
    })
     .state('app.suggest', {
        url: '/suggest',
        views: {
            'menuContent': {
                templateUrl: 'templates/dashboard/suggest.html',
                controller: 'BookingCtrl'
            
            }
        }
    })
     .state('app.payment', {
        url: '/payment',
        views: {
            'menuContent': {
                templateUrl: 'templates/dashboard/payment.html',
                controller: 'ItineraryCtrl'
            
            }
        }
    })
     
     .state('app.edit', {
        url: '/edit',
        views: {
            'menuContent': {
                templateUrl: 'templates/dashboard/edit.html',
                controller: 'EditCtrl'
            
            }
        }
    })
     .state('app.upcoming', {
        url: '/upcoming',
        views: {
            'menuContent': {
                templateUrl: 'templates/dashboard/upcoming.html',
                controller: 'UpcomingCtrl'
            
            }
        }
    })
     .state('app.history', {
        url: '/history',
        views: {
            'menuContent': {
                templateUrl: 'templates/dashboard/history.html',
                controller: 'HistoryCtrl'
            
            }
        }
    })
     .state('app.itinerary', {
        url: '/itineraries/:itineraryId',
        views: {
            'menuContent': {
                templateUrl: 'templates/dashboard/itineraries.html',
                controller: 'ItineraryCtrl'
            
            }
        }
    })
     .state('app.booking', {
        url: '/booking',
        views: {
            'menuContent': {
                templateUrl: 'templates/dashboard/booking.html',
                controller: 'BookingCtrl'
            
            },
            'fabContent': {
                template: '<button id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-plus"></i></button>',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })    
    .state('app.profile', {
        url: '/profile',
        views: {
            'menuContent': {
                templateUrl: 'templates/profile/profile.html',
                controller: 'ProfileCtrl'
            },
            'fabContent': {
                template: '<button id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-plus"></i></button>',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    });

     // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('login');
});
 