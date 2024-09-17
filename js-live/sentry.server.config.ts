// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://bd8defc1b6a3cb428d2884244a7785da@o4507967943540736.ingest.us.sentry.io/4507967945113600",

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
