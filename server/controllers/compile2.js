import axios from "axios";

export const compile = async (req, response) => {
  const URL = process.env.COMPILER_URL;

  const HEADERS = {
    "Content-Type": "application/json",
    "client-secret": process.env.CLIENT_SECRET,
  };
  const { lang, sourcecode, input } = req.body;

  axios
    .post(
      URL,
      {
        lang: lang.toUpperCase(),
        source: sourcecode,
        input: input,
        memory_limit: 5,
        context: { id: 213121 },
        callback: "https://client.com/callback/",
      },
      {
        headers: HEADERS,
      }
    )
    .then((res) => {
      setTimeout(() => {
        axios
          .post(`${res.data.status_update_url}`, {}, { headers: HEADERS })
          .then((res) => {
            if (res.data.result.compile_status === "OK") {
              axios
                .get(`${res.data.result.run_status.output}`)
                .then((res) => {
                  response.status(200).send({ data: res.data });
                })
                .catch((error) => {
                  response.status(400).send(error);
                  console.log(error);
                });
            } else {
              response
                .status(200)
                .send({ data: res.data.result.compile_status });
            }
          });
      }, 200);
    })
    .catch((error) => console.log());
};
