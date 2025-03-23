
import axios from "axios";

const createUserQuery = (from?: string | null, to?:string | null) => {
  const gitUser = process.env.GIT_USER;
  const fromParam = from ? `"${from}"` : null
  const toParam = to ? `"${to}"` : null
  return `
      query {
        user(login: "${gitUser}") {
          contributionsCollection(from: ${fromParam}, to:${toParam}) {
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
}

export const GET = async(req: Request) => {
  const url = new URL(req.url);
  const from = url.searchParams.get('from'); 
  const to = url.searchParams.get('to'); 
  const gitToken = process.env.GIT_TOKEN;
  try {
    const query = createUserQuery(from, to);

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
