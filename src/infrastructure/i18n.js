const translations = {
  "pt-br": {
    // CLI Options
    cliDescription: "Gerar uma descoberta de produto estruturada usando a API do Product Discovery Agent",
    optApiUrl: "URL da API",
    optLang: "Código do idioma (pt-br, en-us)",
    optConfig: "Caminho para o arquivo de configuração JSON",
    optSave: "Salvar automaticamente o resultado JSON sem perguntar",
    optOutput: "Diretório de saída padrão",
    optFile: "Nome do arquivo de saída padrão",
    optNoSave: "Desabilitar prompt de salvamento",
    
    // Header
    headerTitle: "Product Discovery CLI",
    headerSubtitle: "Gerar uma descoberta de produto estruturada via API do Product Discovery Agent.",
    headerAuthor: "Autor",
    headerVersion: "Versão",
    headerLicense: "Licença",
    
    // ConsolePresenter
    generatedDiscovery: "Discovery JSON gerado:",
    error: "Erro:",
    
    // RunDiscoveryFlow
    askIdea: "O que você quer descobrir?",
    describeIdea: "Descreva sua ideia/problema/aplicação/dor:",
    callingApi: "Chamando a API de discovery...",
    discoveryCompleted: "Discovery completado.",
    discoveryFailed: "Discovery falhou.",
    askRetry: "Você quer tentar novamente?",
    askImprove: "Você quer melhorar o resultado?",
    savedTo: "Salvo em:",
    askAnother: "Você quer rodar discovery para outra ideia?",
    
    // CliController
    configError: "Erro no config:",
    
    // Validation
    required: "Este campo é obrigatório"
  },
  
  "en-us": {
    // CLI Options
    cliDescription: "Generate a structured product discovery using the Product Discovery Agent API",
    optApiUrl: "API URL",
    optLang: "Language code (pt-br, en-us)",
    optConfig: "Path to JSON config file",
    optSave: "Auto-save the JSON result without prompting",
    optOutput: "Default output directory",
    optFile: "Default output filename",
    optNoSave: "Disable saving prompt",
    
    // Header
    headerTitle: "Product Discovery CLI",
    headerSubtitle: "Generate a structured product discovery via the Product Discovery Agent API.",
    headerAuthor: "Author",
    headerVersion: "Version",
    headerLicense: "License",
    
    // ConsolePresenter
    generatedDiscovery: "Generated discovery JSON:",
    error: "Error:",
    
    // RunDiscoveryFlow
    askIdea: "What do you want to run discovery for?",
    describeIdea: "Describe your idea/problem/application/pain:",
    callingApi: "Calling the discovery API...",
    discoveryCompleted: "Discovery completed.",
    discoveryFailed: "Discovery failed.",
    askRetry: "Do you want to try again?",
    askImprove: "Do you want to improve the result?",
    savedTo: "Saved to:",
    askAnother: "Do you want to run discovery for another idea?",
    
    // CliController
    configError: "Config error:",
    
    // Validation
    required: "This field is required"
  }
};

function getTranslator(lang = "pt-br") {
  const normalizedLang = lang.toLowerCase();
  const texts = translations[normalizedLang] || translations["pt-br"];
  
  return {
    t: (key) => texts[key] || key,
    lang: normalizedLang
  };
}

module.exports = { getTranslator };
