import { prisma } from '../server.js'

const classesType = `
  type classes {
    id: ID!
    name: String!
  }

  input classesInput {
    name: String!
  }
`

const classesMutations = `
  insertClasses (value: classesInput): [classes]
  updateClasses (id: Int!, value: classesInput): [classes]
  deleteClasses (id: Int!): [classes]
`

const classesQuery = `
  getClasses (id: Int): [classes]
  getClassesBy (column: String, value: String): [classes] 
`
function getAll() {
  return prisma.classes.findMany()
}


const classesFunctions = {
  getClasses: ({ id }) => {
    if (id) {
      return prisma.classes.findMany({
        where: {
          id: id
        }
      })
    } else {
      return getAll()
    }
  },

  getClassesBy: ({ column, value }) => {
    const v = isNaN(value) ? value : parseInt(value);
    const obj = Object.fromEntries(new Map([
      [column, v]
    ]));

    return prisma.classes.findMany({
      where: obj
    })
  },

  insertClasses: async ({ value }) => {
    await prisma.classes.create({
      data: value
    })

    return getAll()
  },

  updateClasses: async ({ id, value }) => {
    await prisma.classes.update({
      where: {
        id: id
      },
      data: value
    })

    return getAll()
  },

  deleteClasses: async ({ id }) => {
    await prisma.classes.delete({
      where: {
        id: id
      }
    })

    return getAll()
  }
}

export {
  classesType,
  classesQuery,
  classesMutations,
  classesFunctions
}
