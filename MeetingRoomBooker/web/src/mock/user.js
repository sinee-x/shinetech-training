const users = [
  {
    id: 1,
    email: "admin@google.com",
    username: "admin",
    password: "$2a$11$7ZpPqIcQUOH3sLGcE1liieOvTmwoKQ5VirPIgQ7mHlzHi3NW.Krxe",
    role: 0,
    createdAt: "2025-02-08T15:22:34.120214",
    lastModifiedAt: "2025-03-02T13:38:57.503Z"
  },
  {
    id: 2,
    email: "user1@google.com",
    username: "user1",
    password: "$2a$11$Mg.tXoCfczsrMcwwwlaDf.5VToSBroPxXcxkhZPLnDkY79kmVf/Ye",
    role: 1,
    createdAt: "2025-02-08T15:22:34.765764",
    lastModifiedAt: "2025-03-02T13:38:57.503Z"
  },
  {
    id: 3,
    email: "user2@google.com",
    username: "user2",
    password: "$2a$11$Mg.tXoCfczsrMcwwwlaDf.5VToSBroPxXcxkhZPLnDkY79kmVf/Ye",
    role: 1,
    createdAt: "2025-02-08T16:15:22.765764",
    lastModifiedAt: "2025-03-02T13:38:57.503Z"
  },
  {
    id: 4,
    email: "user3@google.com",
    username: "user3",
    password: "$2a$11$Mg.tXoCfczsrMcwwwlaDf.5VToSBroPxXcxkhZPLnDkY79kmVf/Ye",
    role: 1,
    createdAt: "2025-02-08T17:30:12.765764",
    lastModifiedAt: "2025-03-02T13:38:57.503Z"
  },
  {
    id: 5,
    email: "user4@google.com",
    username: "user4",
    password: "$2a$11$Mg.tXoCfczsrMcwwwlaDf.5VToSBroPxXcxkhZPLnDkY79kmVf/Ye",
    role: 1,
    createdAt: "2025-02-09T09:22:34.765764",
    lastModifiedAt: "2025-03-02T13:38:57.503Z"
  },
  {
    id: 6,
    email: "user5@google.com",
    username: "user5",
    password: "$2a$11$Mg.tXoCfczsrMcwwwlaDf.5VToSBroPxXcxkhZPLnDkY79kmVf/Ye",
    role: 1,
    createdAt: "2025-02-09T10:45:34.765764",
    lastModifiedAt: "2025-03-02T13:38:57.503Z"
  },
  {
    id: 7,
    email: "user6@google.com",
    username: "user6",
    password: "$2a$11$Mg.tXoCfczsrMcwwwlaDf.5VToSBroPxXcxkhZPLnDkY79kmVf/Ye",
    role: 1,
    createdAt: "2025-02-09T11:22:34.765764",
    lastModifiedAt: "2025-03-02T13:38:57.503Z"
  },
  {
    id: 8,
    email: "user7@google.com",
    username: "user7",
    password: "$2a$11$Mg.tXoCfczsrMcwwwlaDf.5VToSBroPxXcxkhZPLnDkY79kmVf/Ye",
    role: 1,
    createdAt: "2025-02-09T14:22:34.765764",
    lastModifiedAt: "2025-03-02T13:38:57.503Z"
  },
  {
    id: 9,
    email: "user8@google.com",
    username: "user8",
    password: "$2a$11$Mg.tXoCfczsrMcwwwlaDf.5VToSBroPxXcxkhZPLnDkY79kmVf/Ye",
    role: 1,
    createdAt: "2025-02-10T08:22:34.765764",
    lastModifiedAt: "2025-03-02T13:38:57.503Z"
  },
  {
    id: 10,
    email: "user9@google.com",
    username: "user9",
    password: "$2a$11$Mg.tXoCfczsrMcwwwlaDf.5VToSBroPxXcxkhZPLnDkY79kmVf/Ye",
    role: 1,
    createdAt: "2025-02-10T09:22:34.765764",
    lastModifiedAt: "2025-03-02T13:38:57.503Z"
  },
  {
    id: 11,
    email: "user10@google.com",
    username: "user10",
    password: "$2a$11$Mg.tXoCfczsrMcwwwlaDf.5VToSBroPxXcxkhZPLnDkY79kmVf/Ye",
    role: 1,
    createdAt: "2025-02-10T10:22:34.765764",
    lastModifiedAt: "2025-03-02T13:38:57.503Z"
  },
  {
    id: 12,
    email: "user11@google.com",
    username: "user11",
    password: "$2a$11$Mg.tXoCfczsrMcwwwlaDf.5VToSBroPxXcxkhZPLnDkY79kmVf/Ye",
    role: 1,
    createdAt: "2025-02-10T11:22:34.765764",
    lastModifiedAt: "2025-03-02T13:38:57.503Z"
  },
  {
    id: 13,
    email: "user12@google.com",
    username: "user12",
    password: "$2a$11$Mg.tXoCfczsrMcwwwlaDf.5VToSBroPxXcxkhZPLnDkY79kmVf/Ye",
    role: 1,
    createdAt: "2025-02-10T13:22:34.765764",
    lastModifiedAt: "2025-03-02T13:38:57.503Z"
  },
  {
    id: 14,
    email: "user13@google.com",
    username: "user13",
    password: "$2a$11$Mg.tXoCfczsrMcwwwlaDf.5VToSBroPxXcxkhZPLnDkY79kmVf/Ye",
    role: 1,
    createdAt: "2025-02-11T09:22:34.765764",
    lastModifiedAt: "2025-03-02T13:38:57.503Z"
  },
  {
    id: 15,
    email: "user14@google.com",
    username: "user14",
    password: "$2a$11$Mg.tXoCfczsrMcwwwlaDf.5VToSBroPxXcxkhZPLnDkY79kmVf/Ye",
    role: 1,
    createdAt: "2025-02-11T10:22:34.765764",
    lastModifiedAt: "2025-03-02T13:38:57.503Z"
  },
  {
    id: 16,
    email: "user15@google.com",
    username: "user15",
    password: "$2a$11$Mg.tXoCfczsrMcwwwlaDf.5VToSBroPxXcxkhZPLnDkY79kmVf/Ye",
    role: 1,
    createdAt: "2025-02-11T11:22:34.765764",
    lastModifiedAt: "2025-03-02T13:38:57.503Z"
  },
  {
    id: 17,
    email: "user16@google.com",
    username: "user16",
    password: "$2a$11$Mg.tXoCfczsrMcwwwlaDf.5VToSBroPxXcxkhZPLnDkY79kmVf/Ye",
    role: 1,
    createdAt: "2025-02-11T14:22:34.765764",
    lastModifiedAt: "2025-03-02T13:38:57.503Z"
  },
  {
    id: 18,
    email: "user17@google.com",
    username: "user17",
    password: "$2a$11$Mg.tXoCfczsrMcwwwlaDf.5VToSBroPxXcxkhZPLnDkY79kmVf/Ye",
    role: 1,
    createdAt: "2025-02-12T09:22:34.765764",
    lastModifiedAt: "2025-03-02T13:38:57.503Z"
  },
  {
    id: 19,
    email: "user18@google.com",
    username: "user18",
    password: "$2a$11$Mg.tXoCfczsrMcwwwlaDf.5VToSBroPxXcxkhZPLnDkY79kmVf/Ye",
    role: 1,
    createdAt: "2025-02-12T10:22:34.765764",
    lastModifiedAt: "2025-03-02T13:38:57.503Z"
  },
  {
    id: 20,
    email: "user19@google.com",
    username: "user19",
    password: "$2a$11$Mg.tXoCfczsrMcwwwlaDf.5VToSBroPxXcxkhZPLnDkY79kmVf/Ye",
    role: 1,
    createdAt: "2025-02-12T11:22:34.765764",
    lastModifiedAt: "2025-03-02T13:38:57.503Z"
  }
];

export default users;