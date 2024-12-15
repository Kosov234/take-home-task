import { http, HttpResponse, delay } from "msw";

type LoginRequestBody = {
  email: string;
  password: string;
};

export const handlers = [
  http.post("/api/login", async ({ request }) => {
    const { email, password } = (await request.json()) as LoginRequestBody;

    await delay(1500);

    if (email === "hello@edited.com" && password === "hello123") {
      return HttpResponse.json({
        user: { id: 1, name: "Test User" },
      });
    } else {
      return new HttpResponse(null, { status: 401 });
    }
  }),
];
