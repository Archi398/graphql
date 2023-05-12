import { prisma } from '../server.js'

const classes_classroomType = `

scalar DateTime

  type classes_classroom {
    id: ID!
    date_min: DateTime!
    date_max: DateTime!
    classes: classes
    classroom: classroom
    users: users
    subject: subject
  }

  input classes_classroomInput {
    date_min: DateTime!
    date_max: DateTime!
    id_classes: Int
    id_classroom: Int
    id_teacher: Int
    id_subject: Int
  }
`

const classes_classroomMutations = `
  insertClasses_classroom (value: classes_classroomInput): [classes_classroom]
  updateClasses_classroom (id: Int!, value: classes_classroomInput): [classes_classroom]
  deleteClasses_classroom (id: Int!): [classes_classroom]
`

const classes_classroomQuery = `
  getClasses_classroom (id: Int): [classes_classroom]
  getClasses_classroomBy (column: String, value: String): [classes_classroom] 
`
const classes_classroomInclude = {
    classes: true,
    classroom: {
        include: {
            building: true
        }
    },
    users: {
        include: {
            role: true
        }
    },
    subject: true
};


function getAll() {
    return prisma.classes_classroom.findMany({
        include: classes_classroomInclude
    })
}

const classes_classroomFunctions = {
    getClasses_classroom: ({ id }) => {
        if (id) {
            return prisma.classes_classroom.findMany({
                where: {
                    id: id
                },
                include: classes_classroomInclude
            })
        } else {
            return getAll()
        }
    },

    getClasses_classroomBy: ({ column, value }) => {
        const v = isNaN(value) ? value : parseInt(value);
        const obj = Object.fromEntries(new Map([
            [column, v]
        ]));

        return prisma.classes_classroom.findMany({
            where: obj,
            include: classes_classroomInclude
        })
    },

    insertClasses_classroom: async ({ value }) => {
        const checkRoleUser = await prisma.users.findUnique({
            where: {
                id: value.id_teacher
            }
        })

        if (checkRoleUser.id_role != 2) {
            throw new Error('This users is not a teacher');
        }

        await prisma.classes_classroom.create({
            data: value
        })

        return getAll()
    },

    updateClasses_classroom: async ({ id, value }) => {
        await prisma.classes_classroom.update({
            where: {
                id: id
            },
            data: value
        })

        return getAll()
    },

    deleteClasses_classroom: async ({ id }) => {
        await prisma.classes_classroom.delete({
            where: {
                id: id
            }
        })

        return getAll()
    }
}

export {
    classes_classroomType,
    classes_classroomQuery,
    classes_classroomMutations,
    classes_classroomFunctions
}
