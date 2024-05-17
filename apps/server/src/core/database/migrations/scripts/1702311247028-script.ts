import { MigrationInterface, QueryRunner } from 'typeorm'

export class Script1702311247028 implements MigrationInterface {
  name = 'Script1702311247028'

  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.query(
        `
        INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('93b0b3cc-fbb0-4105-bacc-b4a9649d3b41', '7Savanna.Smitham-Kilback@gmail.com', 'David Wilson', 'https://i.imgur.com/YfJQV5z.png?id=9', 'suspended', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('d41a4664-e923-4ff7-ac55-a66cc5dcfa8d', '13Kaci.Heaney58@hotmail.com', 'Eva Garcia', 'https://i.imgur.com/YfJQV5z.png?id=15', 'active', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('57ec90f2-4f5b-43c9-9c54-c67fec7554c9', '19Dax.Auer@gmail.com', 'Eva Garcia', 'https://i.imgur.com/YfJQV5z.png?id=21', 'active', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('60641b23-20ac-4856-bf7a-ea6f48a5d206', '25Morgan84@hotmail.com', 'Eva Garcia', 'https://i.imgur.com/YfJQV5z.png?id=27', 'deleted', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('ff3762e1-c41d-4268-a951-e51b156c978d', '31Arnulfo19@hotmail.com', 'Eva Garcia', 'https://i.imgur.com/YfJQV5z.png?id=33', 'suspended', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('40b5e4c0-bb2a-449c-9bd8-a2753eddd8fb', '37Kelly.Ryan10@hotmail.com', 'Alice Johnson', 'https://i.imgur.com/YfJQV5z.png?id=39', 'active', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('febeb706-625c-4977-ad93-1a6ac7c67551', '43Everardo_Schowalter@gmail.com', 'David Wilson', 'https://i.imgur.com/YfJQV5z.png?id=45', 'suspended', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('c9b392d1-5f7b-4fed-93cb-a2a51ddd7871', '49Katherine.Stamm37@hotmail.com', 'Alice Johnson', 'https://i.imgur.com/YfJQV5z.png?id=51', 'suspended', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('94f3eae0-69c0-417a-9713-81e15fb1e861', '55Nannie_Wiza@yahoo.com', 'Eva Garcia', 'https://i.imgur.com/YfJQV5z.png?id=57', 'suspended', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('2c9fc255-64a9-4e82-938d-550eab5cd372', 'Task Reminder', 'Its time to check your habit progress for today.', 'Focus Helper', '64Clarabelle69@hotmail.com', 'https://i.imgur.com/YfJQV5z.png?id=65', 'https://i.imgur.com/YfJQV5z.png?id=66', '60641b23-20ac-4856-bf7a-ea6f48a5d206');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('f9a2a0bb-29eb-438e-b034-6ed3e57f60a6', 'Schedule Update', 'Time to focus Activate your focus mode now.', 'Habits Advisor', '71Elvie16@gmail.com', 'https://i.imgur.com/YfJQV5z.png?id=72', 'https://i.imgur.com/YfJQV5z.png?id=73', '57ec90f2-4f5b-43c9-9c54-c67fec7554c9');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('723f3241-f223-4cba-9882-b852509859cb', 'Habit Tracker Update', 'Time to focus Activate your focus mode now.', 'Scheduler Bot', '78Lance68@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=79', 'https://i.imgur.com/YfJQV5z.png?id=80', 'ff3762e1-c41d-4268-a951-e51b156c978d');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('4d66f783-eb2b-4167-ac19-3f43b3a39716', 'Focus Mode Reminder', 'Time to focus Activate your focus mode now.', 'Productivity App', '85Alvena93@gmail.com', 'https://i.imgur.com/YfJQV5z.png?id=86', 'https://i.imgur.com/YfJQV5z.png?id=87', '57ec90f2-4f5b-43c9-9c54-c67fec7554c9');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('b4dd2971-ea45-4fe2-8540-3474fc28e4c4', 'Task Reminder', 'Its time to check your habit progress for today.', 'Productivity App', '92Katheryn56@hotmail.com', 'https://i.imgur.com/YfJQV5z.png?id=93', 'https://i.imgur.com/YfJQV5z.png?id=94', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('3479f805-e33d-47ba-97c0-07c9193b5609', 'Goal Progress Alert', 'Its time to check your habit progress for today.', 'Goals Manager', '99Josie_Fay19@gmail.com', 'https://i.imgur.com/YfJQV5z.png?id=100', 'https://i.imgur.com/YfJQV5z.png?id=101', 'd41a4664-e923-4ff7-ac55-a66cc5dcfa8d');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('3813e510-b963-4a88-a7d2-e295f95ffeca', 'Goal Progress Alert', 'Time to focus Activate your focus mode now.', 'Productivity App', '106Modesta_Ledner96@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=107', 'https://i.imgur.com/YfJQV5z.png?id=108', '94f3eae0-69c0-417a-9713-81e15fb1e861');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('48fc82ea-4a72-42db-93a3-b640464a1c37', 'Task Reminder', 'Your weekly schedule has been updated.', 'Scheduler Bot', '113Beryl_Ebert74@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=114', 'https://i.imgur.com/YfJQV5z.png?id=115', '60641b23-20ac-4856-bf7a-ea6f48a5d206');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('e11c03c5-05fb-40ab-a8d7-a8ced5644e5e', 'Schedule Update', 'Time to focus Activate your focus mode now.', 'Productivity App', '120Ulises10@gmail.com', 'https://i.imgur.com/YfJQV5z.png?id=121', 'https://i.imgur.com/YfJQV5z.png?id=122', 'ff3762e1-c41d-4268-a951-e51b156c978d');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('47da23d4-30c6-44d6-b528-a48e56d405a8', 'Focus Mode Reminder', 'Time to focus Activate your focus mode now.', 'Goals Manager', '127Dewayne.Daugherty50@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=128', 'https://i.imgur.com/YfJQV5z.png?id=129', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');

INSERT INTO "journal" ("id", "title", "content", "likeDislikeFlag", "userId") VALUES ('ba96c00a-f085-4fa4-8f86-79b334eddf18', 'Morning Reflections', 'Reflected on the days achievements and setbacks feeling prepared for tomorrow.', true, '93b0b3cc-fbb0-4105-bacc-b4a9649d3b41');
INSERT INTO "journal" ("id", "title", "content", "likeDislikeFlag", "userId") VALUES ('7cbe14b4-ebc8-4729-b880-7960881a0d6e', 'Project Progress', 'Grateful for the support from my friends and the delicious lunch today.', true, '94f3eae0-69c0-417a-9713-81e15fb1e861');
INSERT INTO "journal" ("id", "title", "content", "likeDislikeFlag", "userId") VALUES ('5125d6eb-b21b-411c-92ea-204eb0bc2f2c', 'Morning Reflections', 'Reflected on the days achievements and setbacks feeling prepared for tomorrow.', false, 'c9b392d1-5f7b-4fed-93cb-a2a51ddd7871');
INSERT INTO "journal" ("id", "title", "content", "likeDislikeFlag", "userId") VALUES ('2eb82924-260e-4f10-ae2e-c47851cdbd39', 'Morning Reflections', 'Today I started with a refreshing morning jog and planned my study sessions.', true, 'c9b392d1-5f7b-4fed-93cb-a2a51ddd7871');
INSERT INTO "journal" ("id", "title", "content", "likeDislikeFlag", "userId") VALUES ('b7de4e0b-791b-4cfa-9e42-469a7b1ae33f', 'Project Progress', 'Grateful for the support from my friends and the delicious lunch today.', false, '94f3eae0-69c0-417a-9713-81e15fb1e861');
INSERT INTO "journal" ("id", "title", "content", "likeDislikeFlag", "userId") VALUES ('6820d93c-a3c8-4a73-ad04-e32bee14b1e9', 'Project Progress', 'Made significant progress on the science project experiments went well.', true, '94f3eae0-69c0-417a-9713-81e15fb1e861');
INSERT INTO "journal" ("id", "title", "content", "likeDislikeFlag", "userId") VALUES ('31d3dc5f-4b59-4024-9882-1fc5c9f6d7dd', 'Project Progress', 'Made significant progress on the science project experiments went well.', false, 'd41a4664-e923-4ff7-ac55-a66cc5dcfa8d');
INSERT INTO "journal" ("id", "title", "content", "likeDislikeFlag", "userId") VALUES ('6aec5ef5-bf91-470f-9fe2-67fb78a4de3b', 'Project Progress', 'Reflected on the days achievements and setbacks feeling prepared for tomorrow.', true, 'febeb706-625c-4977-ad93-1a6ac7c67551');
INSERT INTO "journal" ("id", "title", "content", "likeDislikeFlag", "userId") VALUES ('4c402a60-460b-45af-b401-a4d123225e21', 'Project Progress', 'Reflected on the days achievements and setbacks feeling prepared for tomorrow.', true, '94f3eae0-69c0-417a-9713-81e15fb1e861');
INSERT INTO "journal" ("id", "title", "content", "likeDislikeFlag", "userId") VALUES ('ceaa53bb-10f2-416c-ab94-4b4b5e28a22b', 'Study Session Insights', 'Today I started with a refreshing morning jog and planned my study sessions.', true, '93b0b3cc-fbb0-4105-bacc-b4a9649d3b41');

INSERT INTO "todo" ("id", "description", "status", "journalId") VALUES ('88a08e63-8fed-453d-a992-25f81bb3dfae', 'Write an essay on Shakespeare', 'in progress', '31d3dc5f-4b59-4024-9882-1fc5c9f6d7dd');
INSERT INTO "todo" ("id", "description", "status", "journalId") VALUES ('3ddf9469-26f1-4572-bc2f-fae573826c95', 'Study for chemistry quiz', 'in progress', '6aec5ef5-bf91-470f-9fe2-67fb78a4de3b');
INSERT INTO "todo" ("id", "description", "status", "journalId") VALUES ('4f47084f-1e2b-47bf-b759-b6ce99280b85', 'Complete project proposal', 'pending', '2eb82924-260e-4f10-ae2e-c47851cdbd39');
INSERT INTO "todo" ("id", "description", "status", "journalId") VALUES ('1131dd97-3d3d-4fa0-8ba3-ebd6c54b35ea', 'Complete project proposal', 'completed', '6aec5ef5-bf91-470f-9fe2-67fb78a4de3b');
INSERT INTO "todo" ("id", "description", "status", "journalId") VALUES ('8d4da499-397e-4306-8b14-0e260ddb61ee', 'Study for chemistry quiz', 'cancelled', 'b7de4e0b-791b-4cfa-9e42-469a7b1ae33f');
INSERT INTO "todo" ("id", "description", "status", "journalId") VALUES ('4d7006c9-faec-462d-836f-5f18431dbb7f', 'Finish math homework', 'overdue', '31d3dc5f-4b59-4024-9882-1fc5c9f6d7dd');
INSERT INTO "todo" ("id", "description", "status", "journalId") VALUES ('1dcb6bff-e38d-454a-bce7-86785b676ed2', 'Study for chemistry quiz', 'pending', '6820d93c-a3c8-4a73-ad04-e32bee14b1e9');
INSERT INTO "todo" ("id", "description", "status", "journalId") VALUES ('e50d9c9e-ec91-4a8c-a36e-8520510e9a5a', 'Study for chemistry quiz', 'in progress', 'ceaa53bb-10f2-416c-ab94-4b4b5e28a22b');
INSERT INTO "todo" ("id", "description", "status", "journalId") VALUES ('6bc29058-07ee-4492-ab99-b0591d318937', 'Study for chemistry quiz', 'in progress', '7cbe14b4-ebc8-4729-b880-7960881a0d6e');
INSERT INTO "todo" ("id", "description", "status", "journalId") VALUES ('5913be40-9d6b-4649-a247-7a6d1f8557e3', 'Write an essay on Shakespeare', 'overdue', 'ceaa53bb-10f2-416c-ab94-4b4b5e28a22b');

INSERT INTO "goal" ("id", "description", "status", "userId") VALUES ('b7cece24-8613-4c0c-81ae-1d3e47aaac54', 'Complete the final project for the computer science course', 'In Progress', 'c9b392d1-5f7b-4fed-93cb-a2a51ddd7871');
INSERT INTO "goal" ("id", "description", "status", "userId") VALUES ('cf983caf-aff3-47ad-8906-cbfd9ab136b4', 'Complete the final project for the computer science course', 'Not Started', '94f3eae0-69c0-417a-9713-81e15fb1e861');
INSERT INTO "goal" ("id", "description", "status", "userId") VALUES ('2566d041-1de6-4d2a-ab7c-9b3ac61bdf6e', 'Achieve a daily meditation streak of 30 days', 'On Hold', '57ec90f2-4f5b-43c9-9c54-c67fec7554c9');
INSERT INTO "goal" ("id", "description", "status", "userId") VALUES ('ced71df6-bab1-417d-a916-21a2e3d9fcce', 'Read and summarize five research papers on machine learning', 'Not Started', 'c9b392d1-5f7b-4fed-93cb-a2a51ddd7871');
INSERT INTO "goal" ("id", "description", "status", "userId") VALUES ('e0823bdc-945e-41aa-bd2b-9989057e91f5', 'Achieve a daily meditation streak of 30 days', 'Completed', 'ff3762e1-c41d-4268-a951-e51b156c978d');
INSERT INTO "goal" ("id", "description", "status", "userId") VALUES ('2401972a-92ea-4968-a6af-e6070a523462', 'Read and summarize five research papers on machine learning', 'Not Started', 'febeb706-625c-4977-ad93-1a6ac7c67551');
INSERT INTO "goal" ("id", "description", "status", "userId") VALUES ('775c75aa-1983-4c82-9d55-fa9835a980f7', 'Complete the final project for the computer science course', 'Cancelled', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "goal" ("id", "description", "status", "userId") VALUES ('2db5dd2e-55de-4494-9499-759f90c8eef3', 'Read and summarize five research papers on machine learning', 'On Hold', '93b0b3cc-fbb0-4105-bacc-b4a9649d3b41');
INSERT INTO "goal" ("id", "description", "status", "userId") VALUES ('26ffe412-7255-4a40-986d-f777aba875ec', 'Complete the final project for the computer science course', 'On Hold', 'c9b392d1-5f7b-4fed-93cb-a2a51ddd7871');
INSERT INTO "goal" ("id", "description", "status", "userId") VALUES ('daa92849-c2cc-42f4-ab1b-c34f540f07b5', 'Run a half marathon by the end of the year', 'Completed', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');

INSERT INTO "habit" ("id", "description", "frequency", "userId") VALUES ('2381b3b6-fc2d-4860-8c37-2ebb010ba1f6', 'Drink 2 liters of water', 'Daily', 'c9b392d1-5f7b-4fed-93cb-a2a51ddd7871');
INSERT INTO "habit" ("id", "description", "frequency", "userId") VALUES ('e12a9a82-6621-477a-bb21-7b09b5037e25', 'Drink 2 liters of water', 'Every weekday', '57ec90f2-4f5b-43c9-9c54-c67fec7554c9');
INSERT INTO "habit" ("id", "description", "frequency", "userId") VALUES ('c7e035af-912b-450f-a236-9347fc0fb45d', 'Evening Meditation', 'Monthly', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "habit" ("id", "description", "frequency", "userId") VALUES ('4f1e1978-7493-465b-8124-af87b57c5182', 'Morning Yoga Routine', 'Weekly', 'c9b392d1-5f7b-4fed-93cb-a2a51ddd7871');
INSERT INTO "habit" ("id", "description", "frequency", "userId") VALUES ('6634e75a-1dfd-4337-a4ec-23e0ee8ad302', 'Morning Yoga Routine', 'Monthly', 'febeb706-625c-4977-ad93-1a6ac7c67551');
INSERT INTO "habit" ("id", "description", "frequency", "userId") VALUES ('9649f808-c2d5-4050-9f92-a0376fc39d6b', 'Morning Yoga Routine', 'Weekly', '60641b23-20ac-4856-bf7a-ea6f48a5d206');
INSERT INTO "habit" ("id", "description", "frequency", "userId") VALUES ('d72095fc-58fc-4822-a2ca-c471a1751157', 'Daily Reading Session', 'Daily', '40b5e4c0-bb2a-449c-9bd8-a2753eddd8fb');
INSERT INTO "habit" ("id", "description", "frequency", "userId") VALUES ('7b57dec2-badc-4ba8-986e-43cd60ea06ac', 'Daily Reading Session', 'Weekly', 'c9b392d1-5f7b-4fed-93cb-a2a51ddd7871');
INSERT INTO "habit" ("id", "description", "frequency", "userId") VALUES ('f6169afe-4e4b-4f26-8c7a-b9fda71703a0', 'Morning Yoga Routine', 'Twice a week', 'c9b392d1-5f7b-4fed-93cb-a2a51ddd7871');
INSERT INTO "habit" ("id", "description", "frequency", "userId") VALUES ('d83e5fe6-07d2-47d6-ae4f-c5eca3e43900', 'Study for 2 hours', 'Daily', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');

INSERT INTO "hobby" ("id", "description", "userId") VALUES ('191fb28b-ac57-4c4c-a09c-97df8aac06e1', 'Writing short stories and poetry', 'febeb706-625c-4977-ad93-1a6ac7c67551');
INSERT INTO "hobby" ("id", "description", "userId") VALUES ('849e6165-5061-494c-ac46-bd176d8f5e8e', 'Playing acoustic guitar', 'febeb706-625c-4977-ad93-1a6ac7c67551');
INSERT INTO "hobby" ("id", "description", "userId") VALUES ('227b95f7-f0a7-4990-b5af-2b1707e7b11d', 'Painting watercolor landscapes', 'd41a4664-e923-4ff7-ac55-a66cc5dcfa8d');
INSERT INTO "hobby" ("id", "description", "userId") VALUES ('5341342c-201f-499b-bb65-c0289a3bdc06', 'Playing acoustic guitar', '57ec90f2-4f5b-43c9-9c54-c67fec7554c9');
INSERT INTO "hobby" ("id", "description", "userId") VALUES ('d2352aeb-02ed-42e5-9d13-0def97e557a0', 'Practicing yoga and meditation', 'febeb706-625c-4977-ad93-1a6ac7c67551');
INSERT INTO "hobby" ("id", "description", "userId") VALUES ('44ae1e3b-0e98-45fc-9993-e199382eb583', 'Playing acoustic guitar', 'ff3762e1-c41d-4268-a951-e51b156c978d');
INSERT INTO "hobby" ("id", "description", "userId") VALUES ('14de4b85-5143-41a7-8873-74d1e2390b8a', 'Practicing yoga and meditation', 'ff3762e1-c41d-4268-a951-e51b156c978d');
INSERT INTO "hobby" ("id", "description", "userId") VALUES ('46b5096f-34d5-4f6c-889d-73ef23aa0bbd', 'Playing acoustic guitar', '60641b23-20ac-4856-bf7a-ea6f48a5d206');
INSERT INTO "hobby" ("id", "description", "userId") VALUES ('01896b3a-77a1-44b8-91b4-708c8b66a04f', 'Practicing yoga and meditation', '57ec90f2-4f5b-43c9-9c54-c67fec7554c9');
INSERT INTO "hobby" ("id", "description", "userId") VALUES ('c3ba4a6f-58f8-4680-961a-236facc33063', 'Gardening with succulents and cacti', '94f3eae0-69c0-417a-9713-81e15fb1e861');

INSERT INTO "schedule" ("id", "date", "time", "activity", "userId") VALUES ('3dfe34e5-24df-4367-997c-7720daf820a6', '2023-12-17T14:44:41.738Z', '0800 AM', 'Lunch Break', '40b5e4c0-bb2a-449c-9bd8-a2753eddd8fb');
INSERT INTO "schedule" ("id", "date", "time", "activity", "userId") VALUES ('380b7947-440f-4b32-bb26-1843c8ac942d', '2023-07-11T15:50:24.380Z', '0800 AM', 'Attend Biology Lecture', 'ff3762e1-c41d-4268-a951-e51b156c978d');
INSERT INTO "schedule" ("id", "date", "time", "activity", "userId") VALUES ('196aba67-775e-4725-9109-f611a0a9d5bb', '2023-10-27T11:25:48.397Z', '1230 PM', 'Attend Biology Lecture', '93b0b3cc-fbb0-4105-bacc-b4a9649d3b41');
INSERT INTO "schedule" ("id", "date", "time", "activity", "userId") VALUES ('9430b097-6b27-4203-aa65-9692c137adcc', '2025-04-13T13:31:53.371Z', '1015 PM', 'Lunch Break', 'febeb706-625c-4977-ad93-1a6ac7c67551');
INSERT INTO "schedule" ("id", "date", "time", "activity", "userId") VALUES ('00e29f12-57c0-4734-9fcc-6025615c78d4', '2023-09-15T23:24:23.678Z', '0800 AM', 'Attend Biology Lecture', '94f3eae0-69c0-417a-9713-81e15fb1e861');
INSERT INTO "schedule" ("id", "date", "time", "activity", "userId") VALUES ('dfce7e58-9d89-43ec-ae96-a6345290dddd', '2023-08-28T11:19:36.785Z', '0800 AM', 'Study for Math Exam', 'd41a4664-e923-4ff7-ac55-a66cc5dcfa8d');
INSERT INTO "schedule" ("id", "date", "time", "activity", "userId") VALUES ('728b2811-e179-46dd-899a-5e6671ffabcb', '2024-11-30T03:44:56.166Z', '0345 PM', 'Gym Session', 'ff3762e1-c41d-4268-a951-e51b156c978d');
INSERT INTO "schedule" ("id", "date", "time", "activity", "userId") VALUES ('39699e28-a6a7-4b92-8237-cd4a6d5a9979', '2023-12-17T18:40:03.439Z', '0345 PM', 'Attend Biology Lecture', '40b5e4c0-bb2a-449c-9bd8-a2753eddd8fb');
INSERT INTO "schedule" ("id", "date", "time", "activity", "userId") VALUES ('8568e86c-63c2-4da1-af0d-f1d299e2cab4', '2024-05-04T10:44:26.068Z', '1015 PM', 'Study for Math Exam', '40b5e4c0-bb2a-449c-9bd8-a2753eddd8fb');
INSERT INTO "schedule" ("id", "date", "time", "activity", "userId") VALUES ('615b90ad-5f9e-4214-b893-3a6c7d070120', '2024-05-04T23:22:53.692Z', '1230 PM', 'Lunch Break', 'd41a4664-e923-4ff7-ac55-a66cc5dcfa8d');

INSERT INTO "focusmode" ("id", "startTime", "duration", "lowPowerModeFlag", "userId") VALUES ('395fedc3-b096-4740-bc3e-ff2da556d799', '20230315T154500Z', '45m', false, '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "focusmode" ("id", "startTime", "duration", "lowPowerModeFlag", "userId") VALUES ('f66127f3-130a-4787-88bd-bbc2f22e983c', '20230315T154500Z', '3h', true, 'febeb706-625c-4977-ad93-1a6ac7c67551');
INSERT INTO "focusmode" ("id", "startTime", "duration", "lowPowerModeFlag", "userId") VALUES ('17976d70-a792-41eb-8825-d9b4282ed737', '20230315T080000Z', '2h 15m', true, '57ec90f2-4f5b-43c9-9c54-c67fec7554c9');
INSERT INTO "focusmode" ("id", "startTime", "duration", "lowPowerModeFlag", "userId") VALUES ('05a2697c-7afa-432b-a893-ac4ac2d0846f', '20230315T180000Z', '3h', true, 'febeb706-625c-4977-ad93-1a6ac7c67551');
INSERT INTO "focusmode" ("id", "startTime", "duration", "lowPowerModeFlag", "userId") VALUES ('62d788be-253e-45d7-b20b-025831d3969d', '20230315T154500Z', '45m', true, '94f3eae0-69c0-417a-9713-81e15fb1e861');
INSERT INTO "focusmode" ("id", "startTime", "duration", "lowPowerModeFlag", "userId") VALUES ('93d29603-6411-4c35-8654-85589d3d88e3', '20230315T080000Z', '45m', false, '57ec90f2-4f5b-43c9-9c54-c67fec7554c9');
INSERT INTO "focusmode" ("id", "startTime", "duration", "lowPowerModeFlag", "userId") VALUES ('df62eca7-7ee2-4236-ac09-8a0c7280c91e', '20230315T211500Z', '2h 30m', true, '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "focusmode" ("id", "startTime", "duration", "lowPowerModeFlag", "userId") VALUES ('6d23188b-d0f0-4389-b332-9a3165f06365', '20230315T154500Z', '3h', true, '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "focusmode" ("id", "startTime", "duration", "lowPowerModeFlag", "userId") VALUES ('cef0469e-cda1-4068-8e3d-ff59e350460d', '20230315T080000Z', '45m', true, 'febeb706-625c-4977-ad93-1a6ac7c67551');
INSERT INTO "focusmode" ("id", "startTime", "duration", "lowPowerModeFlag", "userId") VALUES ('609081b8-6a39-4a16-97da-2e70865ee9bf', '20230315T080000Z', '2h 30m', true, 'c9b392d1-5f7b-4fed-93cb-a2a51ddd7871');

INSERT INTO "airesponse" ("id", "responseText", "journalId") VALUES ('250cc880-1514-4bf2-b4c8-7ffb8902dfd9', 'Today youve made great progress keep up the good work', 'ba96c00a-f085-4fa4-8f86-79b334eddf18');
INSERT INTO "airesponse" ("id", "responseText", "journalId") VALUES ('8588aa29-2d5f-4d2b-a168-56095515b377', 'Remember every small step counts. Youre doing well', '5125d6eb-b21b-411c-92ea-204eb0bc2f2c');
INSERT INTO "airesponse" ("id", "responseText", "journalId") VALUES ('51bd26b2-c223-4bf3-9591-157ff853c93d', 'Today youve made great progress keep up the good work', '6aec5ef5-bf91-470f-9fe2-67fb78a4de3b');
INSERT INTO "airesponse" ("id", "responseText", "journalId") VALUES ('92f9aeff-938b-4dbb-9881-0e3fe25dba6b', 'Remember every small step counts. Youre doing well', '6820d93c-a3c8-4a73-ad04-e32bee14b1e9');
INSERT INTO "airesponse" ("id", "responseText", "journalId") VALUES ('b0d8f3fd-bab8-4924-8af7-4f0d53e741cc', 'Great effort today How about a little more focus on your hobbies tomorrow', '2eb82924-260e-4f10-ae2e-c47851cdbd39');
INSERT INTO "airesponse" ("id", "responseText", "journalId") VALUES ('a0530abd-904f-4b8f-9cf5-279c27b314cb', 'Today youve made great progress keep up the good work', 'b7de4e0b-791b-4cfa-9e42-469a7b1ae33f');
INSERT INTO "airesponse" ("id", "responseText", "journalId") VALUES ('0c9f28dc-a00f-4faf-9bea-e8f3998615e6', 'Remember every small step counts. Youre doing well', 'ba96c00a-f085-4fa4-8f86-79b334eddf18');
INSERT INTO "airesponse" ("id", "responseText", "journalId") VALUES ('404f805e-9f5e-413a-bef7-a22cb6ec8d14', 'Youve managed your tasks well today Try to maintain this momentum.', '2eb82924-260e-4f10-ae2e-c47851cdbd39');
INSERT INTO "airesponse" ("id", "responseText", "journalId") VALUES ('7d561696-5fbe-465c-baf2-2c21df59848a', 'Youve managed your tasks well today Try to maintain this momentum.', '6aec5ef5-bf91-470f-9fe2-67fb78a4de3b');
INSERT INTO "airesponse" ("id", "responseText", "journalId") VALUES ('8bcace17-b7bd-41f0-b375-3ec47630808d', 'Great effort today How about a little more focus on your hobbies tomorrow', 'b7de4e0b-791b-4cfa-9e42-469a7b1ae33f');

INSERT INTO "hostview" ("id", "viewType", "viewDate", "userId") VALUES ('856384e1-ebf6-4ff7-b14b-6c91ef9fb474', 'User Activities', '2024-02-22T18:50:25.391Z', '93b0b3cc-fbb0-4105-bacc-b4a9649d3b41');
INSERT INTO "hostview" ("id", "viewType", "viewDate", "userId") VALUES ('55e4d38e-5c78-4e70-9779-d26b3e19c92a', 'Goals and Habits', '2024-12-17T06:33:06.100Z', '57ec90f2-4f5b-43c9-9c54-c67fec7554c9');
INSERT INTO "hostview" ("id", "viewType", "viewDate", "userId") VALUES ('6a6e11a0-016b-4c84-8891-ff74578f46ce', 'Focus Mode History', '2025-05-07T01:48:43.431Z', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "hostview" ("id", "viewType", "viewDate", "userId") VALUES ('b3ae12b0-aab4-4dd8-a6db-791818cbf3d1', 'Journal Entries', '2024-08-22T03:49:29.404Z', '60641b23-20ac-4856-bf7a-ea6f48a5d206');
INSERT INTO "hostview" ("id", "viewType", "viewDate", "userId") VALUES ('d5b1ada5-c51c-45e7-bd1e-6228e8453ef7', 'Goals and Habits', '2025-05-03T06:40:03.824Z', '60641b23-20ac-4856-bf7a-ea6f48a5d206');
INSERT INTO "hostview" ("id", "viewType", "viewDate", "userId") VALUES ('38d700b0-9340-4bcd-a241-bd05c8f5c485', 'Schedules', '2023-10-10T00:54:09.435Z', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "hostview" ("id", "viewType", "viewDate", "userId") VALUES ('44f60fb5-f895-4643-9270-cc578f6ee38b', 'Focus Mode History', '2024-05-23T11:08:31.200Z', 'ff3762e1-c41d-4268-a951-e51b156c978d');
INSERT INTO "hostview" ("id", "viewType", "viewDate", "userId") VALUES ('5e3a30a9-04f9-4476-a1cc-3219d0d74f0c', 'Journal Entries', '2024-02-06T09:37:37.013Z', '57ec90f2-4f5b-43c9-9c54-c67fec7554c9');
INSERT INTO "hostview" ("id", "viewType", "viewDate", "userId") VALUES ('94a74374-df0b-421a-80b8-44c3653a7523', 'User Activities', '2023-12-13T13:47:00.381Z', '57ec90f2-4f5b-43c9-9c54-c67fec7554c9');
INSERT INTO "hostview" ("id", "viewType", "viewDate", "userId") VALUES ('a12cf83f-ee80-4f26-b9d5-e07961b52183', 'Goals and Habits', '2025-03-23T03:01:44.229Z', '93b0b3cc-fbb0-4105-bacc-b4a9649d3b41');
    `,
      )
    } catch (error) {
      // ignore
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
