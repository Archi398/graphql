import { prisma } from '../server.js'

const buildingType = `
  type building {
    id: ID!
    name: String!
    adress: String!
  }

  input buildingInput {
    name: String!
    adress: String!
  }
`

const buildingMutations = `
  insertBuilding (value: buildingInput): [building]
  updateBuilding (id: Int!, value: buildingInput): [building]
  deleteBuilding (id: Int!): [building]
`

const buildingQuery = `
  getBuilding (id: Int): [building]
  getBuildingBy (column: String, value: String): [building] 
`
function getAll() {
  return prisma.building.findMany()
}


const buildingFunctions = {
  getBuilding: ({ id }) => {
    if (id) {
      return prisma.building.findMany({
        where: {
          id: id
        }
      })
    } else {
      return getAll()
    }
  },

  getBuildingBy: ({ column, value }) => {
    const v = isNaN(value) ? value : parseInt(value);
    const obj = Object.fromEntries(new Map([
      [column, v]
    ]));

    return prisma.building.findMany({
      where: obj
    })
  },

  insertBuilding: async ({ value }) => {
    await prisma.building.create({
      data: value
    })

    return getAll()
  },

  updateBuilding: async ({ id, value }) => {
    await prisma.building.update({
      where: {
        id: id
      },
      data: value
    })

    return getAll()
  },

  deleteBuilding: async ({ id }) => {
    await prisma.building.delete({
      where: {
        id: id
      }
    })

    return getAll()
  }
}

export {
  buildingType,
  buildingQuery,
  buildingMutations,
  buildingFunctions
}
