import { InjectModel } from '@hirasawa_au/nestjs-typegoose'
import { Injectable } from '@nestjs/common'
import { ReturnModelType, DocumentType } from '@typegoose/typegoose'
import { createClientInstance, EnrollSubject, KUSectionDetail } from 'kuwrapper'
import { SectionTypeModel } from 'src/models/section-type.model'
import { SectionModel } from 'src/models/section.model'
import { SubjectModel } from 'src/models/subject.model'

@Injectable()
export class KumartService {
  constructor(
    @InjectModel(SectionModel)
    private readonly sectionModel: ReturnModelType<typeof SectionModel>,
    @InjectModel(SubjectModel)
    private readonly subjectModel: ReturnModelType<typeof SubjectModel>,
    @InjectModel(SectionTypeModel)
    private readonly sectionTypeModel: ReturnModelType<typeof SectionTypeModel>,
  ) {}

  async getRegisteredCourses(username: string, password: string) {
    const client = await createClientInstance(username, password)
    const res = await client.getRegisteredCourses()
    return Promise.all(
      res.enrollSubjects.map(
        async (section): Promise<EnrollSubject & KUSectionDetail> => {
          const detailResponse = await client.getSectionDetail(
            section.sectionId.toString(),
          )

          return {
            ...section,
            ...detailResponse?.sectionDetail,
          }
        },
      ),
    )
  }

  // saveToDb(sections: EnrollSubject[]) {
  //   return Promise.all(
  //     sections.map(async (section) => {
  //       const subjectDoc: Partial<SubjectModel> = {
  //         subjectNameEn: section.subjectNameEn,
  //         subjectNameTh: section.subjectNameTh,
  //       }
  //       const subject: DocumentType<SubjectModel> = await this.subjectModel
  //         .findByIdAndUpdate(section.subjectCode, subjectDoc, {
  //           new: true,
  //           upsert: true,
  //         })
  //         .exec()

  //       const sectionTypeDoc: Partial<SectionTypeModel> = {
  //         sectionTypeTh: section.sectionTypeTh,
  //         sectionTypeEn: section.sectionTypeEn,
  //       }

  //       const sectionType: DocumentType<SectionTypeModel> =
  //         await this.sectionTypeModel
  //           .findByIdAndUpdate(section.sectionType, sectionTypeDoc, {
  //             new: true,
  //             upsert: true,
  //           })
  //           .exec()

  //       const sectionDoc: Partial<SectionModel> = {
  //         subject: subject._id,
  //         sectionType: sectionType._id,
  //         coursedate: section.
  //       }
  //     }),
  //   )
  // }
}
