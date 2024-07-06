//"http://localhost:3000/chat/messages/";
//"https://antonellis.com.br/ufms/pw/chat/messages/";

const servidor = "https://antonellis.com.br/ufms/pw/chat/messages/";


/* 
 *  Função para verificar mudanças no estado de autenticação do usuário
 *  Essa função é acionada quando o estado de autenticação é alterado.
 *  Por exemplo, quando o usuário entra ou sai do sistema.
 *	@param user = variável com os dados do usuário
 */
function authStateObserver(user) {
  if (user) { // Usuário está autenticado!

    // Implemente as alterações que julgar necessário na interface
    // para quando o usuário estiver autenticado.
    // Por exemplo:
    //     - Esconder o botão de login
    //     - tornar visível o campo de envio de mensagens

    receiverId = null;
    receiverName = null;

    document.getElementById("idSair").disabled = false;
    document.getElementById("idEntrar").disabled = true;
    document.getElementById("idCorArea").style.display = "inline";

    var perfil = document.getElementById("perfil-info");
    perfil.innerHTML = "";

    var foto = document.createElement("img");
    foto.setAttribute("src", getProfileImageUrl());
    foto.setAttribute("alt", "Imagem de perfil");
    perfil.appendChild(foto);

    var nome = document.createElement("p");
    var nomeTexto = document.createTextNode(getUserName());
    nome.appendChild(nomeTexto);
    perfil.appendChild(nome);

    var textoArea = document.getElementById("idText");
    textoArea.addEventListener("input", () => {
      if (textoArea.value.trim() === "") {
        document.getElementById("idEnviarMensagem").disabled = true;
      }
      else {
        document.getElementById("idEnviarMensagem").disabled = false;
      }
    })

    var contatos = document.getElementById("contatos-info");
    contatos.addEventListener("click", function (event) {
      let alvo = event.target;

      if (alvo.tagName !== "BUTTON")
        alvo = alvo.parentNode;

      receiverId = alvo.id;
      receiverName = alvo.lastChild.innerHTML;

      document.getElementById("idText").focus();
    })

    var grupo = document.getElementById("contatos-grupo");
    grupo.addEventListener("click", () => {

      receiverId = null;
      receiverName = null;

      document.getElementById("idText").focus();
    })


  } else { // Usuário não está autenticado!!

    // Implemente as alterações que julgar necessário na interface
    // para quando o usuário NÃO estiver autenticado.
    // Por exemplo:
    //     - Mostrar o botão de login
    //     - Esconder o campo de envio de mensagens
    document.getElementById("idSair").disabled = true;
    document.getElementById("idEntrar").disabled = false;
    document.getElementById("idEnviarMensagem").disabled = true;
    document.getElementById("idCorArea").style.display = "none";

    var perfil = document.getElementById("perfil-info");
    perfil.innerHTML = "";

    var foto = document.createElement("img");
    foto.setAttribute("src", "icons/profile-icon.png");
    foto.setAttribute("alt", "Imagem de perfil");
    perfil.appendChild(foto);

    var nome = document.createElement("p");
    var nomeTexto = document.createTextNode("Nome do usuário");
    nome.appendChild(nomeTexto);
    perfil.appendChild(nome);

  }
}

/* 
 *  Função para obter o conteúdo da mensagem que será enviada
 *	@return texto contido no textarea que será enviado
 */
function getMessageInput() {

  // Retornar o conteúdo que está dentro do elemento textarea.
  // A utilização do comando RETURN é obrigatória.
  // Por exemplo:
  //     return document.getElementById('message').value;
  return document.getElementById("idText").value;

}

/* 
 *  Função que contém o AJAX para ENVIAR a mensagem
 *	@param message_id = Código da mensagem que deve ser enviado junto com os
 *				        demais dados da requição AJAX
 */
function ajaxSendMessage(message_id) {

  // Os dados devem ser enviados via POST
  const today = new Date();
  let aaaa = today.getFullYear();
  let MM = today.getMonth() + 1;
  let dd = today.getDate();
  let hh = today.getHours();
  let mm = today.getMinutes();
  let ss = today.getSeconds();

  if (dd < 10) dd = '0' + dd;
  if (MM < 10) MM = '0' + MM;
  if (hh < 10) hh = '0' + hh;
  if (mm < 10) mm = '0' + mm;
  if (ss < 10) ss = '0' + ss;

  let dataHora = dd + "/" + MM + "/" + aaaa + " " + hh + ":" + mm + ":" + ss;
  let sender_id = getUserId();
  let sender_name = getUserName();
  let sender_image = getProfileImageUrl();
  var message = getMessageInput();
  var cor = document.getElementById("corMensagem").value;


  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      timestamp: dataHora,
      sender_id: sender_id,
      sender_name: sender_name,
      sender_image: sender_image,
      receiver_id: receiverId,
      receiver_name: receiverName,
      visibility: true,
      message_id: message_id,
      message_text: message,
      color: cor
    })
  }


  //"https://antonellis.com.br/ufms/pw/chat/messages"
  //"http://localhost:3000/chat/messages"
  fetch(servidor, params)
    .catch(erro => console.log(erro))

  receiverId = null;
  receiverName = null;

  document.getElementById("idText").value = "";

}

/* 
 *  Função que contém o AJAX para RECEBER a mensagem
 *	@param message_id = Código da mensagem que deve ser enviado junto com
 *				  		a requição AJAX
 */
function ajaxReceiveMessage(message_id) {

  // Os dados devem ser enviados via POST
  // Chamar a função displayMessage(data_message) quando os dados voltarem do servidor

  /*
  const params = {
    method: "GET",
    headers: {
      "Origin": "http://127.0.0.1:5500",
      "Content-Type": "application/json"
    }
  }*/

  //"https://antonellis.com.br/ufms/pw/chat/messages/"
  //"http://localhost:3000/chat/messages/"
  fetch(servidor + message_id)
    .then(resposta => resposta.json())
    .then(mensagem => {

        displayMessage(mensagem);

    })
    .catch(error => console.log(error))

}

/* 
 *  Função que contém o AJAX para ENVIAR uma mensagem quando o usuário ENTRA no chat
 *  @param message_id = Código da mensagem que deve ser enviado junto com os
 *                demais dados da requição AJAX
 */
function ajaxSendMessageLogin(message_id) {

  // Os dados devem ser enviados via POST

  const today = new Date();
  let aaaa = today.getFullYear();
  let MM = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  let hh = today.getHours();
  let mm = today.getMinutes();
  let ss = today.getSeconds();

  if (dd < 10) dd = '0' + dd;
  if (MM < 10) MM = '0' + MM;
  if (hh < 10) hh = '0' + hh;
  if (mm < 10) mm = '0' + mm;
  if (ss < 10) ss = '0' + ss;

  let dataHora = dd + "/" + MM + "/" + aaaa + " " + hh + ":" + mm + ":" + ss;
  let senderId = getUserId();
  let senderName = getUserName();
  let senderImage = getProfileImageUrl();


  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      timestamp: dataHora,
      sender_id: senderId,
      sender_name: senderName,
      sender_image: senderImage,
      receiver_id: "0",
      receiver_name: "System",
      visibility: true,
      message_id: message_id,
      message_text: "Entrou no chat!",
      color: "#999999"
    })
  }

  //"https://antonellis.com.br/ufms/pw/chat/messages"
  //"http://localhost:3000/chat/messages"
  fetch(servidor, params)
    .then(resultado => resultado.json())
    .catch(erro => console.log("catch: " + erro))

}

/* 
 *  Função que contém o AJAX para ENVIAR uma mensagem quando o usuário SAI no chat
 *  @param message_id = Código da mensagem que deve ser enviado junto com os
 *                demais dados da requição AJAX
 *  @param sender_id = Código do usuário que saiu do sistema
 *  @param sender_name = Nome do usuário que saiu do sistema
 *  @param sender_image = URL da imagem do usuário que saiu do sistema
 */
function ajaxSendMessageLogout(message_id, sender_id, sender_name, sender_image) {

  // Os dados devem ser enviados via POST

  const today = new Date();
  let aaaa = today.getFullYear();
  let MM = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  let hh = today.getHours();
  let mm = today.getMinutes();
  let ss = today.getSeconds();

  if (dd < 10) dd = '0' + dd;
  if (MM < 10) MM = '0' + MM;
  if (hh < 10) hh = '0' + hh;
  if (mm < 10) mm = '0' + mm;
  if (ss < 10) ss = '0' + ss;

  let dataHora = dd + "/" + MM + "/" + aaaa + " " + hh + ":" + mm + ":" + ss;


  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      timestamp: dataHora,
      sender_id: sender_id,
      sender_name: sender_name,
      sender_image: sender_image,
      receiver_id: "0",
      receiver_name: "System",
      visibility: true,
      message_id: message_id,
      message_text: "Saiu do chat!",
      color: "#999999"
    })
  }

  //"https://antonellis.com.br/ufms/pw/chat/messages"
  //"http://localhost:3000/chat/messages"
  fetch(servidor, params)
    .catch(erro => console.log("catch: " + erro))

}

/* 
 *  Função que é chamada quando um usuário ENTRA do chat
 *  @param user_id = Código do usuário que entrou do sistema
 *  @param user_name = Nome do usuário que entrou do sistema
 *  @param user_image = URL da imagem do usuário que entrou do sistema
 */
function showUserOnline(user_id, user_name, user_image) {

  // Inclua o novo usuário do chat na sua interface para que o usuário
  // que estiver autenticado no momento possa conversar diretamente com ele. 

  if (isUserSignedIn()) {
    let meu_id = getUserId();
    if (meu_id !== user_id) {

      let user = document.getElementById(user_id);
      if (!user) {
        let usuarios = document.getElementById("contatos-info");
        let botao = document.createElement("button");
        botao.setAttribute("class", "contato");
        botao.setAttribute("id", user_id);

        let imagem = document.createElement("img");
        imagem.setAttribute("src", user_image);
        imagem.setAttribute("alt", "Imagem de perfil");

        let paragrafo = document.createElement("p");
        let nome = document.createTextNode(user_name)
        paragrafo.append(nome);

        botao.append(imagem);
        botao.append(paragrafo);
        usuarios.append(botao);
      }
    }
  }
  else {
    let user = document.getElementById(user_id);
    if (!user) {
      let usuarios = document.getElementById("contatos-info");
      let botao = document.createElement("button");
      botao.setAttribute("class", "contato");
      botao.setAttribute("id", user_id);

      let imagem = document.createElement("img");
      imagem.setAttribute("src", user_image);
      imagem.setAttribute("alt", "Imagem de perfil");

      let paragrafo = document.createElement("p");
      let nome = document.createTextNode(user_name)
      paragrafo.append(nome);

      botao.append(imagem);
      botao.append(paragrafo);
      usuarios.append(botao);
    }
  }



}

/* 
 *  Função que é chamada quando um usuário SAI do chat
 *  @param user_id = Código do usuário que saiu do sistema
 */
function hideUserOnline(user_id) {

  // Enontrar na interface e remover o usuário que saiu do sistema para que
  // o usuário que estiver autenticado no momento não possa conversar diretamente com ele.
  // Para encontrar este usuário, considere o código fornecido como parâmetro.

  let usuario = document.getElementById(user_id);
  let usuarios = document.getElementById("contatos-info");
  if (usuario)
    usuarios.removeChild(usuario);

}

/* 
 *  Função que deve ser chamada quando quando a requisção AJAX que
 *  recupera a mensagem do servidor retornar os valores 
 *  @param data_message = JSON com oados da mensagem retornada 
 *                        que segue o formato especificado nos requisitos
 */
function displayMessage(data_message) {

  // Alterar a interface para mostrar a mensagem recebida

  var my_id
  if(isUserSignedIn())
    my_id = getUserId();
  else
    my_id = null;
  if (data_message.receiver_id === null || data_message.receiver_id === "0" || data_message.receiver_id === my_id  || data_message.sender_id === my_id) {
    

    let chat = document.getElementById("convesa-info")
    let paragrafo = document.createElement("p");

    let hora = data_message.timestamp.split(" ");
    hora = hora[1].split(":");
    hora = hora[0] + ":" + hora[1];

    let mensagem = data_message.sender_name + " (" + hora + "): " + data_message.message_text;
    mensagem.split("\n").join("<br />");
    let texto = document.createTextNode(mensagem);
    paragrafo.appendChild(texto);
    chat.appendChild(paragrafo);
    paragrafo.style.marginLeft = "15px";
    paragrafo.style.color = data_message.color;
  }


}





