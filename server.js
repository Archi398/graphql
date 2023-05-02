import { PrismaClient } from '@prisma/client'
import express from 'express'
import { buildSchema } from 'graphql'
import { graphqlHTTP } from 'express-graphql'

import {
  roleType,
  roleQuery,
  roleMutations,
  roleFunctions
} from "./objects/role.js";
import {
  usersType,
  usersQuery,
  usersMutations,
  usersFunctions
} from "./objects/users.js";
import {
  subjectType,
  subjectQuery,
  subjectMutations,
  subjectFunctions
} from "./objects/subject.js";
import {
  marksType,
  marksQuery,
  marksMutations,
  marksFunctions
} from "./objects/marks.js";
import {
  classesType,
  classesQuery,
  classesMutations,
  classesFunctions
} from "./objects/classes.js";
import {
  users_classesType,
  users_classesQuery,
  users_classesMutations,
  users_classesFunctions
} from "./objects/users_classes.js";
import {
  buildingType,
  buildingQuery,
  buildingMutations,
  buildingFunctions
} from "./objects/building.js";
import {
  classroomType,
  classroomQuery,
  classroomMutations,
  classroomFunctions
} from "./objects/classroom.js"
import {
  classes_classroomType,
  classes_classroomQuery,
  classes_classroomMutations,
  classes_classroomFunctions
} from "./objects/classes_classroom.js";
import {
  absencesType,
  absencesQuery,
  absencesMutations,
  absencesFunctions
} from "./objects/absences.js";

export const prisma = new PrismaClient()

var schema = buildSchema(`
  ${roleType}
  ${usersType}
  ${subjectType}
  ${marksType}
  ${classesType}
  ${users_classesType}
  ${buildingType}
  ${classroomType}
  ${classes_classroomType}
  ${absencesType}

  type Query {
    ${roleQuery}
    ${usersQuery}
    ${subjectQuery}
    ${marksQuery}
    ${classesQuery}
    ${users_classesQuery}
    ${buildingQuery}
    ${classroomQuery}
    ${classes_classroomQuery}
    ${absencesQuery}
  }

  type Mutation {
    ${roleMutations}
    ${usersMutations}
    ${subjectMutations}
    ${marksMutations}
    ${classesMutations}
    ${users_classesMutations}
    ${buildingMutations}
    ${classroomMutations}
    ${classes_classroomMutations}
    ${absencesMutations}
  }
`)

var root = {
  ...roleFunctions,
  ...usersFunctions,
  ...subjectFunctions,
  ...marksFunctions,
  ...classesFunctions,
  ...users_classesFunctions,
  ...buildingFunctions,
  ...classroomFunctions,
  ...classes_classroomFunctions,
  ...absencesFunctions
}

var app = express()
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
)
app.listen(4000)
console.log("Running a GraphQL API server at http://localhost:4000/graphql")