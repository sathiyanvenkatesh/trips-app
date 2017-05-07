'use strict';

/**
 * @ngdoc function
 * @name tripsBetaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tripsBetaApp
 */
angular.module('tripsBetaApp')
  .controller('MainCtrl', function ($scope, $http,myJson) {
   active();
   function active(){
 myJson.all().then(function(resp) {
        $scope.response = resp;
        console.log("Full Response====="+JSON.stringify($scope.response));
       $scope.uniqueOrgNames = [];
for(var i = 0; i< $scope.response.deals.length; i++){
    if($scope.uniqueOrgNames.indexOf($scope.response.deals[i].departure) === -1){
        $scope.uniqueOrgNames.push($scope.response.deals[i].departure);
    }
}



console.log("departure======"+$scope.uniqueOrgNames);

$scope.uniqueDestNames = [];
for(var i  = 0; i< $scope.response.deals.length; i++){
    if($scope.uniqueDestNames.indexOf($scope.response.deals[i].arrival) === -1){
        $scope.uniqueDestNames.push($scope.response.deals[i].arrival);
    }
}
console.log("arrival======"+$scope.uniqueDestNames);
    });
   }

$scope.search = function() {
 if($scope.Orgselected===$scope.DestSelected){
  $scope.alerts = [
    { type: 'danger', msg: 'The Departure City  and  Destination City cannot be same. Please re-type.' }
  ];
  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

 }
 else{
    searchResult($scope.Orgselected,$scope.DestSelected)
 }
  };
function searchResult(Org,Des){


 $scope.destresults = [];
var searchField = "arrival";
var searchValDes = Des;


$scope.orgresults = [];
var searchField = "departure";
var searchValOrg = Org;


for (var i=0 ;i<$scope.response.deals.length ; i++)
{
    if ($scope.response.deals[i][searchField] == searchValDes) {
        $scope.destresults.push($scope.response.deals[i]);
    }
    else  if ($scope.response.deals[i][searchField] == searchValOrg) {
        $scope.orgresults.push($scope.response.deals[i]);
       }
}
console.log("destresults results"+JSON.stringify($scope.destresults));
console.log("destresults length:"+$scope.destresults.length);


console.log("orgresults:"+JSON.stringify($scope.orgresults));
console.log("orgresults length:"+$scope.orgresults.length);

$scope.finalList =[];
  for (var i=0 ;i<$scope.response.deals.length ; i++){

      if($scope.response.deals[i].arrival === searchValOrg){
        if($scope.response.deals[i].departure === searchValDes){
           var foo = {};
                foo.departure = $scope.response.deals[i].arrival ;
                foo.arrival =  $scope.response.deals[i].departure;
                foo.transport = $scope.response.deals[i].transport;
                foo.duration=$scope.response.deals[i].duration;
                foo.discount=$scope.response.deals[i].discount;
                foo.cost1 = ($scope.response.deals[i].cost)-(($scope.response.deals[i].discount / 100) * $scope.response.deals[i].cost);
                $scope.finalList.push(foo);

        } else {
         for (var j=0 ;j<$scope.response.deals.length ; j++){
            if($scope.response.deals[i].departure === $scope.response.deals[j].arrival &&
              $scope.response.deals[j].departure === searchValDes){
               var foo = {};
                foo.departure = $scope.response.deals[i].arrival + $scope.response.deals[i].departure;
                foo.arrival = $scope.response.deals[j].arrival + $scope.response.deals[j].departure;
                foo.transport = $scope.response.deals[i].transport + ' - ' +$scope.response.deals[j].transport;

                foo.duration= $scope.response.deals[i].duration;
                //+ parseInt($scope.response.deals[j].duration.h)
                foo.discount=$scope.response.deals[i].discount;
                foo.cost1= ($scope.response.deals[i].cost)-(($scope.response.deals[i].discount / 100) * $scope.response.deals[i].cost);;
                $scope.finalList.push(foo);
            }
        }
     }

    }
  }


console.log("finalList.."+JSON.stringify($scope.finalList));
 $scope.finalresp = $scope.finalList;
}


  $scope.modelOptions = {
    debounce: {
      default: 500,
      blur: 250
    },
    getterSetter: true
  };


  });
