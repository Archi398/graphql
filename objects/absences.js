import { prisma } from '../server.js'

const absencesType = `
  type absences {
    id: ID!
    classes_classroom: classes_classroom
    users: users
  }

  input absencesInput {
    id_classes_classroom: Int
    id_users: Int
  }
`

const absencesMutations = `
  insertAbsences (value: absencesInput): [absences]
  updateAbsences (id: Int!, value: absencesInput): [absences]
  deleteAbsences (id: Int!): [absences]
`

const absencesQuery = `
  getAbsences (id: Int): [absences]
`
const absencesInclude = {
    classes_classroom: {
        include: {
            classes: true,
            classroom: true,
            users: true,
            subject: true
        }
    },
    users: true
};


function getAll() {
    return prisma.absences.findMany({
        include: absencesInclude
    })
}

const absencesFunctions = {
    getAbsences: ({ id }) => {
        if (id) {
            return prisma.absences.findMany({
                where: {
                    id: id
                },
                include: absencesInclude
            })
        } else {
            return getAll()
        }
    },

    insertAbsences: async ({ value }) => {
        await prisma.absences.create({
            data: value
        })

        return getAll()
    },

    updateAbsences: async ({ id, value }) => {
        await prisma.absences.update({
            where: {
                id: id
            },
            data: value
        })

        return getAll()
    },

    deleteAbsences: async ({ id }) => {
        await prisma.absences.delete({
            where: {
                id: id
            }
        })

        return getAll()
    }
}

export {
    absencesType,
    absencesQuery,
    absencesMutations,
    absencesFunctions
}
