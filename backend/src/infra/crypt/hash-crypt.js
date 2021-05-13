import bcrypt from 'bcrypt'
export class HashCrypt {
  constructor (salt) {
    this.salt = salt
  }
  async crypt (value) {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }
}