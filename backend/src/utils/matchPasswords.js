import bcrypt from 'bcrypt'

const matchPasswords = async (enteredPassword, actualPassword) => {
    return await bcrypt.compare(enteredPassword, actualPassword)
}

export default matchPasswords