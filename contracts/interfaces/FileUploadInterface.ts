import { FileUploadDTO } from 'Contracts/Dtos/promotion/FileUploadDTO'

export interface IFileUpload {
  uploadImage(filePath: string, mimetype: string): Promise<FileUploadDTO>
  uploadFile(): Promise<FileUploadDTO>
}
