import { prisma } from '../server.js'

const users_classesType = `
  type users_classes {
    id: ID!
    users: users
    classes: classes
  }

  input users_classesInput {
    id_users: Int
    id_classes: Int
  }
`

const users_classesMutations = `
  insertUsers_classes (value: users_classesInput): [users_classes]
  updateUsers_classes (id: Int!, value: users_classesInput): [users_classes]
  deleteUsers_classes (id: Int!): [users_classes]
`

const users_classesQuery = `
  getUsers_classes (id: Int): [users_classes]
  getUsers_classesBy (column: String, value: String): [users_classes] 
`
const users_classesInclude = {
  users: {
    include: {
      role: true
    }
  },
  classes: true
};


function getAll() {
  return prisma.users_classes.findMany({
    include: users_classesInclude
  })
}

const users_classesFunctions = {
  getUsers_classes: ({ id }) => {
    if (id) {
      return prisma.users_classes.findMany({
        where: {
          id: id
        },
        include: users_classesInclude
      })
    } else {
      return getAll()
    }
  },

  getUsers_classesBy: ({ column, value }) => {
    const v = isNaN(value) ? value : parseInt(value);
    const obj = Object.fromEntries(new Map([
      [column, v]
    ]));

    return prisma.users_classes.findMany({
      where: obj,
      include: users_classesInclude
    })
  },

  insertUsers_classes: async ({ value }) => {
    await prisma.users_classes.create({
      data: value
    })

    return getAll()
  },

  updateUsers_classes: async ({ id, value }) => {
    await prisma.users_classes.update({
      where: {
        id: id
      },
      data: value
    })

    return getAll()
  },

  deleteUsers_classes: async ({ id }) => {
    await prisma.users_classes.delete({
      where: {
        id: id
      }
    })

    return getAll()
  }
}

export {
  users_classesType,
  users_classesQuery,
  users_classesMutations,
  users_classesFunctions
}
