export interface IEmbeddedVideo extends Document {
  id: string;
  title: string;
  description?: string;
  provider: string;
  videoUrl: string;
  createdAt: Date;
  updatedAt: Date;
}
