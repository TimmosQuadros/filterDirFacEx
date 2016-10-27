/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var app = angular.module('schoolChildrenApp', ['ngRoute', 'ngResource']);

app.filter("schoolAge", function () {
    return function (input) {
        var out = [];
        for (var i = 0; i < input.length; i++) {
            if (input[i].age <= 15 && input[i].age >= 6) {
                out.push(input[i]);
            }
        }
        return out;
    };
});

app.controller('MyController', [function () {
        var self = this;
        self.persons = [
            {name: 'Hans', gender: 'male', age: 8}, {name: 'Grethe', gender: 'female', age: 7},
            {name: 'Frederik', gender: 'male', age: 61}, {name: 'Hassan', gender: 'male', age: 13},
            {name: 'Karen', gender: 'female', age: 31}];

    }]);

app.controller("DirectiveController", ['$scope', function ($scope) {
        $scope.user = {
            companyName: "Coolest Company on Earth",
            companyUrl: "http://www.cool.cooler.com",
            created: new Date()
        };
    }]);

app.directive('formatCompany', function () {

    return {
        restrict: 'E',
        templateUrl: 'format-company.html',
        controller: function () {
            var user;
            user = {
                companyName: "Coolest Company on Earth",
                companyUrl: "http://www.cool.cooler.com",
                created: new Date()
            };
            return user;
        },
        controllerAs: 'company'
    };
});

app.directive('myDirective', function () {
    return {
        restrict: 'EA',
        link: function (scope, element, attrs) {


            var attributeParts = attrs.myDirective.split(',');
            var src = '';
            var img = '';
            for (var i = 0; i < attributeParts.length; i++) {
                //In here you can create new html elements like <img> and append them to the element

                src = "pics/" + attributeParts[i] + ".jpg";
                img = '<img src="' + src + '" width="250" height="250"/>';
                element[0].innerHTML += img;
            }
        }
    };
});

app.service('MyService', function () {
    this.getRandomString = function (n) {
        return new Array(n + 1).join((Math.random().toString(36) + '00000000000000000').slice(2, 18)).slice(0, n);
    };

    this.getRandomNumber = function (n) {
        return Math.round(Math.random() * (n - 1) + 1);
        ;
    };
});

app.controller('RandomController', function ($scope, MyService) {

    $scope.getRandomNumber = function (n) {
        $scope.randomNumber = MyService.getRandomNumber(n);
    };

    $scope.getRandomString = function (n) {
        $scope.randomString = MyService.getRandomString(n);
    };
});

app.factory('RestEuCountriesFactory', function ($resource) {

    var getAllCountries = function () {
        return $resource('https://restcountries.eu/rest/v1/all');
    };
    
    var getAllCountriesFromRegion = function () {
        return $resource('https://restcountries.eu/rest/v1/region/:reg',{reg: "@reg"});
    };
    
    var getCountryFromCode = function () {
        return $resource('https://restcountries.eu/rest/v1/alpha');
    };

    return {
        getAllCountries: getAllCountries,
        getAllCountriesFromRegion: getAllCountriesFromRegion,
        getCountryFromCode: getCountryFromCode
    };
});

app.controller('RestEuCountriesController', ["$scope", "RestEuCountriesFactory", function ($scope, RestEuCountriesFactory) {
        var self = this;
        
        self.getAllCountries = function () {
            $scope.allCountries = RestEuCountriesFactory.getAllCountries().query();
        };
        
        self.getAllCountriesFromRegion = function (region) {
            $scope.countryFromRegion = RestEuCountriesFactory.getAllCountriesFromRegion().query({reg: region});
        };
        
        self.getCountryFromCode = function (countryCode) {
            $scope.countryFromCode = RestEuCountriesFactory.getCountryFromCode().query({codes: countryCode});
        };
}]);





