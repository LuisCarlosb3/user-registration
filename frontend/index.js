nameInput = document.getElementsByName('name')[0]
emailInput = document.getElementsByName('email')[0]
passwordInput = document.getElementsByName('password')[0]
passwordConfirmInput = document.getElementsByName('confirm_password')[0]
cpfInput = document.getElementsByName('cpf')[0]
stateInput = document.getElementsByName('state')[0]
cepInput = document.getElementsByName('cep')[0]
cityInput = document.getElementsByName('city')[0]
districtInput = document.getElementsByName('district')[0]
streetInput = document.getElementsByName('street')[0]
numberInput = document.getElementsByName('number')[0]
complemetInput = document.getElementsByName('complemet')[0]

passwordConfirmError = document.getElementById('password_confirm_error')
cepError = document.getElementById('cep_error')

registerForm = document.getElementById('register-form')

function getCEPInfo(cep){
  const cepFormated = cep.replace('-','')
  axios.get(`https://viacep.com.br/ws/${cepFormated}/json/`).then(response=>{
    cepError.style.display='none'  
    const { data } = response
    if(data.erro){
      cepError.style.display='block'
    }else{
      stateInput.value = data.uf
      cityInput.value = data.localidade
      districtInput.value = data.bairro
      streetInput.value = data.logradouro
    }
  })
  .catch(err=>{
    cepError.style.display='block'
  })
}
function passwordError(){
  password = passwordInput.value
  passwordConfirmation = passwordConfirmInput.value
  if(password!=passwordConfirmation){
    passwordConfirmError.style.display = 'block'
  }else {
    passwordConfirmError.style.display = 'none'
  }
}

cepInput.addEventListener("focusout", ()=>{
  cepValue = cepInput.value
  getCEPInfo(cepValue)
})
passwordConfirmInput.addEventListener("focusout", passwordError)
passwordInput.addEventListener("focusout", passwordError)
registerForm.addEventListener('submit',(event)=>{
  event.preventDefault() 
  const userPayload = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
    passwordConfirm: passwordConfirmInput.value,
    cpf: cpfInput.value,
    state: stateInput.value,
    cep: cepInput.value,
    city: cityInput.value,
    district: districtInput.value,
    street: streetInput.value,
    number: numberInput.value,
    complemet: complemetInput.value,
  }
  axios.post(`http://localhost:3333/register`,userPayload).then(response=>{
    const { status } = response
    if(status=='204'){
      alertify.alert('Sucesso', 'Seu cadastro foi realizado com sucesso')
    }else if(status == '400'){
      const { data } = response
      alertify.alert('Aviso', data)
    }else{
      alertify.alert('Ops... algo de errado aconteceu', 'Desculpe o incoveninente e tente novamente')
    }
  })
  .catch(err=>{
    alertify.alert('Ops... algo de errado aconteceu', 'Desculpe o incoveninente e tente novamente')
  })
})