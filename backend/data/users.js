
import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@email.com',
        password: bcrypt.hashSync('password', 10),
        isAdmin: true  
    },
    {
        name: 'Mark Davis',
        email: 'mark@email.com',
        password: bcrypt.hashSync('password', 10)
    },
    {
        name: 'James Michaels',
        email: 'james@email.com',
        password: bcrypt.hashSync('password', 10)
    },
]

export default users



