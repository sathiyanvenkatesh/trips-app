(function () {
/* Services */

angular.module('tripsBetaApp')
.factory('myJson', ['$http', function ($http){
    var myJson = {};
    myJson.get = $http.get('scripts/response.json').then(function(resp){
            return resp.data;
    });
    myJson.all = function(){
        return myJson.get;
    };
    return myJson;
}])

}());
