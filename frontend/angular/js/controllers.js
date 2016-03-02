'use strict';

var eventControllers = angular.module('eventControllers', []);
var loginControllers = angular.module('loginControllers', []);
var userControllers = angular.module('userControllers', []);
var cardControllers = angular.module('cardControllers', []);
var pageControllers = angular.module('pageControllers', []);

function redirectLogin() {
    window.location = "login.html";
}

loginControllers.controller('LoginCtrl', ['$scope', 'Login', 'User', function($scope, Login, User){
    var login = function() {
        $scope.login = function() {
            Login.login($scope.credentials,
                function(data) {
                    window.location = "index.html";
                    console.log(data);
                },
                function(error) {
                    alert("Failed to log in. " + error);
                    console.log(error);
                }
            );
        }
    };
    User.find(function(data) {
        if (data.email) {
            window.location = "index.html";
        } else {
            login();
        }
    }, login);
}]);
eventControllers.controller('ViewEventsCtrl', ['$scope', 'Event', function ($scope, Event) {
    $scope.getRandomNumber = function(){
        return Math.floor((Math.random()*400)+1);
    }
}]);

userControllers.controller("CreateUserCtrl", ['$scope', 'User', function($scope, User) {
    $scope.roles = "READ_COMMENT,NEW_COMMENT,READ_FEED,NEW_FEED,EDIT_FEED,READ_LINK,NEW_LINK,READ_PAGE,NEW_PAGE,EDIT_PAGE,READ_POST,NEW_POST,EDIT_POST,NEW_STUDYFIELD,READ_STUDYFIELD,READ_UPLOAD,NEW_UPLOAD,READ_ALL_FILES,READ_FILE,READ_SELF,READ_USER,READ_ALL_USERS,READ_USER,NEW_USER,DELETE_USER]";
    $scope.create = function() {
        var userInfo = {
            email: $scope.user.email,
            gender: $scope.user.gender,
            name: $scope.user.name,
            showEmail: true,
            enabled: true
        };
        console.log(userInfo);
        var credentials = {
            accountLocked: false,
            authorities: $scope.roles.split(","),//$scope.user.roles.split(","),
            passwordHash: $scope.user.password
        };

        User.create({user: userInfo, credential: credentials});
    }
}]);

userControllers.controller("UserInfoCtrl", ['$scope', "User", function($scope, User) {
    $scope.me = User.find(function(data) {
        if (!data.email) {
            redirectLogin();
        }
    }, redirectLogin);
    $scope.logout = function() {
        User.logout(redirectLogin);
    };
}]);

cardControllers.controller("AllCardCtrl", ['$scope', 'Card', function($scope, Card) {
    // Åpne og lukke edit/add new card
    $scope.addCard = function() {
        $('.edit-card-wrap').fadeIn();
        $('#darkOverlay').fadeIn();
    };
    $scope.cards = Card.all();
}]);
cardControllers.controller("AddCardCtrl", ['$scope', 'Card', function($scope, Card) {
    var filter = [];

    filter.push("#java");

    $scope.createCard = function() {
        Card.create({
            userId: $scope.me.id,
            name: $scope.newcard.title,
            description: $scope.newcard.description,
            filter: filter
        });
    }
}]);

pageControllers.controller("PageCtrl", ['$scope', function($scope) {
    $('.thumb').each(function() {
        var elem = $(this);
        elem.removeAttr('style');
        if (elem.height() > elem.width()) {
            elem.css('width', '100%');
        } else {
            elem.css('height', '100%');
        }
    })
}
]);