"use client";

import HomePage from "~/components/HomePage";
import { APP_NAME } from "~/lib/constants";

export default function App(
  { title }: { title?: string } = { title: APP_NAME }
) {
  return <HomePage title={title} />;
}
