# [3.0.0](https://github.com/KUTask/backend/compare/v2.0.0...v3.0.0) (2022-05-23)


### Code Refactoring

* 💡 Refacter Query Mutation name ([#24](https://github.com/KUTask/backend/issues/24)) ([462cad4](https://github.com/KUTask/backend/commit/462cad477a39b01fcdf8f014f27bf54a4411a175))


### BREAKING CHANGES

* 🧨 Some queries and mutations are changed name please refresh the doc.

# [2.0.0](https://github.com/KUTask/backend/compare/v1.1.1...v2.0.0) (2022-05-23)


### Code Refactoring

* 💡 Change registeredCourse Mutation ([d52d47b](https://github.com/KUTask/backend/commit/d52d47ba86a3395ee33dcf9dbb89f67515255198))


### BREAKING CHANGES

* 🧨 sections -> getRegisteredSection

## [1.1.1](https://github.com/KUTask/backend/compare/v1.1.0...v1.1.1) (2022-05-23)


### Bug Fixes

* 🐛 Query user return nullable ([120452b](https://github.com/KUTask/backend/commit/120452b73d216b304d9b60c1334be02d2d55fdef))

# [1.1.0](https://github.com/KUTask/backend/compare/v1.0.0...v1.1.0) (2022-05-23)


### Features

* 🎸 Find user by id ([#23](https://github.com/KUTask/backend/issues/23)) ([cb18408](https://github.com/KUTask/backend/commit/cb1840801426f44f83c551501f8eace2e4be3ab7))

# 1.0.0 (2022-05-22)


### Bug Fixes

* 🐛 uid-1 duplicated ([f288fc9](https://github.com/KUTask/backend/commit/f288fc98d036f7577f0c02dc1cf239498cabf8ab))
* 🐛 use firebase environment instead ([8104e09](https://github.com/KUTask/backend/commit/8104e09597bf7a5a487998ec3b5129d890549cfb))
* 🐛 user can't update profile display name ([166824d](https://github.com/KUTask/backend/commit/166824d360e896a5c4c731ca0ba8d8f39fd883f3))
* Copy firebase json to root ([aa797c4](https://github.com/KUTask/backend/commit/aa797c4720fb66e10868e18f7488fde6a7ae403c))
* error when creating a new user ([#16](https://github.com/KUTask/backend/issues/16)) ([bd65289](https://github.com/KUTask/backend/commit/bd6528960e17ff049007d5b6c64c9d7999c89d37))
* Firebase Copy ([88088a3](https://github.com/KUTask/backend/commit/88088a3a8fe0878671dddd61d8ea3b30b7fdc55b))
* Graphql init with argument error ([9543806](https://github.com/KUTask/backend/commit/954380672cb8c0bc327f13976dccb2d93ec3f91d))
* **hot:** Change workflow directory ([#3](https://github.com/KUTask/backend/issues/3)) ([53fdc48](https://github.com/KUTask/backend/commit/53fdc4853777bf7e83769c62b94933df2bb67fba))
* Migrate to Nestjs ([#2](https://github.com/KUTask/backend/issues/2)) ([3159b55](https://github.com/KUTask/backend/commit/3159b55d0892b42b002f2471de57fb16e362fbcc))
* User can't create user because _id not found ([fdcf3ab](https://github.com/KUTask/backend/commit/fdcf3ab4798955afd415119c73978506df5aa82f))


### Features

* 🎸 Add email field ([#21](https://github.com/KUTask/backend/issues/21)) ([42fd8bc](https://github.com/KUTask/backend/commit/42fd8bc610cf5ac8446ab2bb9514f463e601b81a))
* 🎸 fetch user by id ([79ec865](https://github.com/KUTask/backend/commit/79ec86595d6c6d05d78ea4b71d1435ed5c7fb707))
* 🎸 Resolve Tasks and Lecture Medias in section ([#20](https://github.com/KUTask/backend/issues/20)) ([a11eae3](https://github.com/KUTask/backend/commit/a11eae3cb4bb23c5a568195f52993075579e33ea))
* 🎸 update database when user fetch courses ([64ad428](https://github.com/KUTask/backend/commit/64ad42815f15c8d3f05912fe090513cf2524ba26))
* Add docker for development ([#7](https://github.com/KUTask/backend/issues/7)) ([9738563](https://github.com/KUTask/backend/commit/9738563d366138f540179d83c344c993e8df32a8))
* Add graphql setup in project ([#5](https://github.com/KUTask/backend/issues/5)) ([d071dc6](https://github.com/KUTask/backend/commit/d071dc63c7733742325b06132a0ac4679b2b0010))
* Authentication System ([#6](https://github.com/KUTask/backend/issues/6)) ([3d37e13](https://github.com/KUTask/backend/commit/3d37e13015641996d171ee21c2123b75e0f58324))
* can send verified email to database and define expireDate ([#11](https://github.com/KUTask/backend/issues/11)) ([c32a14b](https://github.com/KUTask/backend/commit/c32a14bcfcd0d5e29bf34ff5167c9bc3f198bbf8))
* Change to Fastify and Change prettier rule ([#4](https://github.com/KUTask/backend/issues/4)) ([7921cc6](https://github.com/KUTask/backend/commit/7921cc6dc87055ab01f89c3dd590e3a2d10f501d))
* CRUD Lecture Media ([#19](https://github.com/KUTask/backend/issues/19)) ([60b462a](https://github.com/KUTask/backend/commit/60b462a7a5b8c6d0ad629a31ee29d8810cb57dc8))
* CRUD With Task ([#18](https://github.com/KUTask/backend/issues/18)) ([3acdd81](https://github.com/KUTask/backend/commit/3acdd81812dea9ae10298fe7fe50e2c764e99b38))
* fetch user by graphql query ([#9](https://github.com/KUTask/backend/issues/9)) ([e68d4ba](https://github.com/KUTask/backend/commit/e68d4ba7344eaa88d9990c9b39e96b48ca2dbe25))
* KU Mart ([#13](https://github.com/KUTask/backend/issues/13)) ([b1394b9](https://github.com/KUTask/backend/commit/b1394b99fdcf175ab9311abcdd2e007d70e5d41f))
* User can register his sections on local database ([#17](https://github.com/KUTask/backend/issues/17)) ([339cb81](https://github.com/KUTask/backend/commit/339cb8123e9a049ad326d21d55b3975e37a1aedd))
* User can update displayname. ([#10](https://github.com/KUTask/backend/issues/10)) ([772e053](https://github.com/KUTask/backend/commit/772e053d5d66b29a67251f2f5b1f3e9c402a1bd0))


### Performance Improvements

* Firebase instead Local ([#8](https://github.com/KUTask/backend/issues/8)) ([38b2833](https://github.com/KUTask/backend/commit/38b2833a99e2ce29e309a4598dd723a51bb13a2e))


### Reverts

* Revert "fix(deps): use nestjs-firebase-admin instead original firebase-admin (#12)" ([2799a54](https://github.com/KUTask/backend/commit/2799a548b2a55be75cd690a96f2601822911d90e)), closes [#12](https://github.com/KUTask/backend/issues/12)


### BREAKING CHANGES

* 🧨 Remove firebase.json
