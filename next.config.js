module.exports = {
  reactStrictMode: true,
    async headers() {
      return [
        {
          source: '/api/url/add/:id',
          headers: [
            {
                key: 'Access-Control-Allow-Origin',
                value: '*',
              },
              {
                key: 'Access-Control-Allow-Methods',
                value: 'POST',
              }
          ],
        },
      ]
    },
    async rewrites() {
      return [
          {
              source: `/list/:id`,
              destination: `/list?id=:id`
          },
          {
            source: `/api/hello/:id`,
            destination: `/api/hello?id=:id`
        },
        {
            source: `/api/url/add/:id`,
            destination: `/api/url/add?id=:id`
        },
        {
          source: `/api/alternative/:id`,
          destination: `/api/alternative?id=:id`
        },
        {
          source: `/api/delete/:id`,
          destination: `/api/delete?id=:id`
        }
      ];
    },
  }