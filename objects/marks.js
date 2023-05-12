import { prisma } from '../server.js'

const marksType = `
  type marks {
    id: ID!
    value: Float!
    subject: subject
    users_marks_id_studentTousers: users
    users_marks_id_teacherTousers: users
  }

  input marksInput {
    value: Float!
    id_subject: Int
    id_student: Int
    id_teacher: Int
  }
`

const marksMutations = `
  insertMarks (value: marksInput): [marks]
  updateMarks (id: Int!, value: marksInput): [marks]
  deleteMarks (id: Int!): [marks]
`

const marksQuery = `
  getMarks (id: Int): [marks]
  getMarksBy (column: String, value: String): [marks] 
`
const marksInclude = {
    subject: true,
    users_marks_id_studentTousers: {
        include: {
            role: true
        }
    },
    users_marks_id_teacherTousers: {
        include: {
            role: true
        }
    }
};


function getAll() {
    return prisma.marks.findMany({
        include: marksInclude
    })
}


const marksFunctions = {
    getMarks: ({ id }) => {
        if (id) {
            return prisma.marks.findMany({
                where: {
                    id: id
                },
                include: marksInclude
            })
        } else {
            return getAll()
        }
    },

    getMarksBy: ({ column, value }) => {
        const v = isNaN(value) ? value : parseInt(value);
        const obj = Object.fromEntries(new Map([
            [column, v]
        ]));

        return prisma.marks.findMany({
            where: obj
        })
    },

    insertMarks: async ({ value }) => {
        await prisma.marks.create({
            data: value
        })

        return getAll()
    },

    updateMarks: async ({ id, value }) => {
        await prisma.marks.update({
            where: {
                id: id
            },
            data: value
        })

        return getAll()
    },

    deleteMarks: async ({ id }) => {
        await prisma.marks.delete({
            where: {
                id: id
            }
        })

        return getAll()
    }
}

export {
    marksType,
    marksQuery,
    marksMutations,
    marksFunctions
}
