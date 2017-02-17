angular.module('alurapic').controller('FotoController', function($scope, $http, $routeParams){
    
    $scope.foto = {};
    $scope.mensagem = '';

    if($routeParams.fotoId){
        $http.get('v1/fotos/' + $routeParams.fotoId)
        .success(function(foto){
            $scope.foto = foto;
        })
    }

    $scope.submeter = function(){
        if($scope.formulario.$valid){
            if($scope.foto._id){  
                $http.put('v1/fotos', $scope.foto._id, $scope.foto)
                .success(function(){
                    $scope.mensagem = 'Foto : ' + $scope.foto.titulo +  ' alterada com sucesso';
                })
                .error(function(){
                    $scope.mensagem = 'Erro ao alterar foto: ' + $scope.foto.titulo ;
                })
            }
            else {

                $http.post('v1/fotos', $scope.foto)
                .success(function(){
                    $scope.foto = {};
                    $scope.mensagem = 'Foto incluída com sucesso';
                })
                .error(function(){
                    $scope.mensagem = 'Erro ao incluir foto';
                })  

            } 
        }
    }

})

