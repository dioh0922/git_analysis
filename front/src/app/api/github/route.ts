
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
    console.log(response.data)
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    // エラーが発生した場合でも必ずレスポンスを返す
    console.log(error)
    return new Response('Failed to fetch data', { status: 500 });
  }
}
