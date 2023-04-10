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
      let count = 0;

      const get_req_status = setInterval(() => {
        axios
          .post(`${res.data.status_update_url}`, {}, { headers: HEADERS })
          .then((res) => {
            const req_status = res.data.request_status.code;
            const compile_status = res.data.result.compile_status;

            if (req_status === "REQUEST_COMPLETED") {
              console.log("request completed");
              axios
                .get(`${res.data.result.run_status.output}`)
                .then((res) => {
                  return response.status(200).json({ data: res.data });
                })
                .catch((error) => {
                  return response.status(400);
                });

              clearInterval(get_req_status);
            } else if (
              req_status === "CODE_COMPILED" &&
              compile_status === "OK" &&
              count < 20
            ) {
            } else if (req_status === "CODE_COMPILED" && count < 20) {
              console.log(res.data);
              console.log("code compiled");
              return response
                .status(200)
                .json({ data: res.data.result.compile_status });
            }

            if (count > 20) {
              console.log("request timeout");
              clearInterval(get_req_status);
              return response.status(400).json({ data: "request timeout" });
            }

            console.log(count);
            count++;
          })
          .catch((error) => console.log(error));
      }, 1000);
    });
};
