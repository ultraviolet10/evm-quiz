import { Metadata } from "next";
import HomePage from "~/components/HomePage";
import { APP_NAME, APP_DESCRIPTION } from "~/lib/constants";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: APP_NAME,
    openGraph: {
      title: APP_NAME,
      description: APP_DESCRIPTION,
    },
  };
}

export default function Home() {
  return <HomePage title={APP_NAME} />;
}
