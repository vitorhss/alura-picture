angular.module('alurapic').controller('FotoController', function($scope, $routeParams, recursoFoto){
    
    $scope.foto = {};
    $scope.mensagem = '';

    if($routeParams.fotoId){
        recursoFoto.get({fotoId: $routeParams.fotoId },
            function(foto){
                $scope.foto = foto;

            }, function(erro){
                console.log(erro);

            });
    }

    $scope.submeter = function(){
        if($scope.formulario.$valid){
            if($routeParams.fotoId){
                recursoFoto.update({fotoId: $scope.foto._id }, $scope.foto, 
                   function(){
                        $scope.mensagem = 'Foto : ' + $scope.foto.titulo +  ' alterada com sucesso';
                }, function(erro){
                    console.log(erro);
                        $scope.mensagem = 'Erro ao alterar foto: ' + $scope.foto.titulo ;
                })  
            }
            else {
                recursoFoto.save($scope.foto, 
                    function(){
                        $scope.foto = {};
                        $scope.mensagem = 'Foto incluída com sucesso';

                } , function(){
                    $scope.mensagem = 'Erro ao incluir foto';
                });

            } 
        }
    }
});

