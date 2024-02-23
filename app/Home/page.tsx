import Images from "@/components/Images";
import FaqList from "@/components/FaqList";
import Testimony from "@/components/Testimony";
import Prompt from "@/components/Prompt";
import Header from "@/components/Header";
import PreHeader from "@/components/PreHeader";

export default function Home() {



  return (
    <main className="mx-0">
                      <PreHeader />

                <Header />

<Prompt  />
      <Images />
      <Testimony />
      <FaqList/>
    </main>
  );
}
