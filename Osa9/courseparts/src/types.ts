export interface HeaderProps {
    name: string;
  }

 export interface ContentProps {
    name: string,
    exerciseCount: number,
    kind: string,
    description: string
  }

  interface CourseReq extends CourseDesc {
    kind: "special"
    requirements: string[]
  }
  
  interface CourseDesc extends CoursePartBase{
    description: string
  }


  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }
  
  interface CoursePartBasic extends CourseDesc {
    kind: "basic"
  }
  
  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
  }
  
  interface CoursePartBackround extends CourseDesc {
    backroundMaterial: string;
    kind: "background"
  }
  
 export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackround | CourseReq;