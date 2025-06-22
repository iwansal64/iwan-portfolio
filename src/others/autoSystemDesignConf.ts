export const interval_between_workflows: number = 10000;
export const workflow_creation_time: number = 5000;

type WorkflowDataType = {
  [key in Workflow]: WorkflowBlocks[];
};

export enum WorkflowBlocks {
  "Database" = "Database",
  "Backend" = "Backend",
  "Frontend" = "Frontend",
  "Captcha" = "Captcha",
  "Storage" = "Storage",
  "Provider" = "Provider",
  "MQTT" = "MQTT",
  "Backend2" = "Backend2",
}

export const workflow_options: {
  [key in WorkflowBlocks]: string[];
} = {
  Database: ["Mongo DB", "MySQL"],
  Backend: ["Astro", "NodeJS", "Rust", "Python", "PHP"],
  Frontend: ["Astro JS", "React JS", "Next JS"],
  Captcha: ["Google ReCAPTCHA", "hCAPTCHA"],
  Storage: ["Local Storage", "Cloud Storage"],
  Provider: ["Vercel", "Netlify", "Github"],
  MQTT: ["MQTT Server"],
  Backend2: ["Astro", "NodeJS", "Rust", "Python", "PHP"],
};

export enum Workflow {
  "CaptchaVerification" = "CaptchaVerification",
  "Authentication" = "Authentication",
  "ImageUpload" = "ImageUpload",
  "Registration" = "Registration",
}

export const workflow_data: WorkflowDataType = {
  CaptchaVerification: [WorkflowBlocks.Frontend, WorkflowBlocks.Backend, WorkflowBlocks.Captcha, WorkflowBlocks.Backend, WorkflowBlocks.Database, WorkflowBlocks.Backend, WorkflowBlocks.Frontend],
  Authentication: [WorkflowBlocks.Frontend, WorkflowBlocks.Backend, WorkflowBlocks.Database, WorkflowBlocks.Backend, WorkflowBlocks.Frontend],
  ImageUpload: [WorkflowBlocks.Frontend, WorkflowBlocks.Backend, WorkflowBlocks.Backend2, WorkflowBlocks.Storage, WorkflowBlocks.Backend2, WorkflowBlocks.Backend, WorkflowBlocks.Database, WorkflowBlocks.Backend, WorkflowBlocks.Frontend],
  Registration: [WorkflowBlocks.Frontend, WorkflowBlocks.Backend, WorkflowBlocks.Database, WorkflowBlocks.Backend, WorkflowBlocks.Frontend],
};