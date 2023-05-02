import { prisma } from '../server.js'

const subjectType = `
  type subject {
    id: ID!
    name: String!
  }

  input subjectInput {
    name: String!
  }
`

const subjectMutations = `
  insertSubject (value: subjectInput): [subject]
  updateSubject (id: Int!, value: subjectInput): [subject]
  deleteSubject (id: Int!): [subject]
`

const subjectQuery = `
  getSubject (id: Int): [subject]
`
function getAll() {
  return prisma.subject.findMany()
}

const subjectFunctions = {
  getSubject: ({ id }) => {
    if (id) {
      return prisma.subject.findMany({
        where: {
          id: id
        }
      })
    } else {
      return getAll()
    }
  },

  insertSubject: async ({ value }) => {
    await prisma.subject.create({
      data: value
    })

    return getAll()
  },

  updateSubject: async ({ id, value }) => {
    await prisma.subject.update({
      where: {
        id: id
      },
      data: value
    })

    return getAll()
  },

  deleteSubject: async ({ id }) => {
    await prisma.subject.delete({
      where: {
        id: id
      }
    })

    return getAll()
  }
}

export {
  subjectType,
  subjectQuery,
  subjectMutations,
  subjectFunctions
}
