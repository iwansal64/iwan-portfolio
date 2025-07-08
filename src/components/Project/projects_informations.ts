export enum Skill {
  FullStackDevelopment = "FullStack Development",
  SystemArchitect = "System Architect",
  FrontendDevelopment = "Frontend Development",
  BackendDevelopment = "Backend Development",
  MobileDevelopment = "Mobile Development",
}

export type ProjectInformationDataType = {
  title: string,
  description: string,
  labels: string[],
  skill: Skill[],
  time: {
    startDate: Date
    endDate: Date|"Discontinued"|"In Progress",
  }
  techStack?: string[],
  link?: string
};

export const project_informations: ProjectInformationDataType[] = [
  {
    title: "E-Lapor",
    description: "A project that I've been making in Mitra Industri Vocational HighSchool. The reason behind this website creation is that to help teachers in school manage reports",
    labels: ["Data Visualization", "Data Analysis", "System"],
    time: {
      startDate: new Date("2025-05-02"),
      endDate: "In Progress"
    },
    skill: [
      Skill.FullStackDevelopment,
      Skill.SystemArchitect
    ],
    techStack: [
      "AstroJS",
      "ReactJS",
      "Vercel",
      "MySQL"
    ],
    link: "https://webreport.smkind-mm2100.sch.id"
  },
  {
    title: "VAC",
    description: "An AI that can be used to guide user using a Linux Operating System. It can also be used fully offline, that means we don't need an internet connection after the first setup.",
    labels: ["Artificial Intelligence"],
    time: {
      startDate: new Date("2024-11-09"),
      endDate: new Date("2025-05-06")
    },
    skill: [
      Skill.FrontendDevelopment,
    ],
    techStack: [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    link: "https://github.com/iwansal64/VAC"
  },
  {
    title: "Todo-app",
    description: "This is a website that I've started with my foreign friend from US. This website is used for setting up your plan without an internet connection. So, we won't store the data. We just provide the application.",
    labels: ["Data Management", "Self Improvement"],
    time: {
      startDate: new Date("2024-11-19"),
      endDate: new Date("2025-01-09")
    },
    skill: [
      Skill.FrontendDevelopment,
    ],
    techStack: [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    link: "https://iwansal64.github.io/TO-LIST-APP/"
  },
];