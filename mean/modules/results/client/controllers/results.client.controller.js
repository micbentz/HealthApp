'use strict';

// results controller
angular.module('diseases').controller('ResultsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Diseases',
  function ($scope, $stateParams, $location, Authentication, Diseases) {
    $scope.authentication = Authentication;

    // Find a list of results
    $scope.find = function () {
      $scope.suggestions = Diseases.query();
    };

    // // Find existing result for patient
    // $scope.findOne = function () {
    //   $scope.result = DiseaseSuggestion.get({
    //     DiseaseSuggestionId: $stateParams.DiseaseSuggestionId
    //   });
    // };
  }
]);
