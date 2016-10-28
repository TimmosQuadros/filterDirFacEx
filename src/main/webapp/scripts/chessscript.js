/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var cApp = angular.module('chessApp', []);

cApp.filter('Chess', function () {
    return function (input) {
        var out;
        switch (input) {
            case "wr":
                out = "\u2656";
                break;
            case "wkn":
                out = "\u2658";
                break;
            case "wb":
                out = "\u2657";
                break;
            case "wq":
                out = "\u2654";
                break;
            case "wk":
                out = "\u2655";
        }
        return out;
    }
});


cApp.controller("ChessCtrl", function ($scope) {
    $scope.board = ["wr", "wkn", "wb", "wq", "wk", "wb", "wkn", "wr"];
});

