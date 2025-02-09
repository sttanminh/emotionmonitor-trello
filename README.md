# Emotimonitor Trello Power-Up

<img width="966" alt="architecture" src="https://github.com/user-attachments/assets/caa3d3c5-0b57-420b-8228-e8d7fd705f92" />


This repo is a NextJS app used to host an iFrame for the emotimonitor trello power-up and is part of the Dev Insights Emotimonitor system, along with the [dashboard](https://github.com/dev-insights-development-team/dashboard/tree/main). The power-up is used as a means of assisting the understanding changing requirments in software systems impact the emotions of the teams that are working on it. To do this, team members of a trello board are able to rate each card on the board based on a predefined set of metrics with both their opinion of the metric for that card and their emotional response to it. Each card may be rated by the same and different people any number of times. These ratings are then displayed on the dashboard along with AI recommendations to assist team leaders in understanding the team's responses to changes over time.

## To set up local developing environment

Install docker https://docs.docker.com/get-docker/

Add a .env file in the root directory
```env
DATABASE_URL="mongodb://admin:secret@localhost:27017/dev_insights?authSource=admin&directConnection=true"
```
Run
```bash
npm install
make makefile all
```
Make changes in prisma/schema.prisma as needed. For prisma client to recognise the changes and preserve them, run
```bash
npx prisma migrate dev
```
## Getting started
Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

API routes can be accessed on http://localhost:3000/api/<endpoint>. For the full list of api routes, please see [here](https://github.com/dev-insights-development-team/emotimonitor-trello/tree/main/pages/api).

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.


