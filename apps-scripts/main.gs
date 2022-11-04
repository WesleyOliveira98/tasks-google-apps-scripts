//Função doGet é padrão do Google para inicialização da sua aplicação através do link implantado
function doGet(){
  //Busca os dados na planilha
  var dados = getDados()

  //Cria template através do arquivo HTML e injeta os dados buscados
  var template = HtmlService.createTemplateFromFile('index')
  template.tasks = dados.tasks
  template.links = dados.links
  template.detalhes = dados.detalhes
  template.datas = dados.datas
  //Realiza a contagem das tasks concluidas
  template.tasksConcluidas = dados.datas.filter(data => data !== "").length

  //Também seta configurações da página e de exibição em xframes
  return template.evaluate()
    .setTitle("Tasks")
    .setFaviconUrl("https://wesleyoliveira98.github.io/tasks-google-apps-scripts/img/icon.png")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
}

//Acessando a planilha e a aba desejada
var planilha = SpreadsheetApp.openById("1JzNUKsB0S7l1UzAwogQx8l2xKl8zYEfVmEIemIFBCsA")
var aba = planilha.getSheetByName("Tasks")

//Função que busca os dados na planilha
function getDados(){
  //Busca matriz de dados na planilha
  var dados = aba.getRange(2,1,aba.getLastRow()-1,4).getValues()

  var res = {}

  //Separa os dados por posição e armazena no objeto
  res.tasks = dados.map(function(r){return r[0];});
  res.links = dados.map(function(r){return r[1];});
  res.detalhes = dados.map(function(r){return r[2];});
  res.datas = dados.map(function(r){return r[3].toString();});

  Logger.log(res)

  return res
}

//Função para salvar a data de conslusão na planilha
function salvarTask(nome){
  var dados = getDados()
  for(let i=0;i<dados.tasks.length;i++){
    if(dados.tasks[i] == nome){
      aba.getRange(i+1,4).setValue(new Date())
    }
  }
}

//Função que permite incluir arquivos HTML ao seu index, usamos ela para separar o CSS e o Javascript do HTML
function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename).getContent()
}