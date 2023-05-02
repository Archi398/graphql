import { prisma } from '../server.js'

const usersType = `
  type users {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    password: String!
    role: role
  }

  input usersInput {
    first_name: String!
    last_name: String!
    email: String!
    password: String!
    id_role: Int
  }
`

const usersMutations = `
  insertUsers (value: usersInput): [users]
  updateUsers (id: Int!, value: usersInput): [users]
  deleteUsers (id: Int!): [users]
`

const usersQuery = `
  getUsers (id: Int): [users]
`

const usersInclude = {
    role: true
};


function getAll(){
    return prisma.users.findMany({
        include: usersInclude
    })
}


const usersFunctions = {
    getUsers: ({ id }) => {
        if (id) {
            return prisma.users.findMany({
                where: {
                    id: id
                },
                include: usersInclude
            })
        } else {
            return getAll()
        }
    },

    insertUsers: async ({ value }) => {
        await prisma.users.create({
            data: value
        })

        return getAll()
    },

    updateUsers: async ({ id, value }) => {
        await prisma.users.update({
            where: {
                id: id
            },
            data: value
        })

        return getAll()
    },

    deleteUsers: async ({ id }) => {
        await prisma.users.delete({
            where: {
                id: id
            }
        })

        return getAll()
    }
}

export {
    usersType,
    usersQuery,
    usersMutations,
    usersFunctions
}
