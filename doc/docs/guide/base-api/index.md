# base-api layer

we implemented a flexible `base-api` layer for handling api requests,error handling and authentication.
in this section we cover a simple explanation about this layer and `logic-sample` layer(wrapper on top of base-api layer).

## baseUseFetch

We have a baseUseFetch composable where all the authentication requirements are implemented. The cases covered by this composable include: myCustomFetch and handleRefreshToken.<br>
myCustomFetch get 3 parameters: `url`, `config`(In config we set baseURL and retry with value of 0.) and `customConfig`(In customConfig we set goToLogin parameter to true and also toastError parameter to true.). In return of this function, it checked response of fetch. If we have response, it return that response if not it checked errors and statuses that we get from response. If the status code is `401` it will clear authStore and push user to login page(Of course, if we have set that config). If the status is `422` it checked validation errors. If none of the mentioned items were present, it will check that if our method was `get`, the status code 500 will be returned and If there was no get method and we encountered an error other than all the mentioned cases, the message related to the error will be toasted.<br>
For `401` error we call `handleRefreshToken` function. Here's a summarized breakdown of its behavior:

<b>1. Check User Authentication:</b><br>

- The function starts by checking if the user is logged in (authStore.isLoggedIn).
- If the user is not logged in, it logs an error message and returns a rejected promise. This prevents unauthorized requests.

<b>2. Refreshing Token:</b><br>

- If the user is logged in and token refresh is not already in progress (authStore.isRefreshing is false) and the previous refresh attempt has not succeeded (authStore.isRefreshSuccess is false), the code initiates a token refresh by calling authStore.doRefreshToken().

<b>3. Promise for Handling Refresh:</b><br>

- Regardless of whether the token refresh was initiated, the function returns a new promise.
- If token refresh was successful (authStore.isRefreshSuccess is true), the promise resolves with the result of a custom fetch function (myCustomFetch) called with the provided url, config, and customConfig.

<b>4. Waiting for Refresh:</b><br>

- If the token refresh was not successful (authStore.isRefreshSuccess is false), the function sets up a watcher using the Vue Composition API's watch.
- The watcher monitors the authStore.isRefreshing property for changes.
- When authStore.isRefreshing changes to false, it checks again if token refresh is successful.
- If refresh is successful, the promise resolves with the result of myCustomFetch.
- If refresh is not successful, the promise is rejected.

So, how can we use the mentioned items in our own project?<br>
Well, we have 2 items in our project:

1. Fetching API
2. Writing services and calling API

## Fetching API

The useFetchApi(we have the sample in `nuxt-layers/logic-sample/composables/api/useFetchApi.ts`) composable is a wrapper that utilizes the functionality provided by the baseUseFetchApi composable to handle authentication and API requests. It abstracts away the authentication and error-handling logic, allowing you to focus on making API calls and transforming the data if needed.<br>

Here's a brief explanation of how the useFetchApi composable works:

1. <b>Define useFetchApi Function:</b> This function takes an optional `classTransformer` argument that can be used for transforming API responses into instances of a specific class.

2. <b>Access Auth Store and Hooks:</b> Inside the `useFetchApi` function, you access the authentication store (`authStore`) and Nuxt app's base URL (`$baseUrl`). You also define a function called `showToast` to display error messages.

3. <b>Define `getValidationErrors` Function:</b> This function processes validation errors from API responses, extracting error messages and associating them with specific fields.

   ![An image](/images/baseApi/getValidationErrors.png)

4. <b>Call `baseUseFetchApi` Function:</b> The `baseUseFetchApi` function is called with the `authStore`, configuration options, and hooks. This function returns the `fetchData` function that will be used for making API requests.

5. <b>Return Wrapper Function:</b> The `useFetchApi` composable returns a function that you can use to make API requests. This function takes the URL, request configuration (`config`), and custom configuration (`customConfig`) as arguments.

6. <b>Authentication Handling:</b> If the `customConfig.setToken` property is set, the function adds the authorization token to the request headers.

7. <b>URL Parameters:</b> If `config.params` is provided, the function appends the parameters to the URL using the `qs` module and removes them from the `config`.

8. <b>API Request:</b> The `fetchData` function (returned by `baseUseFetchApi`) is called with the provided arguments. It handles the actual API request and error handling based on the `baseUseFetchApi` implementation.

9. <b>Data Transformation:</b> If a `classTransformer` is provided, the API response is transformed into an instance of the specified class using the `plainToInstance` function from the `class-transformer` library.

10. <b>Return Data:</b> The function returns either the transformed data or the raw API response, depending on whether a `classTransformer` was provided.

## Services and calling API

- Define `useService` Function: This function initializes the fetchData function using the useFetchApi composable.

- Return a Function and Make API Request: Inside this returned function, it calls fetchData with the following parameters:

  - <h3>URL</h3> url of API
  - <h3>Request Configuration</h3>

    - Method: "post", "get", "put", "delete"
    - Request Body: Contains the parameters required for calling api.

  - <h3>Custom Configuration</h3> The third argument to fetchData is a custom configuration object with the property ignoreErrors set to true. This is used to suppress error handling for this specific request.

- Process API Response: The .then() block processes the API response.

this is a simple example of implementing of a service and calling API:

```ts
import { useFetchApi } from "./api/useFetchApi";

export const useHomeService = () => {
  const fetchData = useFetchApi();
  return () =>
    fetchData(
      "/v10/site/index",
      {
        method: "get",
      },
      { ignoreErrors: true }
    ).then((response: any) => {
      console.log("response", response);
      return response;
    });
};
```
