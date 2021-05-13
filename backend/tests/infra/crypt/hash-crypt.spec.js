import { HashCrypt } from '../../../src/infra/crypt/hash-crypt'
import bcrypt from 'bcrypt'
jest.mock('bcrypt', () => ({
  async hash () {
    return await new Promise(resolve => resolve('hash'))
  }
}))
const salt = 12
const makeSut = () => {
  return new HashCrypt(salt)
}
describe('crypt()', () => {
  test('Should call crypt with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.crypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })
  test('Should return a valid hash on crypt success', async () => {
    const sut = makeSut()
    const hash = await sut.crypt('any_value')
    expect(hash).toBe('hash')
  })
  test('Should throw if bcrypt hash throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const promise = sut.crypt('any_value')
    await expect(promise).rejects.toThrow()
  })
})