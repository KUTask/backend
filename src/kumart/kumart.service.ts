import { InjectModel } from '@hirasawa_au/nestjs-typegoose'
import { Injectable } from '@nestjs/common'
import { ReturnModelType, DocumentType } from '@typegoose/typegoose'
import { createClientInstance, EnrollSubject, KUSectionDetail } from 'kuwrapper'
import { SectionTypeModel } from 'src/models/section-type.model'
import { SectionModel } from 'src/models/section.model'
import { SubjectModel } from 'src/models/subject.model'

type EnrollmentAndDetail = EnrollSubject & KUSectionDetail
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

  async getRegisteredCourses(
    username: string,
    password: string,
  ): Promise<EnrollmentAndDetail[]> {
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

  saveToDb(
    sections: Pick<
      EnrollmentAndDetail,
      | 'subjectNameEn'
      | 'subjectNameTh'
      | 'subjectCode'
      | 'sectionType'
      | 'sectionTypeEn'
      | 'sectionTypeTh'
      | 'schedules'
      | 'teacher'
      | 'sectionId'
    >[],
  ): Promise<DocumentType<SectionModel>[]> {
    return Promise.all(
      sections.map(async (section) => {
        const subjectDoc: Partial<SubjectModel> = {
          subject_name_en: section.subjectNameEn,
          subject_name_th: section.subjectNameTh,
        }
        const subject: DocumentType<SubjectModel> = await this.subjectModel
          .findOneAndUpdate({ subject_code: section.subjectCode }, subjectDoc, {
            new: true,
            upsert: true,
          })
          .exec()

        const sectionTypeDoc: Partial<SectionTypeModel> = {
          section_type_th: section.sectionTypeTh,
          section_type_en: section.sectionTypeEn,
        }

        const sectionType: DocumentType<SectionTypeModel> =
          await this.sectionTypeModel
            .findOneAndUpdate(
              { section_type_id: section.sectionType },
              sectionTypeDoc,
              {
                new: true,
                upsert: true,
              },
            )
            .exec()

        const sectionDoc: Partial<SectionModel> = {
          subject: subject._id,
          section_type: sectionType._id,
          coursedate: section.schedules,
          teacher_names: section.teacher.map((teacher) => teacher.nameTh),
          teacher_names_en: section.teacher.map((teacher) => teacher.nameEn),
        }

        return this.sectionModel
          .findOneAndUpdate(
            { section_id: section.sectionId.toString() },
            sectionDoc,
            {
              new: true,
              upsert: true,
            },
          )
          .exec()
      }),
    )
  }
}
