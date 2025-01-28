import { test, expect } from "@playwright/test";

const baseURL = "https://reqres.in/api/users";

test("should list the users", async ({ request }) => {
  const startTime = Date.now();
  const response = await request.get(baseURL, {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      page: "2",
    },
  });
  const endTime = Date.now();
  if (endTime - startTime > 1000) {
    console.log("The response time is greater than 1 second");
  }
  expect(response.ok()).toBeTruthy();
});

test("should list the data of a single user", async ({ request }) => {
  const response = await request.get(`${baseURL}/2`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  await expect(response.ok()).toBeTruthy();
  const responseJSON = await response.json();
  expect(responseJSON.data.id).toEqual(2);
  expect(responseJSON.data.email).toEqual("janet.weaver@reqres.in");
  expect(responseJSON.data.first_name).toEqual("Janet");
  expect(responseJSON.data.last_name).toEqual("Weaver");
});

test("should send the user not found error", async ({ request }) => {
  const response = await request.get(`${baseURL}/23`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  expect(response.ok()).toBeFalsy();
  expect(response.status()).toEqual(404);
  expect(await response.json()).toEqual({});
});

test("should create a new user", async ({ request }) => {
  const response = await request.post(baseURL, {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      name: "morpheus",
      job: "leader",
    },
  });
  expect(response.ok()).toBeTruthy();
  const responseJSON = await response.json();
  expect(responseJSON.name).toEqual("morpheus");
  expect(responseJSON.job).toEqual("leader");
  expect(responseJSON).toHaveProperty("id");
  expect(responseJSON).toHaveProperty("createdAt");
});

test("should update the user data", async ({ request }) => {
  const response = await request.put(`${baseURL}/2`, {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      name: "morpheus",
      job: "zion resident operator",
    },
  });
  expect(response.ok()).toBeTruthy();
  const responseJSON = await response.json();
  expect(responseJSON.name).toEqual("morpheus");
  expect(responseJSON.job).toEqual("zion resident operator");
  expect(responseJSON).toHaveProperty("updatedAt");
});

test("should patch update the user data", async ({ request }) => {
  const response = await request.patch(`${baseURL}/2`, {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      name: "Gandalf",
      job: "zion",
    },
  });
  expect(response.ok()).toBeTruthy();
  const responseJSON = await response.json();
  console.log(responseJSON);
  expect(responseJSON.name).toEqual("Gandalf");
  expect(responseJSON.job).toEqual("zion");
  expect(responseJSON).toHaveProperty("updatedAt");
});

test("should delete the user data", async ({ request }) => {
  const response = await request.delete(`${baseURL}/2`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toEqual(204);
});

test("should register the user", async ({ request }) => {
  const response = await request.post("https://reqres.in/api/register", {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      email: "eve.holt@reqres.in",
      password: "pistol",
    },
  });
  expect(response.ok()).toBeTruthy();
  const responseJSON = await response.json();
  expect(responseJSON.token).toEqual("QpwL5tke4Pnpja7X4");
  expect(responseJSON.id).toEqual(4);
});

test("should not register the user", async ({ request }) => {
  const response = await request.post("https://reqres.in/api/register", {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      email: "eve.holt@reqres.in",
    },
  });
  expect(response.ok()).not.toBeTruthy();
  const responseJSON = await response.json();
  expect(responseJSON.error).toEqual("Missing password");
});

test("should login the user", async ({ request }) => {
  const response = await request.post("https://reqres.in/api/login", {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      email: "eve.holt@reqres.in",
      password: "cityslicka",
    },
  });
  expect(response.ok()).toBeTruthy();
  const responseJSON = await response.json();
  expect(responseJSON.token).toEqual("QpwL5tke4Pnpja7X4");
});

test("should not login the user", async ({ request }) => {
  const response = await request.post("https://reqres.in/api/login", {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      email: "peter@klaven",
    },
  });
  expect(response.ok()).not.toBeTruthy();
  const responseJSON = await response.json();
  expect(responseJSON.error).toEqual("Missing password");
});
