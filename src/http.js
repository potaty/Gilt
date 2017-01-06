const http = {
  get: (uri, accept) => fetch(`https://api.github.com${uri}`, {
    method: 'GET',
    headers: {
      'Accept': accept || 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `token ${global.ACCESS_TOKEN}`,
    },
  }),
  post: (uri, body, accept) => fetch(`https://api.github.com${uri}`, {
    method: 'POST',
    headers: {
      'Accept': accept || 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `token ${global.ACCESS_TOKEN}`,
    },
    body: JSON.stringify(body),
  }),
}

export default http
