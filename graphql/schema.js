
export const typeDefs = `#graphql
  type Book {
    id: ID!
    bookId:String!
    name: String!
    total_copies: Int!
    available_copies: Int!
    subject:[SubjectName!]!
    createdAt: String!
    updatedAt: String!
  }

  type SubjectName{
    id:ID!
    subject_name:String!
  }

  input SubjectNameInput {
  subject_name: String!
  }

  type Branch{
    id:ID!
    branchId:String!
    location:String!
    capacity:String!
    book:[BookSummary!]!
    staff:[StaffSummary!]!
  }
  
  type BookSummary{
    id:ID!
    bookId:String!
    subjects:[SubjectName!]!
  }

  input BookSummaryInput{
    bookId:String! 
    subjects:[SubjectNameInput!]!
  }

  type StaffSummary{
    id:ID!
    staffId:String!
  }

input StaffSummaryInput{
  staffId:String!
}

  type Staff{
    id:ID!
    staffId:String!
    name:String! 
    age:String! 
    gender:String! 
    current_branch:String! 
    role:String! 
    createdAt: String!
    updatedAt: String!
  }

  type Student{
    id:ID! 
    studentId:String! 
    name:String! 
    age:Int! 
    gender:String! 
    books_availed:[AvailedBooks!]!
    createdAt: String!
    updatedAt: String!
  }
  type AvailedBooks{
    id:ID! 
    bookId:String! 
    branchId:String! 
    availed_date:String! 
    return_date:String! 
    availed_time:String! 
    return_time:String! 
  }
  input AvailedBooksInput{
    bookId:String!
    branchId:String!
    availed_date:String!
    return_date:String!
    availed_time:String!
    return_time:String!
  }
  type Subject{
    id:ID! 
    subjectId:String! 
    subject_name:String! 
    total_books:Int! 
    frequency:Int! 
    books:[BookList!]! 
  }

  type BookList{
    id:ID! 
    bookId:String! 
  }
  input BookListInput{
    bookId:String!
  }
  type Time{
    id:ID! 
    designation:String! 
    Id:String! 
    branch:String! 
    date:String! 
    in_time:String! 
    out_time:String! 
  }

   type PeopleCount {
    studentCount: Int!
    staffCount: Int!
  }

  type BorrowBook{
    id:ID! 
    bookId:String!  
    name:String! 
    available_copies:Int!
  }
  type User {
    id: ID!
    email: String!
    password: String
    name: String!
    username: String!
    role: String!
    branch: String
  }
  # type AuthPayLoad{
  #   token:String!
  #   user:[User]!
  # }
    type Login{
     
      token:String! 
    }

  type Query {
    books: [Book]
    book(id: ID!): Book

    branches: [Branch]
    branch(id: ID!): Branch

    staff: [Staff] 
    getStaff(id: ID!): Staff

    students: [Student]
    student(id: ID!): Student

    subjects: [Subject]
    subject(id: ID!): Subject

    availableBooksBySubject(subjectId: String!): [Book]
    mostReadSubjects:[Subject]

    timeLogs: [Time]
    timeLog(id: ID!): Time

    #people count in library
    peopleCountInLibrary(from_time:String!,to_time:String!,branch:String!,date:String!):PeopleCount


  }

  type Mutation {
# book
  addBook(bookId: String!, name: String!, total_copies: Int!, available_copies: Int!, subject: [SubjectNameInput!]!): Book
  updateBook(id: ID!, bookId:String,name: String, total_copies: Int, available_copies: Int, subject: [SubjectNameInput!]): Book
  deleteBook(id: ID!): String
# branch
  addBranch(branchId: String!, location: String!, capacity: String!,book:[BookSummaryInput!]!,staff:[StaffSummaryInput!]!): Branch
  updateBranch(id: ID!,branchId: String, location: String, capacity: String,book:[BookSummaryInput],staff:[StaffSummaryInput]): Branch
  deleteBranch(id: ID!): String

#staff
  addStaff(staffId:String!,name:String!,age:String!,gender:String!,current_branch:String!,role:String!): Staff
  updateStaff(id: ID!, staffId:String,name:String,age:String,gender:String,current_branch:String,role:String): Staff
  deleteStaff(id: ID!): String

#student
  addStudent(studentId:String!,name:String!,age:Int!,gender:String!,books_availed:[AvailedBooksInput!]!): Student
  updateStudent(id: ID!, studentId:String,name:String,age:Int,gender:String,books_availed:[AvailedBooksInput!]): Student
  deleteStudent(id: ID!): String

#subject
  addSubject( subjectId:String! ,subject_name: String!, total_books: Int!, frequency: Int!,books:[BookListInput!]! ): Subject
  updateSubject(id: ID!, subjectId:String ,subject_name: String, total_books: Int, frequency: Int,books:[BookListInput!] ): Subject
  deleteSubject(id: ID!): String

  
#time
  logInTime(designation: String!, Id: String!, branch: String!, date: String!, in_time: String!): Time
  logOutTime(Id: String!, date: String!, out_time: String!): Time
  
#borrow book
  borrowBook(bookId: String!): BorrowBook

  Login(email:String! , password:String!):Login

  Register(email:String!,password:String!,name:String!,username:String!,role:String!,branch:String!):String

}

`;

