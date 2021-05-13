import * as yup from 'yup'
export class UserRegistrationValidation {
  async validate(userInfo){
    const userRegistrationSchema = yup.object().shape({
      name: yup.string().required('Nome é obrigatório'),
      password: yup.string().required('Senha é obrigatório'),
      confirm_password: yup.string().oneOf([yup.ref('password'), null], 'Senhas devem ser iguais'),
      email: yup.string().email().required('E-mail é obrigatório'),
      cpf: yup.string().required('CPF é obrigatório'),
      cep: yup.string().required('CEP é obrigatório'),
      street: yup.string().required('Rua é obrigatório'),
      complement: yup.string(),
      district: yup.string().required('Bairro é obrigatório'),
      city: yup.string().required('Cidade é obrigatório'),
      state: yup.string().required('Estado é obrigatório'),
      number: yup.string()
    })
    const isValid = await userRegistrationSchema.isValid(userInfo)
    if(isValid){
      return null
    }else{
      return await userRegistrationSchema.validate(userInfo).catch(err =>{
        if(err){
          return new Error(err.errors)
        }
        return null
      })
    }
  }
}


