'use strict';

//Disease Results Controller
angular.module('diseases').controller('DiseasesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Diseases',
function ($scope, $stateParams, $location, Authentication, Diseases) {
	$scope.authenitcation = Authentication;

	$scope.resultsFields = ["Education", "Referrels", "Medications", "Laboratory", "Screening", "Vaccinations", "DME", "Medication Adherence"];

	$scope.suggestions = [{}];

	$scope.addSuggestion = function() {
		$scope.suggestions.push({});
	};

	//Removes Suggestion from the array
	$scope.removeSuggestion = function(index) {
		$scope.suggestions.splice(index, 1);
	};

	//Create new Disease Results
	$scope.create = function(isValid) {
		$scope.error = null;

		if(!isValid) {
			$scope.$broadcast('show-errors-check-validity', 'diseaseForm');

			return false;
		}	

		var disease = new Diseases({
			diseaseName: $scope.diseaseName,
			suggestions: $scope.suggestions
		});

		//Redirect after save
		disease.$save(function (response) {

			$location.path('diseases/' + response._id);

			//Clear form fields
			$scope.diseaseName ='';
			$scope.suggestions = [{}];
		}, function(errorResponse) { 
			console.log(errorResponse);
			$scope.error = errorResponse.data.message;
		});
	};


	//Remove existing Disease 
	$scope.remove = function (disease) {
		if(disease) {
			disease.$remove();

			for(var i in $scope.diseases) {
				if($scope.diseases[i] === disease) {
					$scope.diseases.splice(i,1);
				}
			}
		} else {
			$scope.disease.$remove(function() {
				$location.path('diseases');
			});
		}
	};

	//Update Existing Disease
	$scope.update = function (isValid) {
		$scope.error = null;

		if(!isValid) {
			$scope.$broadcast('show-errors-check-validity', 'diseaseForm');

			return false;
		}	

		var disease = $scope.disease;
		disease.suggestions = $scope.suggestions;
	     
	    disease.$update(function () {
	      $location.path('diseases/' + disease._id);
	    }, function (errorResponse) {
	      $scope.error = errorResponse.data.message;
	    });
	};

	// Find a list of Diseases
    $scope.find = function () {
      $scope.diseases = Diseases.query();
    };

    // Find existing Disease
    $scope.findOne = function () {
     	$scope.disease = Diseases.get({
    		diseaseId: $stateParams.diseaseId
    	});

		$scope.disease.$promise.then(function(data) {
	       $scope.suggestions = data.suggestions;
	   	});    
    };
}]); 