angular.module('meusServicos', ['ngResource'])
.factory('recursoFoto', function($resource){
	
	return $resource('/v1/fotos/:fotoId', null, {
            'update' : { 
                method: 'PUT'
            }
        });
    })
.factory('cadastroFoto', function(recursoFoto, $q){
	var service = {};
	service.cadastrar = function(foto){

		return $q(function(resolve, reject){
	            if(foto._id){
	                recursoFoto.update({fotoId: foto._id }, foto, 
	                   function(){
	                   		resolve({
	                   			mensagem: 'Foto : ' + foto.titulo +  ' alterada com sucesso',
	                   			inclusao : false 
	                   		})
	                }, function(erro){
	                    	reject({
	                    		mensagem : 'Erro ao alterar foto: ' + foto.titulo	
	                    	})
	                })  
	            }
	            else {
	                recursoFoto.save(foto, 
	                    function(){
	                        resolve({
	                        	mensagem: 'Foto incluída com sucesso',
	                        	inclusao: true
	                        })
	                        
	                } , function(){
		                	reject({
		                		mensagem: 'Erro ao incluir foto'
		                	})
	                });

	            } 
		})
	}

	return service;

});

