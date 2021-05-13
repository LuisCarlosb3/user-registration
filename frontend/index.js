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


registerForm = document.getElementById('register-form')

function getCEPInfo(cep){
  const cepFormated = cep.replace('-','')
  axios.get(`https://viacep.com.br/ws/${cepFormated}/json/`).then(response=>{
    const { data } = response
    stateInput.value = data.uf
    cityInput.value = data.localidade
    districtInput.value = data.bairro
    streetInput.value = data.logradouro
  })
  .catch(err=>{
    alert('CEP Informado é invalido')
  })
}

cepInput.addEventListener("focusout", ()=>{
  cepValue = cepInput.value
  getCEPInfo(cepValue)
})
registerForm.addEventListener('submit',(event)=>{
  event.preventDefault() 
  const userPayload = {
    name = nameInput.value,
    email = emailInput.value,
    password = passwordInput.value,
    passwordConfirm = passwordConfirmInput.value,
    cpf = cpfInput.value,
    state = stateInput ,
    cep = cepInput ,
    city = cityInput ,
    district = districtInput ,
    street = streetInput ,
    number = numberInput ,
    complemet = complemetInput ,
  }
  axios.post(`http://localhost:3333/register`,userPayload).then(response=>{
    
  })
  .catch(err=>{
    alert('CEP Informado é invalido')
  })
})