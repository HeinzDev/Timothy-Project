//exemplo script para tela de login

document.getElementById("login").addEventListener("submit", function (event){
    event.preventDefault();
        
    const formData = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    }

    fetch('http://localhost:8080/login',{
      method: 'POST',
      headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
    })
    .then((response)=>{
      return response.json()
    })
    .then(data => {
      console.log(data);
      if(data.hasOwnProperty('error')){
        console.log(data.error);
      }else{
        showToaster('Bem Vindo!', 'success');
        if (data.loggedIn){
          loggedIn = true;
        }
        
        window.location.href = "/";
      }

      if (data.error == 'Credenciais Inválidas!'){
        showToaster('Credenciais Inválidas!', 'alert')
      }
    })
    .catch(error => {
      console.error(error);
    });
    
  })