var app = angular.module('consultas', ['ngRoute', 'ngResource']);
var listaChamadas = [];

//rotas
app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    //rotas pacientes
    .when('/bemvindo', {
      templateUrl: 'partials/saudacao.html',
    })
    .when('/cadpaciente', {
      templateUrl: 'partials/pacientes/cadastro.html',
      controller: 'CadPacienteCtrl'
    })
    .when('/buscapaciente', {
      templateUrl: 'partials/pacientes/busca.html',
      controller: 'PacienteCtl'
    })
    .when('/fixa/:id', {
      templateUrl: 'partials/pacientes/fixa.html',
      controller: 'FixaPacienteCrl'
    })

    //rotas consultas
    .when('/marcarconsulta', {
      templateUrl: 'partials/consultas/marcar.html',
      controller: 'MarcarCtrl'
    })
    .when('/confirmar', {
      templateUrl: 'partials/consultas/confirmacao.html',
      controller: 'ConfirmaCtrl'
    })

    //rotas fila
    .when('/fila', {
      templateUrl: 'partials/fila/index.html',
      controller: 'FilaCtrl'
    })

    //rotas agenda
    .when('/agenda', {
      templateUrl: 'partials/agenda/index.html',
      controller: 'AgendaListarCtrl'
    })
    .when('/criar', {
      templateUrl: 'partials/agenda/criar.html',
      controller: 'AgendaCadastroCtrl'
    })

    //rota login
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'MenuCtl'
    })

    //rota medico
    .when('/medico', {
      templateUrl: 'partials/medico/index.html',
      controller: 'MedicoCtrl'
    })
    .when('/cadmedico', {
      templateUrl: 'partials/medico/cadastro.html',
      controller: 'CadastrarMedicoCtrl'
    })
    .when('/medico/:id', {
      templateUrl: 'partials/medico/fixa.html',
      controller: 'FixaMedicoCtrl'
    })
    //.otherwise({
    //  redirectTo: '/bemvindo'
    //});
}]);

//controllers
app.controller('MenuCtl', ['$scope', function($scope) {
  $scope.usuario = "alexandre";
}]);

app.controller('PacienteCtl', ['$scope', '$resource', function($scope, $resource) {

  var Server = $resource('/server/paciente');

  $scope.paciente = [];

  Server.query(
    function(data) {
      $scope.listPacientes = data;
    },
    function(erro) {
      console.log(erro);
    }
  );
}]);

app.controller('CadPacienteCtrl', ['$scope', '$resource', '$location', function($scope, $resource, $location) {
  //insere paciente no banco
  $scope.adicinonarPaciente = function(paciente) {
    var Server = $resource('/server/paciente');
    Server.save(paciente, function(data) {
        $location.path("/buscapaciente");
      },
      function(erro) {
        console.log(erro);
      });
  }
}]);

app.controller('FixaPacienteCrl', ['$scope', '$resource', '$routeParams', function($scope, $resource, $routeParams) {

  var id = $routeParams.id;
  var Server = $resource('/server/paciente/' + id);
  //$scope.paciente = [];

  Server.query(
    function(data) {
      $scope.paciente = data[0];
    },
    function(erro) {
      console.log(erro);
    }
  );

}]);

app.controller('MarcarCtrl', ['$scope', '$resource', '$location', function($scope, $resource, $location) {

  $scope.listPacientes = null;
  $scope.menuLegenda = "Seleciona o campo ao lado para listar"
  $scope.tabela1 = null;
  $scope.tabela2 = null;
  $scope.tabela3 = null;

  $scope.listarPacientes = function() {
    var Server = $resource('/server/paciente');

    //limpando o campo de medico ja clicado
    $scope.listMedico = null;
    $scope.listConsulta = null;
    $scope.busca = "";

    $scope.menuLegenda = "Selecione um Paciente";
    $scope.tabela1 = "Nome";
    $scope.tabela2 = "Sobrenome";
    $scope.tabela3 = "Cartao SUS";

    $scope.paciente = [];

    Server.query(
      function(data) {
        $scope.listPacientes = data;
      },
      function(erro) {
        console.log(erro);
      }
    );


  };

  $scope.listaMedico = function() {
    var Server = $resource('/server/medico');

    //limpando o campo de paciente ja clicado
    $scope.listPacientes = null;
    $scope.listConsulta = null;
    $scope.busca = "";

    $scope.menuLegenda = "Selecione um Medico";
    $scope.tabela1 = "Nome";
    $scope.tabela2 = "Sobrenome";
    $scope.tabela3 = "especialização";


    Server.query(
      function(data) {
        $scope.listMedico = data;
      },
      function(erro) {
        console.log(error);
      }
    )

  };

  $scope.listarData = function(id) {

    var Server = $resource('/server/agenda/medico/'+id);

    $scope.listMedico = null;
    $scope.listPacientes = null;
    $scope.busca = "";

    $scope.menuLegenda = "Selecione uma data";
    $scope.tabela1 = "Data";
    $scope.tabela2 = "Consultas disponivel";
    $scope.tabela3 = "Perioda da consultas";

    Server.query(
      function(data) {
        data.disponivel = data.quantidade - data.marcadas;
        $scope.listConsulta = data;
      },
      function(erro) {
        console.log(error);
      }
    )

  };

  $scope.adicionarPaciente = function(paciente) {
    $scope.campoPaciente = paciente;

    $scope.listPacientes = null;
    $scope.menuLegenda = "Seleciona o campo ao lado para listar"
    $scope.tabela1 = null;
    $scope.tabela2 = null;
    $scope.tabela3 = null;

    $scope.busca = "";
  };

  $scope.adicionarMedico = function(medico) {
    $scope.campoMedico = medico;

    $scope.listMedico = null;
    $scope.menuLegenda = "Seleciona o campo ao lado para listar"
    $scope.tabela1 = null;
    $scope.tabela2 = null;
    $scope.tabela3 = null;

    $scope.busca = "";
  };

  $scope.adionarData = function(consulta) {
    $scope.campoConsulta = consulta;

    $scope.listConsulta = null;
    $scope.menuLegenda = "Seleciona o campo ao lado para listar"
    $scope.tabela1 = null;
    $scope.tabela2 = null;
    $scope.tabela3 = null;

    $scope.busca = "";
  };

  $scope.marcarConsulta = function() {
      var Server = $resource('/server/consulta');
      var paciente_nome = $scope.campoPaciente.nome + " " + $scope.campoPaciente.sobrenome;
      var medico_nome = $scope.campoMedico.nome + " " + $scope.campoMedico.sobrenome;


     var consulta = {
        "consulta_id" : $scope.campoConsulta._id,
        "paciente_id" : $scope.campoPaciente._id,
        "paciente_nome" : paciente_nome,
        "medico_id" : $scope.campoMedico._id,
        "medico_nome" : medico_nome,
        "data" : $scope.campoConsulta.data
     };

    Server.save(consulta, function(data) {
        $location.path("/confirmar");
    },
    function(erro) {
        console.log(erro);
    });
  };
}]);

app.controller('ConfirmaCtrl', ['$scope', '$resource', '$location', function($scope, $resource, $location) {
  var Server = $resource('/server/consulta/data');

  Server.query(
    function(data) {
      $scope.listConsultas = data;
    },
    function(erro) {
      console.log(erro);
    }
  );

  $scope.confirmar = function(id) {
    var serverConf = $resource('/server/consulta/confirma/' + id);

    serverConf.query(
      function(data) {
        $scope.listConsultas = data;
      },
      function(erro) {
        if (erro.status == 404) {
          $scope.listConsultas = null;
          console.log(erro.status);
        }

      }
    )
    //confirmaConsultas.splice(idCerto, 1);
  };
}]);

app.controller('FilaCtrl', ['$scope', '$resource', '$filter', function($scope, $resource, $filter) {
  var Server = $resource('/server/fila');
  var listaMedico = [];
  var repete = false;

  Server.query(
    function(data) {
      //retornado a fila
      $scope.listaFila = data;

      //criando a lista de medicos para o select
      angular.forEach(data, function(medico, key) {

        if (listaMedico == "") {
          listaMedico = [{
            medico_nome: medico.medico_nome
          }];
        } else {
          angular.forEach(listaMedico, function(value, key) {
            if (value.medico_nome == medico.medico_nome) {
              repete = true;
              //exit;
            }
          });

          if (repete == false) {
            listaMedico.push({
              medico_nome: medico.medico_nome
            });
          } else {
            repete = false;
          }
        }
      });
      $scope.medicos = listaMedico;
    },
    function(erro) {
      console.log(erro);
    }
  );

  $scope.chamar = function() {
    var ServerChamar = $resource('/server/fila/chamar');

    //enviado requisicao para o server para chamar o primeiro
    ServerChamar.query(
      function(data) {

        $scope.listaFila = data;

        //pegando o o nome chamado e enviado via socket.io
        //var msg = data.nome + " " + data.sobrenome;
        //socket.emit('send-server',{msg: msg});
      },
      function(erro) {
        console.log(erro);
      }
    );
  };

  //mudando a cor dos que estao chamando na fila
  $scope.consultando = function(estado) {
    var stilo = null;

    if (estado == true) {
      stilo = {
        "background-color": "red",
        "color": "white"
      };
    } else {
      stilo = "";
    }
    return stilo;

  };

}]);

app.controller('AgendaCadastroCtrl', ['$scope', '$resource', '$location', function($scope, $resource, $location) {
  var ServerMedico = $resource('/server/medico');
  var Server = $resource('/server/agenda');

  $scope.listaAgenda = "";
  $scope.campoMedico = ""

  $scope.criarAgenda = function(agenda) {

    agenda.id_medico = $scope.campoMedico._id;
    agenda.nome_medico = $scope.campoMedico.nome + " " + $scope.campoMedico.sobrenome;

    Server.save(agenda, function (data) {
        $location.path("/agenda");
    },
    function (erro) {
        console.log(erro);
    });
  };
  $scope.listaMedico = function() {

    //limpando o campo de paciente ja clicado
    $scope.busca = "";

    $scope.menuLegenda = "Selecione um Medico";
    $scope.tabela1 = "Nome";
    $scope.tabela2 = "Sobrenome";
    $scope.tabela3 = "especialização";

    ServerMedico.query(
      function(data) {
        $scope.listMedico = data;
      },
      function(erro) {
        console.log(error);
      }
    )
  };
  $scope.adicionarMedico = function(medico) {
    $scope.campoMedico = medico;

    $scope.listMedico = null;
    $scope.menuLegenda = null;
    $scope.tabela1 = null;
    $scope.tabela2 = null;
    $scope.tabela3 = null;

    $scope.busca = "";
  };

}]);

app.controller('AgendaListarCtrl', ['$scope', '$resource', function ($scope, $resource) {
      var Server = $resource('/server/agenda');

      Server.query(
      function(data) {
        $scope.listaAgenda = data;
      },
      function (erro) {
        console.log(erro);
      });
}]);

app.controller('MedicoCtrl', ['$scope','$resource', function($scope, $resource) {
  var Server = $resource('/server/medico');

  Server.query(
    function(data) {
      $scope.listMedicos = data;
    },
    function(erro) {
      console.log(erro);
    }
  );
}]);

app.controller('CadastrarMedicoCtrl', ['$scope','$resource', '$location', function ($scope, $resource, $location) {

  $scope.adicinonarMedico = function(medico) {
    var Server = $resource('/server/medico');
    Server.save(medico, function(data) {
        $location.path("/medico");
      },
      function(erro) {
        console.log(erro);
      });
  }
}]);

app.controller('FixaMedicoCtrl', ['$scope', '$resource', '$routeParams', function($scope, $resource, $routeParams) {

  var id = $routeParams.id;
  var Server = $resource('/server/medico/' + id);

  Server.query(
    function(data) {
      $scope.medico = data[0];
    },
    function(erro) {
      console.log(erro);
    }
  );

}]);

app.controller('ChamarCtrl', ['$scope',function ($scope) {
  var socket = io('http://localhost:4555', {transports: ['websocket', 'polling', 'flashsocket']});
  var listaChamadas = [];

  $scope.lista = listaChamadas;

  var adicionar = function (nome) {
    listaChamadas.push(nome);
    $scope.lista = listaChamadas;
  }

  //adicionando na lista de chamados
  socket.on('notificacao', function(msg){
    adicionar(msg);
  });

  $scope.enviar = function(msgC) {
    $scope.msg = "";
    listaChamadas.push(msgC);
  };

}]);
