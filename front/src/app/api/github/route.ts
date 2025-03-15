
import axios from "axios";

export const GET = async() => {
  const gitUser = process.env.GIT_USER;
  const gitToken = process.env.GIT_TOKEN;
  try {
    const query = `
      query {
        user(login: "${gitUser}") {
          contributionsCollection {
            contributionCalendar {
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    `;

    const response = await axios.post<any>(
      'https://api.github.com/graphql',
      { query },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${gitToken}`,
          'User-Agent': 'Awesome-Octocat-App',
        },
      }
    );
    const user = response.data.data.user;
    const contributionsCollection = user.contributionsCollection
    const week = user.contributionsCollection.contributionCalendar.weeks;
    const flat = week.flatMap((item: any) => item.contributionDays);
    const graph = [['date', 'count'], ...flat.map((item: any) => {return [item.date, item.contributionCount]})];
    console.log(graph)
    return new Response(JSON.stringify(graph), { status: 200 });
  } catch (error) {
    // エラーが発生した場合でも必ずレスポンスを返す
    console.log(error)
    return new Response('Failed to fetch data', { status: 500 });
  }
}
