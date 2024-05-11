import ProtectedMainLayout from "@/layouts/ProtectedLayout";
import Head from "next/head";

export default function ProfilePage() {
  return (
    <>
      <Head>
        <title>Mitri | Profile</title>
      </Head>

      <ProtectedMainLayout>
        <h1>Profile Page</h1>
      </ProtectedMainLayout>
    </>
  )
}