import { IFileUpload } from 'Contracts/interfaces/FileUploadInterface'
import AWS from 'aws-sdk'
import fs from 'fs'
import path from 'path'
import { FileUploadDTO } from 'Contracts/Dtos/promotion/FileUploadDTO'

export class FileUpload implements IFileUpload {
  private s3: AWS.S3
  private bucket: string

  constructor() {
    AWS.config.update({ region: 'us-east-1' })
    this.s3 = new AWS.S3({ apiVersion: '2006-03-01' })
    this.bucket = 'obah-file-storage'
  }

  public async uploadImage(filePath: string, mimetype: string): Promise<FileUploadDTO> {
    return new Promise((resolve, reject) => {
      var file = filePath

      // Configure the file stream and obtain the upload parameters
      var fileStream = fs.createReadStream(file)
      fileStream.on('error', function (err) {
        console.log('File Error', err)
      })

      // call S3 to retrieve upload file to specified bucket
      this.s3.upload(
        {
          Bucket: this.bucket,
          Body: fileStream,
          Key: path.basename(file),
          ContentType: mimetype,
        },
        function (err, data) {
          if (err) {
            console.log('Error', err)
            reject(err)
          }

          if (data) {
            const { Bucket, Location, Key, ETag } = data
            console.log('Upload Success', data.Location)
            const fileUploadDTO = new FileUploadDTO()
            fileUploadDTO.Bucket = Bucket
            fileUploadDTO.Location = Location
            fileUploadDTO.key = Key
            fileUploadDTO.ETag = ETag
            resolve(fileUploadDTO)
          }
        }
      )
    })
  }

  uploadFile(): Promise<FileUploadDTO> {
    throw new Error('Method not implemented.')
  }
}
