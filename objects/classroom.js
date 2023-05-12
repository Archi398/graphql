import { prisma } from '../server.js'

const classroomType = `
  type classroom {
    id: ID!
    name: String!
    building: building
  }

  input classroomInput {
    name: String
    id_building: Int
  }
`

const classroomMutations = `
  insertClassroom (value: classroomInput): [classroom]
  updateClassroom (id: Int!, value: classroomInput): [classroom]
  deleteClassroom (id: Int!): [classroom]
`

const classroomQuery = `
  getClassroom (id: Int): [classroom]
  getClassroomBy (column: String, value: String): [classroom] 
`
const classroomInclude = {
  building: true
};


function getAll() {
  return prisma.classroom.findMany({
    include: classroomInclude
  })
}

const classroomFunctions = {
  getClassroom: ({ id }) => {
    if (id) {
      return prisma.classroom.findMany({
        where: {
          id: id
        },
        include: classroomInclude
      })
    } else {
      return getAll()
    }
  },

  getClassroomBy: ({ column, value }) => {
    const v = isNaN(value) ? value : parseInt(value);
    const obj = Object.fromEntries(new Map([
      [column, v]
    ]));

    return prisma.classroom.findMany({
      where: obj,
      include: classroomInclude
    })
  },

  insertClassroom: async ({ value }) => {
    await prisma.classroom.create({
      data: value
    })

    return getAll()
  },

  updateClassroom: async ({ id, value }) => {
    await prisma.classroom.update({
      where: {
        id: id
      },
      data: value
    })

    return getAll()
  },

  deleteClassroom: async ({ id }) => {
    await prisma.classroom.delete({
      where: {
        id: id
      }
    })

    return getAll()
  }
}

export {
  classroomType,
  classroomQuery,
  classroomMutations,
  classroomFunctions
}
