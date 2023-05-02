import { prisma } from '../server.js'

const roleType = `
  type role {
    id: ID!
    name: String!
  }

  input roleInput {
    name: String!
  }
`

const roleMutations = `
  insertRole (value: roleInput): [role]
  updateRole (id: Int!, value: roleInput): [role]
  deleteRole (id: Int!): [role]
`

const roleQuery = `
  getRole (id: Int): [role]
`

function getAll() {
  return prisma.role.findMany()
}

const roleFunctions = {
  getRole: ({ id }) => {
    if (id) {
      return prisma.role.findMany({
        where: {
          id: id
        }
      })
    } else {
      return getAll()
    }
  },

  insertRole: async ({ value }) => {
    await prisma.role.create({
      data: value
    })

    return getAll()
  },

  updateRole: async ({ id, value }) => {
    await prisma.role.update({
      where: {
        id: id
      },
      data: value
    })

    return getAll()
  },

  deleteRole: async ({ id }) => {
    await prisma.role.delete({
      where: {
        id: id
      }
    })

    return getAll()
  }
}

export {
  roleType,
  roleQuery,
  roleMutations,
  roleFunctions
}
