Trello Plugin for Emotimonitor
## To set up local developing environment

Install docker https://docs.docker.com/get-docker/

Add a .env file in the root directory
```env
DATABASE_URL="postgresql://dev_team:secret@localhost:5432/dev_insights"
```
Run
```bash
npm install
make makefile all
```

## To make changes to DB schema during development
- Manually adjust prisma/schema.prisma
- Migrate your development database and update your prisma client with the new model using the CLI command
```bash
npx prisma migrate dev
```
- Use Prisma Client in your application code to access your database